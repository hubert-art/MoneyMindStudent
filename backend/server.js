require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const userRoutes = require('./routes/user');

const app = express();

// Middleware 
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));

// Routes 
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/user', userRoutes);

// Health check 
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error.' });
});

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`MoneyMind API running on http://localhost:${PORT}`);
});
