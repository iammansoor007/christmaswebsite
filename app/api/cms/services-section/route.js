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
          cache: "no-store",
        },
      );

      if (response.ok) {
        cmsData = await response.json();
        console.log("RAW CMS DATA RECEIVED:", cmsData);

        // Transform and clean the data
        const finalData = {
          badge: cmsData.badge || "Premium Services",
          title: cmsData.title || {
            prefix: "Premium",
            text: "Christmas Lighting Solutions",
          },
          subtitle:
            cmsData.subtitle ||
            "Transform your property with premium installations",
          services: [],
          ctaButton: cmsData.ctaButton || {
            text: cmsData.buttons?.primary || "View All Services",
            url: "/services",
          },
        };

        // Process services array
        if (cmsData.services && cmsData.services.length > 0) {
          finalData.services = cmsData.services.map((service, index) => {
            // Fix image URLs
            let imageUrl = service.imageUrl || "";

            // Clean Next.js Image URLs
            if (imageUrl.includes("_next/image")) {
              // Extract the actual image path from Next.js Image URL
              const urlMatch = imageUrl.match(/url=([^&]+)/);
              if (urlMatch) {
                const decodedUrl = decodeURIComponent(urlMatch[1]);
                if (decodedUrl.startsWith("/")) {
                  imageUrl = `http://localhost:5000${decodedUrl}`;
                }
              }
            }

            // If it's a relative path, make it absolute to CMS server
            else if (
              imageUrl &&
              imageUrl.startsWith("/") &&
              !imageUrl.startsWith("//")
            ) {
              imageUrl = `http://localhost:5000${imageUrl}`;
            }

            // If no valid image URL, use the gallery image or leave empty
            if (!imageUrl || imageUrl.includes("_next/image")) {
              // Try to get from gallery if available
              if (cmsData.gallery && cmsData.gallery.length > 0) {
                const galleryImage = cmsData.gallery[0];
                if (galleryImage.url) {
                  imageUrl = `http://localhost:5000${galleryImage.url}`;
                }
              }
            }

            // Clean stat text - add space if needed
            let stat = service.stat || "";
            if (stat && !stat.includes(" ")) {
              // Add space before numbers: "100+Homes" -> "100+ Homes"
              stat = stat.replace(/(\d+)([A-Za-z]+)/g, "$1 $2");
            }

            return {
              number: service.number || `0${index + 1}`,
              title: service.title || "",
              stat: stat || `${(index + 1) * 100}+ Projects`,
              description: service.description || "",
              color: service.color || "#E63946",
              icon: service.icon || "FaHome",
              imageUrl: imageUrl, // Can be empty string
              imageAlt: service.imageAlt || service.title || "",
              order: service.order || index,
              isActive: service.isActive !== false,
              features: Array.isArray(service.features) ? service.features : [],
            };
          });
        }

        console.log(
          "✅ FINAL DATA PREPARED. Services count:",
          finalData.services.length,
        );
        cmsData = finalData;
      } else {
        console.warn("CMS returned error:", response.status);
      }
    } catch (cmsError) {
      console.warn("CMS fetch failed:", cmsError.message);
    }

    // If CMS fetch failed or no data, use fallback data with real image paths
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
          imageUrl: "",
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
    };

    console.log(
      "✅ RETURNING DATA TO FRONTEND. Services count:",
      data.services?.length,
    );

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("❌ Error in services-section API route:", error);
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
