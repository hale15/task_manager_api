const pool = require('../config/db');

// GET ALL TASKS (for logged in user)
const getTasks = async (req, res) => {
  try {
    const tasks = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );

    res.json({
      count: tasks.rows.length,
      tasks: tasks.rows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET SINGLE TASK
const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (task.rows.length === 0) {
      return res.status(404).json({ 
        message: 'Task not found' 
      });
    }

    res.json({ task: task.rows[0] });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const { title, description, status, due_date } = req.body;

    if (!title) {
      return res.status(400).json({ 
        message: 'Title is required' 
      });
    }

    const newTask = await pool.query(
      `INSERT INTO tasks 
        (user_id, title, description, status, due_date) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [
        req.user.id, 
        title, 
        description || null, 
        status || 'todo', 
        due_date || null
      ]
    );

    res.status(201).json({
      message: 'Task created successfully',
      task: newTask.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, due_date } = req.body;

    // Check task exists and belongs to user
    const existing = await pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ 
        message: 'Task not found' 
      });
    }

    const updatedTask = await pool.query(
      `UPDATE tasks 
       SET 
         title = COALESCE($1, title),
         description = COALESCE($2, description),
         status = COALESCE($3, status),
         due_date = COALESCE($4, due_date)
       WHERE id = $5 AND user_id = $6
       RETURNING *`,
      [title, description, status, due_date, id, req.user.id]
    );

    res.json({
      message: 'Task updated successfully',
      task: updatedTask.rows[0]
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Check task exists and belongs to user
    const existing = await pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ 
        message: 'Task not found' 
      });
    }

    await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );

    res.json({ message: 'Task deleted successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { 
  getTasks, 
  getTask, 
  createTask, 
  updateTask, 
  deleteTask 
};