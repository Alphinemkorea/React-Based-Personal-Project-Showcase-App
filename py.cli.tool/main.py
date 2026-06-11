import argparse
import sys

from models.project import Project
from models.task import Task
from models.user import User
from utils.storage import load_db, save_db

try:
    from rich.console import Console
    from rich.table import Table
except ImportError:
    Console = None
    Table = None


console = Console() if Console else None


def normalize_text(value):
    """Return a stable text value for matching."""
    return (value or "").strip().casefold()


def out(value):
    """Print one CLI message."""
    console.print(value) if console else print(value)


def reset_ids(db):
    """Sync model id counters with stored data."""
    User.set_next_id([u["id"] for u in db.get("users", [])])
    Project.set_next_id([p["id"] for p in db.get("projects", [])])
    Task.set_next_id([t["id"] for t in db.get("tasks", [])])


def user(db, name):
    """Find a user by name."""
    target = normalize_text(name)
    return next((u for u in db.get("users", []) if normalize_text(u.get("name")) == target), None)


def project(db, title):
    """Find a project by title."""
    target = normalize_text(title)
    return next((p for p in db.get("projects", []) if normalize_text(p.get("title")) == target), None)


def task(db, task_id):
    """Find a task by id."""
    return next((t for t in db.get("tasks", []) if t.get("id") == task_id), None)


def names(db, ids):
    """Turn user ids into display names."""
    found = [u["name"] for u in db.get("users", []) if u.get("id") in ids]
    return ", ".join(found) if found else "(none)"


def table(title, columns, rows):
    """Render a table with rich or plain text."""
    if Table:
        t = Table(title=title)
        for col in columns:
            t.add_column(col)
        for row in rows:
            t.add_row(*[str(v) for v in row])
        out(t)
        return
    print(title)
    print(" | ".join(columns))
    for row in rows:
        print(" | ".join(str(v) for v in row))


def add_user(args):
    """Add one user."""
    db = load_db()
    reset_ids(db)
    if user(db, args.name):
        out(f"Error: User '{args.name}' already exists")
        return
    try:
        item = User(User.next_id(), args.name, args.email)
    except ValueError as exc:
        out(f"Error: {exc}")
        return
    db.setdefault("users", []).append(item.to_dict())
    save_db(db)
    out(f"Added user '{item.name}'")


def list_users(_args):
    """List users."""
    db = load_db()
    rows = [(u["id"], u["name"], u.get("email") or "") for u in db.get("users", [])]
    table("Users", ["ID", "Name", "Email"], rows) if rows else out("No users found")


def add_project(args):
    """Add one project for a user."""
    db = load_db()
    reset_ids(db)
    owner = user(db, args.user)
    if not owner:
        out(f"Error: User '{args.user}' not found")
        return
    if any(p.get("owner_id") == owner["id"] and p.get("title") == args.title for p in db.get("projects", [])):
        out(f"Error: Project '{args.title}' already exists for '{args.user}'")
        return
    try:
        item = Project(Project.next_id(), args.title, args.description, args.due, owner["id"])
    except ValueError as exc:
        out(f"Error: {exc}")
        return
    db.setdefault("projects", []).append(item.to_dict())
    save_db(db)
    out(f"Added project '{item.title}'")


def update_project(args):
    """Update an existing project."""
    db = load_db()
    item = project(db, args.project)
    if not item:
        out(f"Error: Project '{args.project}' not found")
        return
    if args.user:
        owner = user(db, args.user)
        if not owner:
            out(f"Error: User '{args.user}' not found")
            return
        item["owner_id"] = owner["id"]
    try:
        changed = Project.from_dict({**item, "title": args.title or item["title"], "due_date": args.due if args.due is not None else item.get("due_date")})
    except ValueError as exc:
        out(f"Error: {exc}")
        return
    item.update({"title": changed.title, "due_date": changed.due_date})
    if args.description is not None:
        item["description"] = args.description
    save_db(db)
    out(f"Updated project '{item['title']}'")


def list_projects(args):
    """List all projects or one user's projects."""
    db = load_db()
    owner = user(db, args.user) if args.user else None
    if args.user and not owner:
        out(f"Error: User '{args.user}' not found")
        return
    rows = []
    for p in db.get("projects", []):
        if owner and p.get("owner_id") != owner["id"]:
            continue
        rows.append((p["id"], p["title"], names(db, [p.get("owner_id")]), p.get("due_date") or "", len(p.get("task_ids", []))))
    table("Projects", ["ID", "Title", "Owner", "Due", "Tasks"], rows) if rows else out("No projects found")


def add_task(args):
    """Add one task to a project."""
    db = load_db()
    reset_ids(db)
    parent = project(db, args.project)
    if not parent:
        out(f"Error: Project '{args.project}' not found")
        return
    assigned = user(db, args.assigned) if args.assigned else None
    if args.assigned and not assigned:
        out(f"Error: User '{args.assigned}' not found")
        return
    contributors = []
    for name in args.contributor or []:
        member = user(db, name)
        if not member:
            out(f"Error: User '{name}' not found")
            return
        contributors.append(member["id"])
    if assigned and assigned["id"] not in contributors:
        contributors.append(assigned["id"])
    try:
        item = Task(Task.next_id(), args.title, assigned_to=assigned["id"] if assigned else None, project_id=parent["id"], contributor_ids=contributors)
    except ValueError as exc:
        out(f"Error: {exc}")
        return
    db.setdefault("tasks", []).append(item.to_dict())
    parent.setdefault("task_ids", []).append(item.id)
    save_db(db)
    out(f"Added task '{item.title}'")


