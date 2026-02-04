const Tag = require('../models/Tag');

// Get all tags
exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ name: 1 });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single tag
exports.getTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create tag
exports.createTag = async (req, res) => {
  try {
    // Ensure tag name is lowercase
    if (req.body.name) {
      req.body.name = req.body.name.toLowerCase();
    }
    
    const tag = new Tag(req.body);
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update tag
exports.updateTag = async (req, res) => {
  try {
    // Ensure tag name is lowercase
    if (req.body.name) {
      req.body.name = req.body.name.toLowerCase();
    }
    
    const tag = await Tag.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    
    res.json(tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete tag
exports.deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    
    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};