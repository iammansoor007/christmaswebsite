const mongoose = require("mongoose");

const heroSectionSchema = new mongoose.Schema({
  badge: {
    text: {
      type: String,
      default: "LIMITED TIME: 25% Off Early Bird",
    },
  },
  title: {
    part1: {
      type: String,
      default: "Illuminate",
    },
    part2: {
      type: String,
      default: "Your Holidays",
    },
  },
  backgroundImage: {
    url: {
      type: String,
      default: "/images/hero-background.jpg",
    },
    alt: {
      type: String,
      default: "Christmas Lights Background",
    },
  },
  sideImage: {
    url: {
      type: String,
      default: "/images/rightimage.jpg",
    },
    alt: {
      type: String,
      default: "Beautiful Christmas Tree with professional holiday lighting",
    },
  },
  imageBadge: {
    type: String,
    default: "Our Premium Work",
  },
  subtitle: {
    type: String,
    default: "Premium Christmas Lighting installations",
  },
  features: [
    {
      type: String,
      default: [
        "Professional Installation",
        "Energy Efficient",
        "Custom Design",
        "Free Estimates",
      ],
    },
  ],
  cta: {
    subtext: {
      type: String,
      default: "Call Now for Free Quote",
    },
    phone: {
      type: String,
      default: "(123) 456-7890",
    },
  },
  stats: [
    {
      number: String,
      label: String,
      icon: String,
    },
  ],

  // Drag & Drop Layout
  layout: {
    type: {
      type: String,
      enum: ["default", "left-image", "right-image", "centered", "split"],
      default: "right-image",
    },
    positions: {
      badge: { x: Number, y: Number, width: Number, height: Number },
      title: { x: Number, y: Number, width: Number, height: Number },
      subtitle: { x: Number, y: Number, width: Number, height: Number },
      features: { x: Number, y: Number, width: Number, height: Number },
      cta: { x: Number, y: Number, width: Number, height: Number },
      sideImage: { x: Number, y: Number, width: Number, height: Number },
    },
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HeroSection", heroSectionSchema);
