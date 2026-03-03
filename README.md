# Year Plan To Do List

A full-stack web application for planning your year with monthly goals and tasks.

## Features

- 📅 12-month grid layout for yearly planning
- ✅ Add, complete, and delete tasks for each month
- 🗄️ SQLite database for data persistence
- 🎨 Modern dark theme UI
- 📱 Responsive design for all devices
- 🔐 User authentication system

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Python Flask
- **Database**: SQLite with SQLAlchemy ORM

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd project-1
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
python app.py
```

4. Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
project/
├── app.py              # Flask application
├── database.py         # Database models
├── requirements.txt    # Python dependencies
├── static/             # CSS and JavaScript files
├── templates/          # HTML templates
└── instance/           # Database files (auto-created)
```

## Usage

1. Register or login to your account
2. View the 12-month grid layout
3. Click "Add" on any month to create a new task
4. Check off tasks as you complete them
5. Delete tasks by hovering and clicking the delete button
6. Switch between years using the year selector

## License

MIT License
