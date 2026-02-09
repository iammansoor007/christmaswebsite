const ServiceSection = require("../models/ServiceSection");

// Get services section
exports.getServices = async (req, res) => {
  try {
    console.log("Getting services section data...");

    let services = await ServiceSection.findOne().sort({ updatedAt: -1 });

    if (!services) {
      console.log("No services found, creating default...");
      services = new ServiceSection({
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
              "Complete home transformation with custom-designed lighting displays.",
            color: "#E63946",
            icon: "FaHome",
            features: [
              "Roofline & Gutter Lighting",
              "Tree & Shrub Wrapping",
              "Pathway Illumination",
              "Custom Holiday Scenes",
            ],
            imageUrl: "",
            imageAlt: "Residential Christmas lighting",
            order: 1,
            isActive: true,
          },
          {
            number: "02",
            title: "Commercial & Corporate",
            stat: "100+ Businesses",
            description:
              "Professional holiday displays that attract customers.",
            color: "#2A9D8F",
            icon: "FaBuilding",
            features: [
              "Building Facade Lighting",
              "Parking Lot Illumination",
              "Branded Displays",
            ],
            imageUrl: "",
            imageAlt: "Commercial Christmas lighting",
            order: 2,
            isActive: true,
          },
        ],
        ctaButton: {
          text: "View All Services",
          url: "/services",
        },
      });
      await services.save();
      console.log("Default services section created");
    }

    console.log("Services section data retrieved successfully");
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

    const services = await ServiceSection.findOneAndUpdate(
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
    console.error("❌ Error updating services section:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
