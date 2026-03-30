const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../db');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

// GET /api/user/profile 
router.get('/profile', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, email, created_at FROM users WHERE id = ?',
      [req.userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Failed to fetch profile.' });
  }
});

// PUT /api/user/profile
router.put(
  '/profile',
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Please provide a valid email'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;

    try {
      // If changing email, check it's not already taken by another user
      if (email) {
        const [existing] = await pool.query(
          'SELECT id FROM users WHERE email = ? AND id != ?',
          [email, req.userId]
        );
        if (existing.length > 0) {
          return res.status(409).json({ message: 'Email is already in use.' });
        }
      }

      await pool.query(
        'UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email) WHERE id = ?',
        [name, email, req.userId]
      );

      const [rows] = await pool.query(
        'SELECT id, name, email FROM users WHERE id = ?',
        [req.userId]
      );

      res.json(rows[0]);
    } catch (err) {
      console.error('Update profile error:', err);
      res.status(500).json({ message: 'Failed to update profile.' });
    }
  }
);

module.exports = router;
