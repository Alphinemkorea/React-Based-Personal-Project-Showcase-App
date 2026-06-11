from dateutil.parser import parse


class Project:
    """Project owned by one user and linked to many tasks."""

    _next_id = 1

    def __init__(self, id: int, title: str, description: str | None = None, due_date: str | None = None, owner_id: int | None = None):
        """Create a project record."""
        self.id = id
        self.title = title
        self.description = description
        self.due_date = due_date
        self.owner_id = owner_id
        self.task_ids = []

    @property
    def title(self):
        """Return the project title."""
        return self._title

    @title.setter
    def title(self, value):
        """Store a non-empty project title."""
        value = (value or "").strip()
        if not value:
            raise ValueError("project title is required")
        self._title = value

    @property
    def due_date(self):
        """Return the due date as YYYY-MM-DD text."""
        return self._due_date

    @due_date.setter
    def due_date(self, value):
        """Normalize a due date string."""
        self._due_date = parse(value).date().isoformat() if value else None

    def to_dict(self):
        """Convert the project to JSON-ready data."""
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "due_date": self.due_date,
            "owner_id": self.owner_id,
            "task_ids": self.task_ids,
        }

    @classmethod
    def from_dict(cls, data):
        """Build a project from stored data."""
        item = cls(data["id"], data.get("title"), data.get("description"), data.get("due_date"), data.get("owner_id"))
        item.task_ids = data.get("task_ids", [])
        return item

    def __repr__(self):
        """Return a short debug representation."""
        return f"Project(id={self.id}, title={self.title!r})"

    @classmethod
    def set_next_id(cls, ids):
        """Set the next id after existing records."""
        cls._next_id = max(ids) + 1 if ids else 1

    @classmethod
    def next_id(cls):
        """Return and advance the next project id."""
        value = cls._next_id
        cls._next_id += 1
        return value
