const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    sparse: true,
  },
  type: {
    type: String,
    enum: ["post", "page", "service", "testimonial"],
    default: "post",
  },
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft",
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    maxlength: 200,
  },
  featuredImage: {
    url: String,
    alt: String,
  },
  gallery: [
    {
      url: String,
      alt: String,
      caption: String,
    },
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String],
  author: {
    type: String,
    default: "Admin",
  },
  views: {
    type: Number,
    default: 0,
  },
  publishedAt: Date,
  scheduledFor: Date,
  createdBy: {
    type: String,
    default: "admin",
  },
  editedBy: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Generate slug from title before saving
contentSchema.pre("save", function (next) {
  if (this.isModified("title") && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }
  next();
});

module.exports = mongoose.model("Content", contentSchema);