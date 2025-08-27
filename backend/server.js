const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
// app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api/', limiter);

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI,
      {
        useNewUrlParser: true,
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Ekesta Portfolio API is running!', 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/blog', require('./routes/blog'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/auth', require('./routes/auth'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🦇 Ekesta Portfolio Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
}); 