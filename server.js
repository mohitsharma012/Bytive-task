// Import required packages
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

// Initialize Express app and database
const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database(":memory:", (err) => {
    if (err) {
        return console.error("Error connecting to database:", err.message);
    }
    console.log("Connected to SQLite in-memory database.");

    // Create tasks table
    db.run(`CREATE TABLE tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'pending'
    )`);
});

// Endpoints

// Create a new task
app.post("/tasks", (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }
    const sql = `INSERT INTO tasks (title, description) VALUES (?, ?)`;
    db.run(sql, [title, description], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, title, description, status: "pending" });
    });
});

// Fetch all tasks
app.get("/tasks", (req, res) => {
    const sql = `SELECT * FROM tasks`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

// Fetch a task by ID
app.get("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM tasks WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(row);
    });
});

// Update a task's status
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || !["pending", "in-progress", "completed"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
    }
    const sql = `UPDATE tasks SET status = ? WHERE id = ?`;
    db.run(sql, [status, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json({ id, status });
    });
});

// Delete a task by ID
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM tasks WHERE id = ?`;
    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
