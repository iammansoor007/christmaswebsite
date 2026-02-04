const mongoose = require('mongoose');

const heroSectionSchema = new mongoose.Schema({
  badge: {
    text: {
      type: String,
      default: 'LIMITED TIME: 25% Off Early Bird'
    }
  },
  title: {
    part1: {
      type: String,
      default: 'Illuminate'
    },
    part2: {
      type: String,
      default: 'Your Holidays'
    }
  },
   backgroundImage: {
    url: {
      type: String,
      default: '/images/hero-background.jpg'
    },
    alt: {
      type: String,
      default: 'Christmas Lights Background'
    }
  },
  sideImage: {
    url: {
      type: String,
      default: '/images/rightimage.jpg'
    },
    alt: {
      type: String,
      default: 'Beautiful Christmas Tree with professional holiday lighting'
    }
  },
  imageBadge: {
    type: String,
    default: 'Our Premium Work'
  },
  subtitle: {
    type: String,
    default: 'Premium Christmas Lighting installations'
  },
  features: [{
    type: String,
    default: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4']
  }],
  cta: {
    subtext: {
      type: String,
      default: 'Call Now for Free Quote'
    },
    phone: {
      type: String,
      default: '(123) 456-7890'
    }
  },
  stats: [{
    number: String,
    label: String,
    icon: String
  }],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('HeroSection', heroSectionSchema);