def update_task(args):
    """Update an existing task."""
    db = load_db()
    item = task(db, args.task_id)
    if not item:
        out(f"Error: Task id {args.task_id} not found")
        return
    if args.assigned:
        member = user(db, args.assigned)
        if not member:
            out(f"Error: User '{args.assigned}' not found")
            return
        item["assigned_to"] = member["id"]
        item.setdefault("contributor_ids", [])
        if member["id"] not in item["contributor_ids"]:
            item["contributor_ids"].append(member["id"])
    if args.project:
        parent = project(db, args.project)
        if not parent:
            out(f"Error: Project '{args.project}' not found")
            return
        old_parent = next((p for p in db.get("projects", []) if p.get("id") == item.get("project_id")), None)
        if old_parent and item["id"] in old_parent.get("task_ids", []):
            old_parent["task_ids"].remove(item["id"])
        item["project_id"] = parent["id"]
        parent.setdefault("task_ids", [])
        if item["id"] not in parent["task_ids"]:
            parent["task_ids"].append(item["id"])
    try:
        changed = Task.from_dict({**item, "title": args.title or item["title"], "status": args.status or item.get("status", "open")})
    except ValueError as exc:
        out(f"Error: {exc}")
        return
    item.update(changed.to_dict())
    save_db(db)
    out(f"Updated task {args.task_id}")


def add_contributor(args):
    """Add one contributor to a task."""
    db = load_db()
    item = task(db, args.task_id)
    member = user(db, args.user)
    if not item:
        out(f"Error: Task id {args.task_id} not found")
        return
    if not member:
        out(f"Error: User '{args.user}' not found")
        return
    item.setdefault("contributor_ids", [])
    if member["id"] not in item["contributor_ids"]:
        item["contributor_ids"].append(member["id"])
    save_db(db)
    out(f"Added contributor '{args.user}'")


def list_tasks(args):
    """List all tasks or one project's tasks."""
    db = load_db()
    parent = project(db, args.project) if args.project else None
    if args.project and not parent:
        out(f"Error: Project '{args.project}' not found")
        return
    rows = []
    for t in db.get("tasks", []):
        if parent and t.get("project_id") != parent["id"]:
            continue
        p = next((p for p in db.get("projects", []) if p["id"] == t.get("project_id")), {})
        rows.append((t["id"], t["title"], t.get("status", "open"), p.get("title", ""), names(db, [t.get("assigned_to")]), names(db, t.get("contributor_ids", []))))
    table("Tasks", ["ID", "Title", "Status", "Project", "Assigned", "Contributors"], rows) if rows else out("No tasks found")


def complete_task(args):
    """Mark a task complete."""
    db = load_db()
    item = task(db, args.task_id)
    if not item:
        out(f"Error: Task id {args.task_id} not found")
        return
    item["status"] = "done"
    save_db(db)
    out(f"Marked task {args.task_id} as done")


def parser():
    """Build the CLI parser."""
    p = argparse.ArgumentParser(description="Project tracker")
    sub = p.add_subparsers(dest="cmd")
    c = sub.add_parser

    x = c("add-user"); x.add_argument("--name", required=True); x.add_argument("--email"); x.set_defaults(func=add_user)
    x = c("list-users"); x.set_defaults(func=list_users)
    x = c("add-project"); x.add_argument("--user", required=True); x.add_argument("--title", required=True); x.add_argument("--description"); x.add_argument("--due"); x.set_defaults(func=add_project)
    x = c("update-project"); x.add_argument("--project", required=True); x.add_argument("--title"); x.add_argument("--description"); x.add_argument("--due"); x.add_argument("--user"); x.set_defaults(func=update_project)
    x = c("list-projects"); x.add_argument("--user"); x.set_defaults(func=list_projects)
    x = c("add-task"); x.add_argument("--project", required=True); x.add_argument("--title", required=True); x.add_argument("--assigned"); x.add_argument("--contributor", action="append"); x.set_defaults(func=add_task)
    x = c("update-task"); x.add_argument("--task-id", type=int, required=True); x.add_argument("--title"); x.add_argument("--status", choices=sorted(Task.VALID_STATUSES)); x.add_argument("--assigned"); x.add_argument("--project"); x.set_defaults(func=update_task)
    x = c("add-contributor"); x.add_argument("--task-id", type=int, required=True); x.add_argument("--user", required=True); x.set_defaults(func=add_contributor)
    x = c("list-tasks"); x.add_argument("--project"); x.set_defaults(func=list_tasks)
    x = c("complete-task"); x.add_argument("--task-id", type=int, required=True); x.set_defaults(func=complete_task)
    return p


def main():
    """Run the command selected by the user."""
    p = parser()
    args = p.parse_args()
    args.func(args) if hasattr(args, "func") else p.print_help()


if __name__ == "__main__":
    main()
