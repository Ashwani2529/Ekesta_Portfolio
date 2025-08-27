const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const BlogPost = require('../models/BlogPost');

// Validation middleware
const blogValidation = [
  body('title').notEmpty().trim().isLength({ max: 200 }).withMessage('Title is required and must be less than 200 characters'),
  body('content').notEmpty().withMessage('Content is required'),
  body('excerpt').notEmpty().trim().isLength({ max: 300 }).withMessage('Excerpt is required and must be less than 300 characters'),
  body('tags').optional().isArray().withMessage('Tags must be an array')
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

// GET /api/blog - Get all published blog posts
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, tag, search } = req.query;
    let query = {};
    
    // Add tag filter
    if (tag) {
      query.tags = { $in: [tag.toLowerCase()] };
    }
    
    // Add search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }
    
    const posts = await BlogPost.find(query)
      .select('title slug excerpt tags createdAt readTime views featured')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
      
    const total = await BlogPost.countDocuments(query);
    res.json({
      success: true,
      data: posts,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts'
    });
  }
});

// GET /api/blog/featured - Get featured posts
router.get('/featured', async (req, res) => {
  try {
    const posts = await BlogPost.find({ published: true, featured: true })
      .select('title slug excerpt tags createdAt readTime views')
      .sort({ createdAt: -1 })
      .limit(3)
      .exec();
      
    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured posts'
    });
  }
});

// GET /api/blog/tags - Get all tags
router.get('/tags', async (req, res) => {
  try {
    const tags = await BlogPost.aggregate([
      { $match: { published: true } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      success: true,
      data: tags.map(tag => ({ name: tag._id, count: tag.count }))
    });
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tags'
    });
  }
});

// GET /api/blog/:slug - Get single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    );
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post'
    });
  }
});

// POST /api/blog - Create new blog post
router.post('/', blogValidation, handleValidationErrors, async (req, res) => {
  try {
    const { title, content, excerpt, tags, published = false, featured = false } = req.body;
    console.log('Creating blog post with data:', req.body);
    
    const blogPost = new BlogPost({
      title,
      content,
      excerpt,
      tags: tags ? tags.map(tag => tag.toLowerCase()) : [],
      published,
      featured
    });
    
    console.log('Blog post before save:', {
      title: blogPost.title,
      slug: blogPost.slug,
      isNew: blogPost.isNew
    });
    
    await blogPost.save();
    
    console.log('Blog post after save:', {
      title: blogPost.title,
      slug: blogPost.slug,
      _id: blogPost._id
    });
    
    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: blogPost
    });
  } catch (error) {
    console.error('Error details:', error.message);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.message,
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A blog post with this title already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating blog post',
      error: error.message
    });
  }
});

// PUT /api/blog/:slug - Update blog post
router.put('/:slug', blogValidation, handleValidationErrors, async (req, res) => {
  try {
    const { title, content, excerpt, tags, published, featured } = req.body;
    console.log(req.body);
    const post = await BlogPost.findOneAndUpdate(
      { slug: req.params.slug },
      {
        title,
        content,
        excerpt,
        tags: tags ? tags.map(tag => tag.toLowerCase()) : [],
        published,
        featured,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: post
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating blog post'
    });
  }
});

// DELETE /api/blog/:slug - Delete blog post
router.delete('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOneAndDelete({ slug: req.params.slug });
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post'
    });
  }
});

module.exports = router; 