const HeroSection = require('../models/HeroSection');

// Get active hero
exports.getHero = async (req, res) => {
  try {
    let hero = await HeroSection.findOne().sort({ updatedAt: -1 });
    
    if (!hero) {
      // Create default hero
      hero = new HeroSection({
        stats: [
          { number: '500+', label: 'Happy Clients', icon: 'FaHome' },
          { number: '15+', label: 'Years Experience', icon: 'FaStar' },
          { number: '24/7', label: 'Support', icon: 'FaShieldAlt' },
          { number: '100%', label: 'Satisfaction', icon: 'FaHeart' }
        ]
      });
      await hero.save();
    }
    
    res.json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update hero
exports.updateHero = async (req, res) => {
  try {
    const hero = await HeroSection.findOneAndUpdate(
      {},
      { ...req.body, updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    
    res.json({
      success: true,
      message: 'Hero updated successfully',
      hero: hero
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};