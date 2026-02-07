const ServiceSection = require("../models/ServiceSection");

exports.getServiceSection = async (req, res) => {
  try {
    console.log("Getting service section data...");

    let service = await ServiceSection.findOne().sort({ updatedAt: -1 });

    if (!service) {
      console.log("No service section found, creating default...");
      service = new ServiceSection({
        badge: "LIMITED TIME: 25% OFF",
        title: {
          prefix: "Expert",
          text: "Holiday Lighting",
        },
        subtitle:
          "Transform your home with professional holiday lighting installations.",
        features: [
          {
            title: "Professional Installation",
            description:
              "Our certified technicians ensure perfect installation",
            icon: "FaTools",
            color: "#E63946",
          },
        ],
        buttons: {
          primary: "Get Free Quote",
          secondary: "View Gallery",
        },
        trustIndicators: {
          homesCount: "500+",
          rating: "4.9",
          reviewsCount: "250+",
        },
        gallery: [
          {
            url: "/images/demo1.jpeg",
            alt: "Christmas lighting",
            order: 0,
          },
        ],
      });
      await service.save();
      console.log("Default service section created");
    }

    console.log("Service section data retrieved successfully");
    res.json(service);
  } catch (error) {
    console.error("❌ Error in getServiceSection:", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateServiceSection = async (req, res) => {
  try {
    console.log("📝 Updating service section with data:", req.body);

    const service = await ServiceSection.findOneAndUpdate(
      {},
      { ...req.body, updatedAt: new Date() },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    console.log("✅ Service section updated");
    res.json({
      success: true,
      message: "Service section updated",
      service: service,
    });
  } catch (error) {
    console.error("❌ Error updating service section:", error);
    res.status(400).json({
      error: error.message,
    });
  }
};
