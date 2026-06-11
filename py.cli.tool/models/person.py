class Person:
    """Base class for people stored by the tracker."""

    def __init__(self, id: int, name: str, email: str | None = None):
        """Create a person with validated fields."""
        self.id = id
        self.name = name
        self.email = email

    @property
    def id(self):
        """Return the numeric id."""
        return self._id

    @id.setter
    def id(self, value):
        """Store a positive numeric id."""
        if not isinstance(value, int) or value < 1:
            raise ValueError("id must be positive")
        self._id = value

    @property
    def name(self):
        """Return the person's name."""
        return self._name

    @name.setter
    def name(self, value):
        """Store a non-empty name."""
        value = (value or "").strip()
        if not value:
            raise ValueError("name is required")
        self._name = value

    @property
    def email(self):
        """Return the optional email address."""
        return self._email

    @email.setter
    def email(self, value):
        """Store an optional email address."""
        if value in (None, ""):
            self._email = None
            return
        value = value.strip()
        if "@" not in value or value.startswith("@") or value.endswith("@"):
            raise ValueError("Invalid email")
        self._email = value

    def to_dict(self):
        """Convert the person to JSON-ready data."""
        return {"id": self.id, "name": self.name, "email": self.email}
