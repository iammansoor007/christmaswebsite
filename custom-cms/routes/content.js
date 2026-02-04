const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

// GET all content
router.get('/', contentController.getAllContent);

// GET content by ID
router.get('/:id', contentController.getContentById);

// GET content for edit
router.get('/edit/:id', contentController.getContentForEdit);

// GET content by slug
router.get('/slug/:slug', contentController.getContentBySlug);

// POST create new content
router.post('/', contentController.createContent);

// PUT update content
router.put('/:id', contentController.updateContent);

// PATCH partial update
router.patch('/:id', contentController.updateContent);

// DELETE content
router.delete('/:id', contentController.deleteContent);

module.exports = router;