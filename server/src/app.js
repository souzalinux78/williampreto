const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');

const healthRoutes = require('./routes/health');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admin');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

// Middlewares
app.use(helmet({ crossOriginResourcePolicy: false })); // Permite puxar a imagem local sem bloquear pelo CORS
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Static files (Uploads)
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/public', apiRoutes);
app.use('/api/admin', authMiddleware, adminRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
