const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  slug: { 
    type: String, 
    unique: true,
    sparse: true
  },
  content: { 
    type: String, 
    required: true 
  },
  excerpt: {
    type: String,
    maxlength: 200
  },
  type: { 
    type: String, 
    default: 'post' 
  },
  status: { 
    type: String, 
    default: 'draft' 
  },
  categories: [{ 
    type: String 
  }],
  tags: [{ 
    type: String 
  }],
  featuredImage: {
    type: String
  },
  metaTitle: {
    type: String
  },
  metaDescription: {
    type: String
  },
  lastEditedBy: {
    type: String,
    default: 'admin'
  },
  lastEditedAt: {
    type: Date,
    default: Date.now
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

// Generate slug from title if not provided
contentSchema.pre('save', async function() {
  this.updatedAt = Date.now();
  this.lastEditedAt = Date.now();
  
  // Generate slug if not provided
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
      .substring(0, 100);
  }
  
  // Generate excerpt from content if not provided
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 197) + '...';
  }
});

module.exports = mongoose.model('Content', contentSchema);