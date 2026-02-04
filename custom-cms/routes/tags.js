const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

// GET all tags
router.get('/', tagController.getAllTags);

// GET single tag
router.get('/:id', tagController.getTag);

// POST create tag
router.post('/', tagController.createTag);

// PUT update tag
router.put('/:id', tagController.updateTag);

// DELETE tag
router.delete('/:id', tagController.deleteTag);

module.exports = router;