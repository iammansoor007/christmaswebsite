const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  // Section Header
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

  // Array of service cards
  services: [
    {
      number: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      stat: {
        type: String,
        default: "",
      },
      description: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        default: "#E63946",
      },
      icon: {
        type: String,
        enum: [
          "FaHome",
          "FaBuilding",
          "FaTree",
          "FaSnowflake",
          "FaStar",
          "FaSparkles",
          "FaHandSparkles",
          "FaLightbulb",
          "FaMagic", // Add FaSparkles here
          "FaCheckCircle",
          "FaPhoneAlt",
          "FaQuoteRight",
          "FaCalendarCheck",
        ],
        default: "FaHome",
      },
      features: [
        {
          type: String,
        },
      ],
      imageUrl: {
        type: String,
        default: "/images/demo1.jpeg",
      },
      imageAlt: {
        type: String,
        default: "Christmas lighting service",
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

  // CTA Button
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

  // Metadata
  metaTitle: String,
  metaDescription: String,

  // Status
  isActive: {
    type: Boolean,
    default: true,
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp before saving
serviceSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("Services", serviceSchema);
