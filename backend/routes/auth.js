const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();
// Auth rate limiting - prevent brute force
const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 attempts per 15 minutes per IP
  message: {
    success: false,
    message: 'Too many authentication attempts. Please wait 15 minutes before trying again.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation middleware
const authValidation = [
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 1 })
    .withMessage('Password cannot be empty')
];

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    });
  }
  next();
};

// POST /api/auth/blog - Verify blog editor password
router.post('/blog', authRateLimit, authValidation, handleValidationErrors, async (req, res) => {
  try {
    const { password } = req.body;
    const adminPassword = process.env.BLOG_ADMIN_PASSWORD || 'ekesta123';
    
    if (password !== adminPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }
    
    // Generate a simple session token (in production, use proper JWT)
    const sessionToken = Buffer.from(`blog-session-${Date.now()}-${Math.random()}`).toString('base64');
    
    res.json({
      success: true,
      message: 'Authentication successful',
      token: sessionToken,
      expiresIn: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
    });
    
  } catch (error) {
    console.error('Error in blog authentication:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication error'
    });
  }
});

// GET /api/auth/verify - Verify session token
router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token || !token.startsWith('YmxvZy1zZXNzaW9u')) { // Base64 check for "blog-session"
    return res.status(401).json({
      success: false,
      message: 'Invalid or missing token'
    });
  }
  
  // In a real app, verify token expiry and validity
  // For simplicity, we just check if it's a valid format
  res.json({
    success: true,
    message: 'Token is valid'
  });
});

module.exports = router; 