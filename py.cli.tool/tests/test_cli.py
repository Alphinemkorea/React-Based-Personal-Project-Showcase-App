"""Integration tests for CLI commands using subprocess."""

import os
import json
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(__file__))
DB_PATH = os.path.join(ROOT, "data", "db.json")

def run(cmd):
    full = [sys.executable, os.path.join(ROOT, "main.py")] + cmd
    return subprocess.run(full, capture_output=True, text=True)

def reset_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    with open(DB_PATH, "w", encoding="utf-8") as f:
        json.dump({"users": [], "projects": [], "tasks": []}, f)

def get_db():
    with open(DB_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


class TestCLI:
    
    def test_add_user_success(self):
        reset_db()
        r = run(["add-user", "--name", "Alice", "--email", "alice@test.com"])
        assert r.returncode == 0
        assert "Added user 'Alice'" in r.stdout
        
        db = get_db()
        assert len(db["users"]) == 1
        assert db["users"][0]["name"] == "Alice"
    
    def test_add_user_duplicate_fails(self):
        reset_db()
        run(["add-user", "--name", "Alice", "--email", "alice@test.com"])
        r = run(["add-user", "--name", "Alice", "--email", "alice2@test.com"])
        assert r.returncode == 0
        assert "already exists" in r.stdout
        
        db = get_db()
        assert len(db["users"]) == 1  # Only one Alice

    def test_add_user_duplicate_fails_after_trim(self):
        reset_db()
        run(["add-user", "--name", "  Alice  ", "--email", "alice@test.com"])

        r = run(["add-user", "--name", "  Alice  ", "--email", "alice2@test.com"])

        assert r.returncode == 0
        assert "already exists" in r.stdout

        db = get_db()
        assert len(db["users"]) == 1
    
    def test_list_users(self):
        reset_db()
        run(["add-user", "--name", "Alice", "--email", "alice@test.com"])
        run(["add-user", "--name", "Bob", "--email", "bob@test.com"])
        
        r = run(["list-users"])
        assert r.returncode == 0
        assert "Alice" in r.stdout
        assert "Bob" in r.stdout
    
    def test_add_project_to_user(self):
        reset_db()
        run(["add-user", "--name", "Alice"])
        r = run(["add-project", "--user", "Alice", "--title", "Website", "--due", "2026-12-31"])
        assert r.returncode == 0
        assert "Added project 'Website'" in r.stdout
        
        db = get_db()
        assert len(db["projects"]) == 1
        assert db["projects"][0]["title"] == "Website"
    
    def test_add_project_nonexistent_user_fails(self):
        reset_db()
        r = run(["add-project", "--user", "NonExistent", "--title", "Proj"])
        assert r.returncode == 0
        assert "not found" in r.stdout
    
    def test_add_task_to_project(self):
        reset_db()
        run(["add-user", "--name", "Alice"])
        run(["add-user", "--name", "Bob"])
        run(["add-project", "--user", "Alice", "--title", "Website"])
        r = run([
            "add-task",
            "--project", "Website",
            "--title", "Design",
            "--assigned", "Alice",
            "--contributor", "Bob",
        ])
        assert r.returncode == 0
        assert "Added task 'Design'" in r.stdout
        
        db = get_db()
        assert len(db["tasks"]) == 1
        assert db["tasks"][0]["title"] == "Design"
        assert db["tasks"][0]["contributor_ids"] == [2, 1]
    
    def test_complete_task(self):
        reset_db()
        run(["add-user", "--name", "Alice"])
        run(["add-project", "--user", "Alice", "--title", "Website"])
        run(["add-task", "--project", "Website", "--title", "Design"])
        
        r = run(["complete-task", "--task-id", "1"])
        assert r.returncode == 0
        assert "done" in r.stdout
        
        db = get_db()
        assert db["tasks"][0]["status"] == "done"
    
    def test_list_projects_for_user(self):
        reset_db()
        run(["add-user", "--name", "Alice"])
        run(["add-user", "--name", "Bob"])
        run(["add-project", "--user", "Alice", "--title", "Website"])
        run(["add-project", "--user", "Bob", "--title", "API"])
        
        r = run(["list-projects", "--user", "Alice"])
        assert r.returncode == 0
        assert "Website" in r.stdout
    
    def test_list_tasks_for_project(self):
        reset_db()
        run(["add-user", "--name", "Alice"])
        run(["add-project", "--user", "Alice", "--title", "Website"])
        run(["add-task", "--project", "Website", "--title", "Design"])
        run(["add-task", "--project", "Website", "--title", "Deploy"])
        
        r = run(["list-tasks", "--project", "Website"])
        assert r.returncode == 0
        assert "Design" in r.stdout
        assert "Deploy" in r.stdout
    
    def test_invalid_email_format(self):
        reset_db()
        r = run(["add-user", "--name", "Alice", "--email", "invalid-email"])
        assert r.returncode == 0
        assert "Invalid email" in r.stdout

    def test_update_project_due_date(self):
        reset_db()
        run(["add-user", "--name", "Alice"])
        run(["add-project", "--user", "Alice", "--title", "Website"])

        r = run(["update-project", "--project", "Website", "--due", "Dec 31 2026"])
        assert r.returncode == 0
        assert "Updated project" in r.stdout

        db = get_db()
        assert db["projects"][0]["due_date"] == "2026-12-31"

    def test_update_task_status(self):
        reset_db()
        run(["add-user", "--name", "Alice"])
        run(["add-project", "--user", "Alice", "--title", "Website"])
        run(["add-task", "--project", "Website", "--title", "Design"])

        r = run(["update-task", "--task-id", "1", "--status", "in-progress"])
        assert r.returncode == 0
        assert "Updated task" in r.stdout

        db = get_db()
        assert db["tasks"][0]["status"] == "in-progress"

    def test_add_contributor(self):
        reset_db()
        run(["add-user", "--name", "Alice"])
        run(["add-user", "--name", "Bob"])
        run(["add-project", "--user", "Alice", "--title", "Website"])
        run(["add-task", "--project", "Website", "--title", "Design"])

        r = run(["add-contributor", "--task-id", "1", "--user", "Bob"])
        assert r.returncode == 0
        assert "Added contributor" in r.stdout

        db = get_db()
        assert db["tasks"][0]["contributor_ids"] == [2]


def run_tests():
    test_obj = TestCLI()
    methods = [m for m in dir(test_obj) if m.startswith("test_")]
    
    passed = 0
    failed = 0
    errors = []
    
    for method_name in methods:
        try:
            method = getattr(test_obj, method_name)
            method()
            print(f"✓ {method_name}")
            passed += 1
        except AssertionError as e:
            print(f"✗ {method_name}: {str(e)[:100]}")
            failed += 1
            errors.append((method_name, str(e)))
        except Exception as e:
            print(f"✗ {method_name}: {str(e)[:100]}")
            failed += 1
            errors.append((method_name, str(e)))
    
    print(f"\n{'='*60}")
    print(f"Results: {passed} passed, {failed} failed")
    if errors:
        print(f"\nFailed tests:")
        for name, error in errors:
            print(f"  - {name}: {error[:80]}")
    
    return failed == 0


if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
