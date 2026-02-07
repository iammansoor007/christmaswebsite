const HeroSection = require("../models/HeroSection");
const path = require("path");
const fs = require("fs");

// Get active hero
exports.getHero = async (req, res) => {
  try {
    let hero = await HeroSection.findOne().sort({ updatedAt: -1 });

    if (!hero) {
      hero = new HeroSection({
        badge: { text: "LIMITED TIME: 25% Off Early Bird" },
        title: { part1: "Illuminate", part2: "Your Holidays" },
        subtitle: "Premium Christmas Lighting installations",
        features: [
          "Professional Installation",
          "Energy Efficient",
          "Custom Design",
          "Free Estimates",
        ],
        cta: { subtext: "Call Now for Free Quote", phone: "(123) 456-7890" },
        backgroundImage: {
          url: "/images/hero-background.jpg",
          alt: "Christmas Lights Background",
        },
        sideImage: {
          url: "/images/rightimage.jpg",
          alt: "Beautiful Christmas Tree with professional holiday lighting",
        },
        imageBadge: "Our Premium Work",
        stats: [
          { number: "500+", label: "Happy Clients", icon: "FaHome" },
          { number: "15+", label: "Years Experience", icon: "FaStar" },
          { number: "24/7", label: "Support", icon: "FaShieldAlt" },
          { number: "100%", label: "Satisfaction", icon: "FaHeart" },
        ],
        layout: {
          type: "right-image",
          positions: {
            badge: { x: 10, y: 5, width: 200, height: 40 },
            title: { x: 10, y: 15, width: 500, height: 120 },
            subtitle: { x: 10, y: 40, width: 400, height: 60 },
            features: { x: 10, y: 55, width: 400, height: 120 },
            cta: { x: 10, y: 75, width: 300, height: 80 },
            sideImage: { x: 55, y: 20, width: 300, height: 350 },
          },
        },
      });
      await hero.save();
    }

    res.json(hero);
  } catch (error) {
    console.error("❌ Error in getHero:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update hero
exports.updateHero = async (req, res) => {
  try {
    console.log("📝 Updating hero with data:", req.body);

    const hero = await HeroSection.findOneAndUpdate(
      {},
      { ...req.body, updatedAt: Date.now() },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    console.log("✅ Hero updated successfully");

    res.json({
      success: true,
      message: "Hero updated successfully",
      hero: hero,
    });
  } catch (error) {
    console.error("❌ Error in updateHero:", error);
    res.status(400).json({ error: error.message });
  }
};

// Update layout only
exports.updateLayout = async (req, res) => {
  try {
    const { layout } = req.body;

    const hero = await HeroSection.findOneAndUpdate(
      {},
      {
        layout: layout,
        updatedAt: Date.now(),
      },
      { new: true },
    );

    res.json({
      success: true,
      message: "Layout updated successfully",
      hero: hero,
    });
  } catch (error) {
    console.error("❌ Error updating layout:", error);
    res.status(400).json({ error: error.message });
  }
};

// Upload image and update hero
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { field, altText } = req.body;
    const fileUrl = `/uploads/${req.file.filename}`;

    // Update hero with new image
    let updateData = {};
    if (field === "backgroundImage") {
      updateData.backgroundImage = {
        url: fileUrl,
        alt: altText || "Background Image",
      };
    } else if (field === "sideImage") {
      updateData.sideImage = {
        url: fileUrl,
        alt: altText || "Side Image",
      };
    }

    const hero = await HeroSection.findOneAndUpdate(
      {},
      { ...updateData, updatedAt: Date.now() },
      { new: true },
    );

    res.json({
      success: true,
      message: "Image uploaded and hero updated",
      url: fileUrl,
      hero: hero,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ error: error.message });
  }
};
