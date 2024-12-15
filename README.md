# To-Do List API

This is a simple REST API service for managing a to-do list application, built with **Node.js**, **Express**, and **SQLite**.

## Features
- Create a new task with a title, description, and default status (`pending`).
- Fetch all tasks.
- Fetch a task by its ID.
- Update a task's status (`pending`, `in-progress`, `completed`).
- Delete a task by its ID.

## Prerequisites
Make sure you have the following installed:
- **Node.js** (v14 or above)
- **npm** (Node Package Manager)

## Getting Started

### Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Server
1. Start the server:
   ```bash
   node app.js
   ```
2. The server will run on `http://localhost:3000`.

## API Endpoints

### 1. Create a Task
- **URL**: `POST /tasks`
- **Description**: Creates a new task.
- **Request Body**:
  ```json
  {
    "title": "Task title",
    "description": "Task description"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "title": "Task title",
    "description": "Task description",
    "status": "pending"
  }
  ```

### 2. Fetch All Tasks
- **URL**: `GET /tasks`
- **Description**: Retrieves a list of all tasks.
- **Response**:
  ```json
  [
    {
      "id": 1,
      "title": "Task title",
      "description": "Task description",
      "status": "pending"
    }
  ]
  ```

### 3. Fetch a Task by ID
- **URL**: `GET /tasks/:id`
- **Description**: Retrieves a task by its ID.
- **Response**:
  ```json
  {
    "id": 1,
    "title": "Task title",
    "description": "Task description",
    "status": "pending"
  }
  ```

### 4. Update a Task's Status
- **URL**: `PUT /tasks/:id`
- **Description**: Updates the status of a task.
- **Request Body**:
  ```json
  {
    "status": "in-progress"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "status": "in-progress"
  }
  ```

### 5. Delete a Task by ID
- **URL**: `DELETE /tasks/:id`
- **Description**: Deletes a task by its ID.
- **Response**:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

## Testing
You can test the API using tools like **Postman** or **curl**.

### Example curl Commands
- **Create a Task**:
  ```bash
  curl -X POST http://localhost:3000/tasks \
       -H "Content-Type: application/json" \
       -d '{"title": "Test Task", "description": "Task description"}'
  ```
- **Fetch All Tasks**:
  ```bash
  curl http://localhost:3000/tasks
  ```
- **Fetch a Task by ID**:
  ```bash
  curl http://localhost:3000/tasks/1
  ```
- **Update a Task's Status**:
  ```bash
  curl -X PUT http://localhost:3000/tasks/1 \
       -H "Content-Type: application/json" \
       -d '{"status": "completed"}'
  ```
- **Delete a Task**:
  ```bash
  curl -X DELETE http://localhost:3000/tasks/1
  ```

## Project Structure
```
.
├── app.js       # Main application file
├── package.json # Dependencies and project metadata
└── README.md    # Project documentation
```

## .gitignore
Add the following to your `.gitignore` file to prevent unnecessary files from being tracked:
```
node_modules/
*.log
.env
```
