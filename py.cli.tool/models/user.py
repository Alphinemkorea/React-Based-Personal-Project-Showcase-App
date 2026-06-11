from models.person import Person


class User(Person):
    """User who owns projects and can contribute to tasks."""

    _next_id = 1

    @classmethod
    def from_dict(cls, data):
        """Build a user from stored data."""
        return cls(data["id"], data.get("name"), data.get("email"))

    def __repr__(self):
        """Return a short debug representation."""
        return f"User(id={self.id}, name={self.name!r})"

    @classmethod
    def set_next_id(cls, ids):
        """Set the next id after existing records."""
        cls._next_id = max(ids) + 1 if ids else 1

    @classmethod
    def next_id(cls):
        """Return and advance the next user id."""
        value = cls._next_id
        cls._next_id += 1
        return value
