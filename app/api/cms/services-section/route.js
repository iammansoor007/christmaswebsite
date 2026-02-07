export async function GET() {
  console.log("API Route: /api/cms/services-section called");

  try {
    // Try to fetch from CMS
    let cmsData = null;
    try {
      console.log(
        "Fetching from CMS: http://localhost:5000/api/services-section",
      );
      const response = await fetch(
        "http://localhost:5000/api/services-section",
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.ok) {
        cmsData = await response.json();
        console.log("Successfully fetched from CMS");
      } else {
        console.warn("CMS returned error:", response.status);
      }
    } catch (cmsError) {
      console.warn("CMS fetch failed:", cmsError.message);
    }

    // If CMS fetch failed, use fallback data
    const data = cmsData || {
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
          imageUrl: "/images/demo1.jpeg",
          imageAlt: "Residential Christmas lighting",
          order: 1,
          isActive: true,
        },
        {
          number: "02",
          title: "Commercial & Corporate",
          stat: "100+ Businesses",
          description: "Professional holiday displays that attract customers.",
          color: "#2A9D8F",
          icon: "FaBuilding",
          features: [
            "Building Facade Lighting",
            "Parking Lot Illumination",
            "Branded Displays",
          ],
          imageUrl: "/images/demo2.jpeg",
          imageAlt: "Commercial Christmas lighting",
          order: 2,
          isActive: true,
        },
      ],
      ctaButton: {
        text: "View All Services",
        url: "/services",
      },
    };

    // Make image URLs absolute
    const CMS_BASE_URL = "http://localhost:5000";
    if (data.services && Array.isArray(data.services)) {
      data.services = data.services.map((service) => ({
        ...service,
        imageUrl: service.imageUrl.startsWith("/")
          ? `${CMS_BASE_URL}${service.imageUrl}`
          : service.imageUrl,
      }));
    }

    console.log("Returning services data to frontend");
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60",
      },
    });
  } catch (error) {
    console.error("Error in services-section API route:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error",
        message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
