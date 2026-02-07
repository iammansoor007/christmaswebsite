const mongoose = require("mongoose");

const serviceSectionSchema = new mongoose.Schema({
  badge: {
    type: String,
    default: "LIMITED TIME: 25% OFF",
  },
  title: {
    prefix: {
      type: String,
      default: "Expert",
    },
    text: {
      type: String,
      default: "Holiday Lighting",
    },
  },
  subtitle: {
    type: String,
    default:
      "Transform your home with professional holiday lighting installations.",
  },
  features: [
    {
      title: String,
      description: String,
      icon: {
        type: String,
        default: "FaCheckCircle",
      },
      color: {
        type: String,
        default: "#E63946",
      },
    },
  ],
  buttons: {
    primary: {
      type: String,
      default: "Get Free Quote",
    },
    secondary: {
      type: String,
      default: "View Gallery",
    },
  },
  trustIndicators: {
    homesCount: {
      type: String,
      default: "500+",
    },
    rating: {
      type: String,
      default: "4.9",
    },
    reviewsCount: {
      type: String,
      default: "250+",
    },
  },
  gallery: [
    {
      url: String,
      alt: String,
      order: {
        type: Number,
        default: 0,
      },
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// FIXED: This middleware was causing the error
serviceSectionSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("ServiceSection", serviceSectionSchema);
