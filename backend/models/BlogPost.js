const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: false, // Will be generated in pre-save hook
    unique: true,
    lowercase: true,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  published: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  readTime: {
    type: Number, // in minutes
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create slug from title before saving
blogPostSchema.pre('save', async function(next) {
  console.log('Pre-save hook triggered:', {
    isNew: this.isNew,
    isModified: this.isModified('title'),
    title: this.title,
    currentSlug: this.slug
  });

  // Generate slug if title is new or modified, or if slug is not present
  if (this.isModified('title') || this.isNew || !this.slug) {
    if (!this.title) {
      return next(new Error('Title is required for slug generation'));
    }

    let baseSlug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s\-]/g, '') // Allow hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    
    if (!baseSlug) {
      baseSlug = 'untitled-post';
    }

    console.log('Generated base slug:', baseSlug);
    
    // Ensure slug uniqueness
    let finalSlug = baseSlug;
    let counter = 1;
    
    // Check if slug already exists (excluding current document)
    while (true) {
      const existingPost = await this.constructor.findOne({
        slug: finalSlug,
        _id: { $ne: this._id }
      });
      
      if (!existingPost) {
        break;
      }
      
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    this.slug = finalSlug;
    console.log('Final slug set:', this.slug);
  }
  
  // Validate that slug exists after generation
  if (!this.slug) {
    return next(new Error('Failed to generate slug'));
  }
  
  // Calculate read time (average 200 words per minute)
  if (this.content) {
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / 200);
  }
  
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
blogPostSchema.index({ published: 1, createdAt: -1 });
blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ tags: 1 });

module.exports = mongoose.model('blogposts', blogPostSchema); 