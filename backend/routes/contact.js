const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const Contact = require('../models/Contact');

// Contact form rate limiting - stricter than general API
const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Max 3 contact form submissions per 15 minutes per IP
  message: {
    success: false,
    message: 'Too many contact form submissions. Please wait 15 minutes before trying again.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Per-email rate limiting to prevent email spam
const emailRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Max 5 submissions per hour per IP
  keyGenerator: (req) => {
    return req.body.email || req.ip;
  },
  message: {
    success: false,
    message: 'Too many messages from this email address. Please wait an hour before sending another message.'
  },
});

// Enhanced email transporter setup
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email credentials not configured. Email notifications disabled.');
    return null;
  }

  const service = process.env.EMAIL_SERVICE || 'gmail';
  let config = {};

  switch (service.toLowerCase()) {
    case 'gmail':
      config = {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      };
      break;
    
    case 'outlook':
    case 'hotmail':
      config = {
        service: 'hotmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      };
      break;
    
    case 'custom':
      config = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER || process.env.EMAIL_USER,
          pass: process.env.SMTP_PASS || process.env.EMAIL_PASS
        }
      };
      break;
    
    default:
      console.error(`Unsupported email service: ${service}`);
      return null;
  }

  try {
    return nodemailer.createTransport(config);
  } catch (error) {
    console.error('Error creating email transporter:', error);
    return null;
  }
};

// Validation middleware
const contactValidation = [
  body('name')
    .notEmpty()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Name is required and must be less than 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('subject')
    .notEmpty()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Subject is required and must be less than 200 characters'),
  body('message')
    .notEmpty()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Message is required and must be less than 2000 characters')
];

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Please fix the following errors',
      errors: errors.array()
    });
  }
  next();
};

// Enhanced email templates
const getNotificationEmailTemplate = (name, email, subject, message, contact) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Message</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%); color: #FFD700; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">
            🦇 New Contact Message
          </h1>
          <p style="margin: 10px 0 0 0; color: #E0E0E0; font-size: 16px;">
            From your Ekesta Portfolio
          </p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 15px 0; color: #333; font-size: 20px;">Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 80px;">Name:</td>
                <td style="padding: 8px 0; color: #333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 8px 0; color: #333;">
                  <a href="mailto:${email}" style="color: #FFD700; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td>
                <td style="padding: 8px 0; color: #333;">${subject}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #ffffff; border: 2px solid #FFD700; border-radius: 8px; padding: 20px;">
            <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">Message:</h3>
            <div style="color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>
          
          <!-- Reply Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" 
               style="background: linear-gradient(135deg, #FFD700 0%, #FFC107 100%); 
                      color: #000; 
                      padding: 12px 30px; 
                      text-decoration: none; 
                      border-radius: 25px; 
                      font-weight: bold; 
                      display: inline-block;
                      box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);">
              📧 Reply to ${name}
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px;">
          <p style="margin: 0;">
            <strong>Received:</strong> ${new Date(contact.createdAt).toLocaleString()}<br>
            <strong>IP Address:</strong> ${contact.ipAddress}
          </p>
          <p style="margin: 10px 0 0 0;">
            This message was sent from your Ekesta Portfolio contact form.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const getAutoReplyTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Your Message</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%); color: #FFD700; padding: 40px; text-align: center;">
          <h1 style="margin: 0; font-size: 32px; font-weight: bold;">
            🦇 Message Received
          </h1>
          <p style="margin: 15px 0 0 0; color: #E0E0E0; font-size: 18px;">
            Thank you for reaching out!
          </p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px;">
          <h2 style="color: #333; margin: 0 0 20px 0; font-size: 24px;">
            Hi ${name}! 👋
          </h2>
          
          <p style="color: #555; line-height: 1.8; margin: 0 0 20px 0; font-size: 16px;">
            Thank you for your message! I've received it and will get back to you as soon as possible, 
            usually within <strong style="color: #FFD700;">24-48 hours</strong>.
          </p>
          
          <div style="background-color: #f8f9fa; border-left: 4px solid #FFD700; padding: 20px; margin: 25px 0;">
            <p style="margin: 0; color: #666; font-style: italic;">
              "In the meantime, feel free to explore my portfolio and check out my latest projects. 
              The night is darkest just before the dawn!" 🌅
            </p>
          </div>
          
          <p style="color: #555; line-height: 1.8; margin: 20px 0 0 0; font-size: 16px;">
            If your message is urgent, you can also reach out to me on:
          </p>
          
          <!-- Social Links -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://linkedin.com/in/EkestaAkehrgi" style="display: inline-block; margin: 0 10px; color: #0077B5; text-decoration: none;">
              🔗 LinkedIn
            </a>
            <a href="https://github.com/EkestaAkehrgi" style="display: inline-block; margin: 0 10px; color: #333; text-decoration: none;">
              🐙 GitHub
            </a>
            <a href="https://x.com/EkestaAkehrgi" style="display: inline-block; margin: 0 10px; color: #1DA1F2; text-decoration: none;">
              🐦 X
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #0D0D0D; color: #E0E0E0; padding: 30px; text-align: center;">
          <p style="margin: 0; font-size: 16px;">
            Best regards,<br>
            <strong style="color: #FFD700;">${process.env.EMAIL_ADMIN_NAME || 'Ekesta Portfolio'}</strong>
          </p>
          <p style="margin: 15px 0 0 0; font-size: 12px; color: #999;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// POST /api/contact - Submit contact form
router.post('/', contactRateLimit, emailRateLimit, contactValidation, handleValidationErrors, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Create contact record
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip || req.connection.remoteAddress
    });
    
    await contact.save();
    
    // Send email notifications (if configured)
    const transporter = createTransporter();
    if (transporter) {
      try {
        // Send notification email to admin
        const notificationOptions = {
          from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          replyTo: email,
          subject: `🦇 Portfolio Contact: ${subject}`,
          html: getNotificationEmailTemplate(name, email, subject, message, contact)
        };
        
        await transporter.sendMail(notificationOptions);
        console.log('✅ Admin notification email sent successfully');

        // Send auto-reply to user (if enabled)
        if (process.env.ENABLE_AUTO_REPLY !== 'false') {
          const autoReplyOptions = {
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to: email,
            replyTo: process.env.EMAIL_REPLY_TO || process.env.EMAIL_FROM || process.env.EMAIL_USER,
            subject: `Thank you for contacting ${process.env.EMAIL_ADMIN_NAME || 'Ekesta Portfolio'} 🦇`,
            html: getAutoReplyTemplate(name)
          };
          
          await transporter.sendMail(autoReplyOptions);
          console.log('✅ Auto-reply email sent successfully to:', email);
        }

      } catch (emailError) {
        console.error('❌ Error sending email:', emailError);
        // Continue even if email fails - the contact is still saved
      }
    } else {
      console.log('⚠️ Email transporter not configured - emails skipped');
    }
    
    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        subject: contact.subject,
        createdAt: contact.createdAt
      }
    });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again later.'
    });
  }
});

// GET /api/contact - Get all contact messages (for admin use)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = status ? { status } : {};
    
    const contacts = await Contact.find(query)
      .select()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
      
    const total = await Contact.countDocuments(query);
    
    res.json({
      success: true,
      data: contacts,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact messages'
    });
  }
});

// PUT /api/contact/:id/status - Update contact status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: new, read, or replied'
      });
    }
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating contact status'
    });
  }
});

module.exports = router; 