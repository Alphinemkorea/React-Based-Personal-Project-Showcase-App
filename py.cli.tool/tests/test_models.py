"""Unit tests for model classes."""

from models.user import User
from models.person import Person
from models.project import Project
from models.task import Task


class TestModels:
    
    def test_user_to_from_dict(self):
        u = User(id=1, name="Alice", email="alice@example.com")
        d = u.to_dict()
        u2 = User.from_dict(d)
        assert u2.id == 1
        assert u2.name == "Alice"
        assert u2.email == "alice@example.com"
        assert isinstance(u2, Person)

    def test_user_rejects_bad_email(self):
        try:
            User(id=1, name="Alice", email="not-an-email")
            assert False, "Expected invalid email to raise ValueError"
        except ValueError:
            assert True
    
    def test_user_repr(self):
        u = User(id=1, name="Alice")
        assert "User" in repr(u)
        assert "Alice" in repr(u)
    
    def test_user_id_generation(self):
        User.set_next_id([1, 2, 3])
        assert User.next_id() == 4
        assert User.next_id() == 5
    
    def test_project_to_from_dict(self):
        p = Project(id=1, title="Website", description="Main site", due_date="December 31, 2026", owner_id=1)
        p.task_ids = [1, 2]
        d = p.to_dict()
        p2 = Project.from_dict(d)
        assert p2.id == 1
        assert p2.title == "Website"
        assert p2.due_date == "2026-12-31"
        assert p2.task_ids == [1, 2]
    
    def test_project_repr(self):
        p = Project(id=1, title="Website")
        assert "Project" in repr(p)
        assert "Website" in repr(p)
    
    def test_project_id_generation(self):
        Project.set_next_id([10, 20])
        assert Project.next_id() == 21
        assert Project.next_id() == 22
    
    def test_task_to_from_dict(self):
        t = Task(id=1, title="Design", status="open", assigned_to=1, project_id=1, contributor_ids=[1, 2])
        d = t.to_dict()
        t2 = Task.from_dict(d)
        assert t2.id == 1
        assert t2.title == "Design"
        assert t2.status == "open"
        assert t2.assigned_to == 1
        assert t2.contributor_ids == [1, 2]
    
    def test_task_default_status(self):
        t = Task(id=1, title="Test")
        assert t.status == "open"
    
    def test_task_repr(self):
        t = Task(id=1, title="Test", status="open")
        assert "Task" in repr(t)
        assert "Test" in repr(t)
    
    def test_task_id_generation(self):
        Task.set_next_id([5, 10])
        assert Task.next_id() == 11
        assert Task.next_id() == 12
    
    def test_task_status_transitions(self):
        t = Task(id=1, title="Test")
        assert t.status == "open"
        t.status = "done"
        assert t.status == "done"

    def test_task_rejects_invalid_status(self):
        try:
            Task(id=1, title="Test", status="blocked")
            assert False, "Expected invalid status to raise ValueError"
        except ValueError:
            assert True

    def test_task_add_contributor_once(self):
        t = Task(id=1, title="Test")
        t.add_contributor(2)
        t.add_contributor(2)
        assert t.contributor_ids == [2]
    
    def test_project_empty_task_ids(self):
        p = Project(id=1, title="Empty")
        assert len(p.task_ids) == 0
        p.task_ids.append(1)
        assert len(p.task_ids) == 1


def run():
    test_obj = TestModels()
    methods = [m for m in dir(test_obj) if m.startswith("test_")]
    
    passed = 0
    failed = 0
    errors = []
    
    for method_name in methods:
        try:
            method = getattr(test_obj, method_name)
            method()
            print(f"  ✓ {method_name}")
            passed += 1
        except AssertionError as e:
            print(f"  ✗ {method_name}: {str(e)[:80]}")
            failed += 1
            errors.append((method_name, str(e)))
        except Exception as e:
            print(f"  ✗ {method_name}: {str(e)[:80]}")
            failed += 1
            errors.append((method_name, str(e)))
    
    if failed > 0:
        print(f"\n  Failed tests:")
        for name, error in errors:
            print(f"    - {name}: {error[:70]}")
    
    print(f"\n  Model Tests: {passed} passed, {failed} failed")
    return failed == 0


if __name__ == "__main__":
    import sys
    success = run()
    sys.exit(0 if success else 1)
