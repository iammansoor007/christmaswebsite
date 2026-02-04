const Content = require('../models/Content');

// Get all content
exports.getAllContent = async (req, res) => {
  try {
    console.log('Getting all content...');
    const content = await Content.find().sort({ createdAt: -1 });
    console.log('Found', content.length, 'items');
    res.json(content);
  } catch (error) {
    console.error('Error getting content:', error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

// Get single content by ID
exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

// Get content by slug
exports.getContentBySlug = async (req, res) => {
  try {
    const content = await Content.findOne({ slug: req.params.slug });
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

// Create new content
exports.createContent = async (req, res) => {
  try {
    console.log('Creating content with data:', req.body);
    
    // Validate required fields
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({ 
        error: 'Validation error', 
        message: 'Title and content are required' 
      });
    }
    
    // Create content with defaults
    const contentData = {
      title: req.body.title,
      content: req.body.content,
      type: req.body.type || 'post',
      status: req.body.status || 'draft',
      tags: req.body.tags || []
    };
    
    const content = new Content(contentData);
    const savedContent = await content.save();
    
    console.log('Content created successfully:', savedContent._id);
    res.status(201).json(savedContent);
  } catch (error) {
    console.error('Error creating content:', error);
    res.status(400).json({ 
      error: 'Error creating content', 
      message: error.message,
      details: error.errors 
    });
  }
};

// Update content
exports.updateContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    
    res.json(content);
  } catch (error) {
    res.status(400).json({ error: 'Error updating content', message: error.message });
  }
};// Edit content - Get by ID (for populating edit form)
exports.getContentForEdit = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

// Update the existing updateContent function to this:
exports.updateContent = async (req, res) => {
  try {
    console.log('Updating content ID:', req.params.id, 'with data:', req.body);
    
    const updateData = {
      ...req.body,
      updatedAt: Date.now(),
      lastEditedAt: Date.now(),
      lastEditedBy: req.body.editedBy || 'admin'
    };
    
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true, 
        runValidators: true 
      }
    );
    
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    
    console.log('Content updated successfully:', content._id);
    res.json({
      success: true,
      message: 'Content updated successfully',
      content: content
    });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(400).json({ 
      error: 'Error updating content', 
      message: error.message 
    });
  }
};

// Delete content
exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    
    res.json({ 
      message: 'Content deleted successfully',
      deletedId: content._id 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting content', message: error.message });
  }
};