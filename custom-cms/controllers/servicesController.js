const Services = require("../models/Services");

// Get services section
exports.getServices = async (req, res) => {
  try {
    console.log("Getting services data...");

    let services = await Services.findOne().sort({ updatedAt: -1 });

    if (!services) {
      console.log("No services found, creating default...");
      services = new Services({
        badge: "Premium Services",
        title: {
          prefix: "Premium",
          text: "Christmas Lighting Solutions",
        },
        subtitle:
          "Transform your property with premium, energy-efficient lighting installations",
        services: [
          {
            number: "01",
            title: "Residential Lighting",
            stat: "500+ Homes",
            description:
              "Complete home transformation with custom-designed lighting displays that enhance your property's architectural features and create magical holiday memories.",
            color: "#E63946",
            icon: "FaHome",
            features: [
              "Roofline & Gutter Lighting",
              "Tree & Shrub Wrapping",
              "Pathway Illumination",
              "Custom Holiday Scenes",
            ],
            imageUrl: "/images/demo1.jpeg",
            imageAlt: "Residential Christmas lighting",
            order: 1,
            isActive: true,
          },
          {
            number: "02",
            title: "Commercial & Corporate",
            stat: "100+ Businesses",
            description:
              "Professional holiday displays that attract customers, boost brand visibility, and showcase your business's festive spirit to the community.",
            color: "#2A9D8F",
            icon: "FaBuilding",
            features: [
              "Building Facade Lighting",
              "Parking Lot Illumination",
              "Branded Displays",
              "High-Traffic Area Focus",
            ],
            imageUrl: "/images/demo2.jpeg",
            imageAlt: "Commercial Christmas lighting",
            order: 2,
            isActive: true,
          },
          {
            number: "03",
            title: "Landscape & Architectural",
            stat: "Custom Designs",
            description:
              "Strategic lighting that highlights your property's natural beauty and architectural details, creating stunning visual compositions day and night.",
            color: "#F4A261",
            icon: "FaTree",
            features: [
              "Tree Canopy Lighting",
              "Garden Feature Highlights",
              "Architectural Accent Lighting",
              "Water Feature Illumination",
            ],
            imageUrl: "/images/demo3.jpeg",
            imageAlt: "Landscape lighting",
            order: 3,
            isActive: true,
          },
          {
            number: "04",
            title: "Premium Custom Displays",
            stat: "Award Winning",
            description:
              "One-of-a-kind lighting installations designed specifically for your property and vision, featuring advanced technology and creative design.",
            color: "#1D3557",
            icon: "FaSparkles",
            features: [
              "Animated Light Shows",
              "Musical Synchronization",
              "Themed Installations",
              "Interactive Elements",
            ],
            imageUrl: "/images/demo4.jpeg",
            imageAlt: "Custom lighting display",
            order: 4,
            isActive: true,
          },
        ],
        ctaButton: {
          text: "View All Services",
          url: "/services",
        },
      });
      await services.save();
      console.log("Default services created");
    }

    // Sort services by order
    if (services.services && services.services.length > 0) {
      services.services.sort((a, b) => a.order - b.order);
    }

    console.log("Services data retrieved successfully");
    res.json(services);
  } catch (error) {
    console.error("❌ Error in getServices:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update services section
exports.updateServices = async (req, res) => {
  try {
    console.log("📝 Updating services section with data:", req.body);

    const services = await Services.findOneAndUpdate(
      {},
      { ...req.body, updatedAt: new Date() },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    console.log("✅ Services section updated");
    res.json({
      success: true,
      message: "Services section updated successfully",
      services: services,
    });
  } catch (error) {
    console.error("❌ Error updating services:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
