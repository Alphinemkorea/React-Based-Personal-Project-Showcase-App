#!/usr/bin/env python3

import os
import sys
import json
ROOT = os.path.dirname(__file__)
sys.path.insert(0, ROOT)

from tests.test_models import run as run_model_tests
from tests.test_cli import run_tests as run_cli_tests


def reset_db():
    db_path = os.path.join(ROOT, "data", "db.json")
    os.makedirs(os.path.dirname(db_path), exist_ok=True)
    with open(db_path, "w", encoding="utf-8") as f:
        json.dump({"users": [], "projects": [], "tasks": []}, f)


def main():
    print("=" * 70)
    print("CLI PROJECT TRACKER - TEST SUITE")
    print("=" * 70)
    
    print("\n[1/2] Running model tests...")
    print("-" * 70)
    model_passed = run_model_tests()
    
    print("\n[2/2] Running CLI integration tests...")
    print("-" * 70)
    reset_db()
    cli_passed = run_cli_tests()
    
    print("\n" + "=" * 70)
    if model_passed and cli_passed:
        print("✓ ALL TESTS PASSED")
        print("=" * 70)
        return 0
    else:
        print("✗ SOME TESTS FAILED")
        print("=" * 70)
        return 1


if __name__ == "__main__":
    sys.exit(main())
