class Task:
    """Task assigned to a project with optional contributors."""

    _next_id = 1
    VALID_STATUSES = {"open", "in-progress", "done"}

    def __init__(self, id: int, title: str, status: str = "open", assigned_to: int | None = None, project_id: int | None = None, contributor_ids: list[int] | None = None):
        """Create a task record."""
        self.id = id
        self.title = title
        self.status = status
        self.assigned_to = assigned_to
        self.project_id = project_id
        self.contributor_ids = contributor_ids or []

    @property
    def title(self):
        """Return the task title."""
        return self._title

    @title.setter
    def title(self, value):
        """Store a non-empty task title."""
        value = (value or "").strip()
        if not value:
            raise ValueError("task title is required")
        self._title = value

    @property
    def status(self):
        """Return the task status."""
        return self._status

    @status.setter
    def status(self, value):
        """Store a valid task status."""
        value = (value or "").strip().lower()
        if value not in self.VALID_STATUSES:
            raise ValueError("invalid status")
        self._status = value

    def add_contributor(self, user_id):
        """Add one contributor without duplicates."""
        if user_id not in self.contributor_ids:
            self.contributor_ids.append(user_id)

    def to_dict(self):
        """Convert the task to JSON-ready data."""
        return {
            "id": self.id,
            "title": self.title,
            "status": self.status,
            "assigned_to": self.assigned_to,
            "project_id": self.project_id,
            "contributor_ids": self.contributor_ids,
        }

    @classmethod
    def from_dict(cls, data):
        """Build a task from stored data."""
        return cls(data["id"], data.get("title"), data.get("status", "open"), data.get("assigned_to"), data.get("project_id"), data.get("contributor_ids", []))

    def __repr__(self):
        """Return a short debug representation."""
        return f"Task(id={self.id}, title={self.title!r}, status={self.status})"

    @classmethod
    def set_next_id(cls, ids):
        """Set the next id after existing records."""
        cls._next_id = max(ids) + 1 if ids else 1

    @classmethod
    def next_id(cls):
        """Return and advance the next task id."""
        value = cls._next_id
        cls._next_id += 1
        return value
