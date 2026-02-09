const mongoose = require("mongoose");

const serviceSectionSchema = new mongoose.Schema({
  badge: {
    type: String,
    default: "Premium Services",
  },
  title: {
    prefix: {
      type: String,
      default: "Premium",
    },
    text: {
      type: String,
      default: "Christmas Lighting Solutions",
    },
  },
  subtitle: {
    type: String,
    default:
      "Transform your property with premium, energy-efficient lighting installations",
  },
  services: [
    {
      number: {
        type: String,
        default: "01",
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        default: "FaHome",
      },
      color: {
        type: String,
        default: "#E63946",
      },
      imageUrl: {
        type: String,
        default: "",
      },
      imageAlt: {
        type: String,
        default: "",
      },
      features: [
        {
          type: String,
        },
      ],
      stat: {
        type: String,
        default: "100+ Homes",
      },
      order: {
        type: Number,
        default: 0,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
  ],
  ctaButton: {
    text: {
      type: String,
      default: "View All Services",
    },
    url: {
      type: String,
      default: "/services",
    },
  },
  // Legacy fields for backward compatibility
  features: [
    {
      title: String,
      description: String,
      icon: String,
      color: String,
    },
  ],
  buttons: {
    primary: String,
    secondary: String,
  },
  trustIndicators: {
    homesCount: String,
    rating: String,
    reviewsCount: String,
  },
  gallery: [
    {
      url: String,
      alt: String,
      order: Number,
    },
  ],
  metaKeywords: [String],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

serviceSectionSchema.pre("save", function (next) {
  this.updatedAt = new Date();

  // If there are features but no services, migrate them
  if (
    this.features &&
    this.features.length > 0 &&
    (!this.services || this.services.length === 0)
  ) {
    this.services = this.features.map((feature, index) => ({
      number: `0${index + 1}`,
      title: feature.title || "",
      description: feature.description || "",
      icon: feature.icon || "FaHome",
      color: feature.color || "#E63946",
      imageUrl: "",
      imageAlt: feature.title || "",
      features: [],
      stat: `${(index + 1) * 100}+ Projects`,
      order: index,
      isActive: true,
    }));
  }

  next();
});

module.exports = mongoose.model("ServiceSection", serviceSectionSchema);
