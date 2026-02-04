const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/christmas_lights_cms';
console.log('Connecting to MongoDB at:', mongoURI);

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Import routes
const contentRoutes = require('./routes/content');
const categoryRoutes = require('./routes/categories');
const tagRoutes = require('./routes/tags');
const heroRoutes = require('./routes/hero');

// SIMPLE TEST ENDPOINT
app.post('/api/test', (req, res) => {
  console.log('✅ Test endpoint called with:', req.body);
  res.json({ 
    success: true, 
    message: 'Test endpoint works!',
    data: req.body,
    timestamp: new Date().toISOString()
  });
});

// GET TEST ENDPOINT
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'GET test endpoint works!',
    method: 'GET'
  });
});

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Custom CMS API',
    endpoints: {
      content: '/api/content',
      contentById: '/api/content/:id',
      contentBySlug: '/api/content/slug/:slug',
      hero: '/api/hero',
      test: '/api/test'
    }
  });
});

// API routes
app.use('/api/content', contentRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/hero', heroRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found', path: req.path });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
  console.log(`👨‍💼 Admin panel: http://localhost:${PORT}/admin`);
  console.log(`👑 Hero admin: http://localhost:${PORT}/admin/hero.html`);
});