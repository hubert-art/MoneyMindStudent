const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../db');
const authMiddleware = require('../middleware/auth');

// All transaction routes require a valid JWT
router.use(authMiddleware);

// GET /api/transactions 
// Returns all transactions for the logged-in user, newest first
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, title, amount, type, date FROM transactions WHERE user_id = ? ORDER BY date DESC, created_at DESC',
      [req.userId]
    );
    res.json(rows);
  } catch (err) {
    console.error('Get transactions error:', err);
    res.status(500).json({ message: 'Failed to fetch transactions.' });
  }
});

// POST /api/transactions
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
    body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
    body('date').isISO8601().withMessage('Date must be a valid date (YYYY-MM-DD)'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, amount, type, date } = req.body;

    try {
      const [result] = await pool.query(
        'INSERT INTO transactions (user_id, title, amount, type, date) VALUES (?, ?, ?, ?, ?)',
        [req.userId, title, amount, type, date]
      );

      res.status(201).json({
        id: result.insertId,
        title,
        amount: Number(amount),
        type,
        date,
      });
    } catch (err) {
      console.error('Create transaction error:', err);
      res.status(500).json({ message: 'Failed to create transaction.' });
    }
  }
);

// PUT /api/transactions/:id 
router.put(
  '/:id',
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('amount').optional().isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
    body('type').optional().isIn(['income', 'expense']).withMessage('Type must be income or expense'),
    body('date').optional().isISO8601().withMessage('Date must be a valid date (YYYY-MM-DD)'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, amount, type, date } = req.body;

    try {
      // Ensure this transaction belongs to the logged-in user
      const [rows] = await pool.query(
        'SELECT id FROM transactions WHERE id = ? AND user_id = ?',
        [id, req.userId]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Transaction not found.' });
      }

      await pool.query(
        'UPDATE transactions SET title = COALESCE(?, title), amount = COALESCE(?, amount), type = COALESCE(?, type), date = COALESCE(?, date) WHERE id = ?',
        [title, amount, type, date, id]
      );

      // Return the updated row
      const [updated] = await pool.query(
        'SELECT id, title, amount, type, date FROM transactions WHERE id = ?',
        [id]
      );

      res.json(updated[0]);
    } catch (err) {
      console.error('Update transaction error:', err);
      res.status(500).json({ message: 'Failed to update transaction.' });
    }
  }
);

// DELETE /api/transactions/:id 
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      'SELECT id FROM transactions WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Transaction not found.' });
    }

    await pool.query('DELETE FROM transactions WHERE id = ?', [id]);
    res.json({ message: 'Transaction deleted.' });
  } catch (err) {
    console.error('Delete transaction error:', err);
    res.status(500).json({ message: 'Failed to delete transaction.' });
  }
});

module.exports = router;
