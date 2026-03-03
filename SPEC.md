# Year Plan To Do List Application - Specification

## 1. Project Overview
- **Project Name**: Year Plan To Do List
- **Type**: Full-stack web application
- **Core Functionality**: A todo list application where users can plan their year by adding monthly goals and tasks, with data stored in SQLite database and managed via Flask backend
- **Target Users**: Anyone who wants to organize their yearly goals

## 2. Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Python Flask
- **Database**: SQLite with SQLAlchemy ORM

## 3. UI/UX Specification

### Layout Structure
- **Header**: App title with year selector
- **Main Content**: 12-month grid layout (3 columns x 4 rows on desktop)
- **Modal**: For adding/editing tasks
- **Responsive Breakpoints**:
  - Mobile: < 768px (1 column)
  - Tablet: 768px - 1024px (2 columns)
  - Desktop: > 1024px (3 columns)

### Visual Design
- **Color Palette**:
  - Background: `#0d1117` (dark navy)
  - Card Background: `#161b22` (dark slate)
  - Primary Accent: `#58a6ff` (bright blue)
  - Secondary Accent: `#f78166` (coral orange)
  - Success: `#3fb950` (green)
  - Text Primary: `#e6edf3` (off-white)
  - Text Secondary: `#8b949e` (gray)
  - Border: `#30363d` (dark gray)

- **Typography**:
  - Font Family: 'Outfit' (Google Fonts)
  - Headings: 600 weight
  - Body: 400 weight
  - Month Title: 24px
  - Task Text: 14px

- **Spacing**:
  - Card padding: 20px
  - Grid gap: 20px
  - Task item padding: 12px

- **Visual Effects**:
  - Card hover: subtle scale(1.02) and box-shadow
  - Smooth transitions: 0.3s ease
  - Checkbox animation: strikethrough effect
  - Delete button: fade in on hover

### Components
1. **Month Card**
   - Month name header
   - Add task button
   - Task list with checkboxes
   - Task count indicator

2. **Task Item**
   - Checkbox for completion
   - Task description text
   - Delete button (appears on hover)

3. **Modal**
   - Input field for task
   - Save and Cancel buttons
   - Backdrop blur effect

4. **Year Selector**
   - Dropdown to select year
   - Shows current year by default

## 4. Database Schema

### Table: tasks
| Column | Type | Description |
|--------|------|-------------|
| id | Integer (Primary Key) | Auto-increment ID |
| year | Integer | Year of the task |
| month | Integer | Month (1-12) |
| description | String | Task description |
| completed | Boolean | Completion status |
| created_at | DateTime | Creation timestamp |

## 5. API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks/<year> | Get all tasks for a year |
| POST | /api/tasks | Create new task |
| PUT | /api/tasks/<id> | Update task (toggle complete) |
| DELETE | /api/tasks/<id> | Delete task |

## 6. Functionality Specification

### Core Features
1. View all months with their tasks in a grid
2. Add new task to any month
3. Mark task as complete/incomplete
4. Delete tasks
5. Filter by year
6. Persist all data in SQLite database

### User Interactions
- Click "Add" button on month card → Opens modal
- Enter task text and save → Task appears in list
- Click checkbox → Toggles completion with strikethrough
- Hover over task → Shows delete button
- Click delete → Removes task from list
- Change year → Loads tasks for that year

## 7. File Structure
```
project/
├── app.py              # Flask application
├── requirements.txt    # Python dependencies
├── database.py         # Database models
├── static/
│   ├── index.html      # Main HTML file
│   ├── style.css       # Stylesheet
│   └── script.js       # Frontend JavaScript
└── todo.db             # SQLite database (auto-created)
```

## 8. Acceptance Criteria
- [ ] Flask server runs without errors
- [ ] Database is created and connected
- [ ] Frontend displays 12-month grid
- [ ] Can add tasks to any month
- [ ] Tasks persist after page refresh
- [ ] Can mark tasks as complete
- [ ] Can delete tasks
- [ ] Can switch between years
- [ ] Responsive design works on all screen sizes
- [ ] Visual design matches specification
