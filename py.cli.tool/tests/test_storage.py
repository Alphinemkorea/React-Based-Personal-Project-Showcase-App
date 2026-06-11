import json
import os
import tempfile

from utils import storage


def test_load_db_missing_file():
    with tempfile.TemporaryDirectory() as tmp:
        original = storage._abs_path
        storage._abs_path = lambda _path: os.path.join(tmp, "db.json")
        try:
            expected = {"users": [], "projects": [], "tasks": []}
            assert storage.load_db() == expected
        finally:
            storage._abs_path = original


def test_load_db_bad_json():
    with tempfile.TemporaryDirectory() as tmp:
        db_path = os.path.join(tmp, "db.json")
        with open(db_path, "w", encoding="utf-8") as f:
            f.write("{bad json")

        original = storage._abs_path
        storage._abs_path = lambda _path: db_path
        try:
            expected = {"users": [], "projects": [], "tasks": []}
            assert storage.load_db() == expected
        finally:
            storage._abs_path = original


def test_save_db_writes_json():
    with tempfile.TemporaryDirectory() as tmp:
        db_path = os.path.join(tmp, "nested", "db.json")
        original = storage._abs_path
        storage._abs_path = lambda _path: db_path
        try:
            data = {"users": [{"id": 1}], "projects": [], "tasks": []}
            storage.save_db(data)
            with open(db_path, "r", encoding="utf-8") as f:
                loaded = json.load(f)
                assert loaded["users"][0]["id"] == 1
        finally:
            storage._abs_path = original
