# Project Tracker CLI

Python CLI for managing users, projects, and tasks.

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Usage

Create a user:

```bash
python main.py add-user --name Alex --email alex@example.com
```

Create a project for that user:

```bash
python main.py add-project --user Alex --title "CLI Tool" --due 2026-12-31
```

Create a task in that project:

```bash
python main.py add-task --project "CLI Tool" --title "Write code" --assigned Alex
```

List saved data:

```bash
python main.py list-users
python main.py list-projects --user Alex
python main.py list-tasks --project "CLI Tool"
```

Mark a task as done:

```bash
python main.py complete-task --task-id 1
```

## Tests

```bash
python3 run_tests.py
```
