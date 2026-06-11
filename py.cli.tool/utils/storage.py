import json
import logging
import os
from typing import Dict, Any

logger = logging.getLogger(__name__)

def _abs_path(rel_path: str) -> str:
    """Return an absolute path under the project root."""
    base = os.path.dirname(__file__)
    return os.path.abspath(os.path.join(base, "..", rel_path))

def load_db() -> Dict[str, Any]:
    """Load saved JSON data, or return an empty database."""
    path = _abs_path("data/db.json")
    if not os.path.exists(path):
        return {"users": [], "projects": [], "tasks": []}
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, IOError) as exc:
        logger.warning("Could not load database: %s", exc)
        return {"users": [], "projects": [], "tasks": []}

def save_db(data: Dict[str, Any]) -> None:
    """Save JSON data to disk."""
    path = _abs_path("data/db.json")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
