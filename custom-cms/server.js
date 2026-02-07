const express = require("express");
const mongoose = require("mongoose");
const serviceRoutes = require("./routes/services");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const servicesSectionRoutes = require("./routes/servicesSection");

const app = express();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "public/uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const fileFilter = (req, file, cb) => {
  console.log("📄 File upload attempt:", {
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
  });

  const allowedMimes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ];

  if (allowedMimes.includes(file.mimetype)) {
    console.log("✅ File accepted:", file.mimetype);
    cb(null, true);
  } else {
    console.log("❌ File rejected:", file.mimetype);
    cb(
      new Error(
        `Invalid file type: ${file.mimetype}. Allowed types: ${allowedMimes.join(", ")}`,
      ),
      false,
    );
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// MongoDB connection
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/christmas_lights_cms";
console.log("Connecting to MongoDB at:", mongoURI);

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Import models
require("./models/Content");
require("./models/Category");
require("./models/Tag");
require("./models/HeroSection");

// Import routes
const contentRoutes = require("./routes/content");
const categoryRoutes = require("./routes/categories");
const tagRoutes = require("./routes/tags");
const heroRoutes = require("./routes/hero");

// File upload endpoints
app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded or invalid file type",
      });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    console.log("📁 File uploaded successfully:", fileUrl);

    res.json({
      success: true,
      url: fileUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Upload failed",
    });
  }
});
// Add to your route setup (around line 121-124)
app.use("/api/services-section", servicesSectionRoutes);

app.post("/api/upload-multiple", upload.array("images", 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No files uploaded or invalid file types",
      });
    }

    const files = req.files.map((file) => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
    }));

    console.log(`📁 ${files.length} files uploaded successfully`);

    res.json({
      success: true,
      files: files,
    });
  } catch (error) {
    console.error("❌ Multi upload error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Upload failed",
    });
  }
});



// Add this line after other model imports:
require("./models/Services");
app.use("/api/services", serviceRoutes);
// New endpoint for hero image upload with field specification
app.post("/api/upload/hero", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded or invalid file type",
      });
    }

    const { field, altText } = req.body;
    const fileUrl = `/uploads/${req.file.filename}`;

    console.log(`📁 Hero ${field} uploaded:`, fileUrl);

    res.json({
      success: true,
      url: fileUrl,
      filename: req.file.filename,
      field: field,
      altText: altText || "",
    });
  } catch (error) {
    console.error("❌ Hero upload error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Upload failed",
    });
  }
});

app.delete("/api/upload/:filename", (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "public/uploads", filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("🗑️ File deleted:", filename);
      res.json({ success: true, message: "File deleted successfully" });
    } else {
      res.status(404).json({
        success: false,
        error: "File not found",
      });
    }
  } catch (error) {
    console.error("❌ Delete error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Delete failed",
    });
  }
});

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working!",
    timestamp: new Date().toISOString(),
  });
});

// Test upload endpoint
app.get("/api/test-upload", (req, res) => {
  res.json({
    success: true,
    message: "Upload endpoint is ready",
    allowedTypes: ["jpeg", "jpg", "png", "gif", "webp", "svg"],
    maxSize: "10MB",
  });
});

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Christmas Lights CMS API",
    endpoints: {
      hero: "/api/hero",
      upload: "/api/upload",
      "upload-hero": "/api/upload/hero",
      content: "/api/content",
      test: "/api/test",
    },
  });
});

// API routes
app.use("/api/content", contentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/hero", heroRoutes);

// Serve visual editor
app.get("/admin/visual-hero", (req, res) => {
  res.sendFile(path.join(__dirname, "public/admin/visual-hero.html"));
});

// Serve admin pages
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public/admin/index.html"));
});

app.get("/admin/hero", (req, res) => {
  res.sendFile(path.join(__dirname, "public/admin/hero.html"));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
    path: req.path,
  });
});

// Improved error handler
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.message || err);

  // Multer errors
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        error: "File size is too large. Maximum size is 10MB.",
      });
    }
    return res.status(400).json({
      success: false,
      error: `Upload error: ${err.message}`,
    });
  }

  // Other errors
  res.status(500).json({
    success: false,
    error: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
  console.log(`👑 Admin Dashboard: http://localhost:${PORT}/admin`);
  console.log(`🌟 Hero Editor: http://localhost:${PORT}/admin/hero`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
  console.log(`📁 Uploads URL: http://localhost:${PORT}/uploads`);
  console.log(`📋 Upload test: http://localhost:${PORT}/api/test-upload`);
});
