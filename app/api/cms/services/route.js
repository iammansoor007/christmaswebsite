export async function GET() {
  console.log("API Route: /api/cms/services called");

  try {
    // Try to fetch from CMS
    let cmsData = null;
    try {
      console.log("Fetching from CMS: http://localhost:5000/api/services");
      const response = await fetch("http://localhost:5000/api/services", {
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        cmsData = await response.json();
        console.log("Successfully fetched from CMS:", cmsData);
      } else {
        console.warn("CMS returned error:", response.status);
      }
    } catch (cmsError) {
      console.warn("CMS fetch failed:", cmsError.message);
    }

    // If CMS fetch failed, use fallback data
    const data = cmsData || {
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
          description: "Our certified technicians ensure perfect installation",
          icon: "FaTools",
          color: "#E63946",
        },
        {
          title: "Energy Efficient",
          description: "LED technology saves energy costs",
          icon: "FaShieldAlt",
          color: "#2A9D8F",
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
          absoluteUrl: "/images/demo1.jpeg",
        },
        {
          url: "/images/demo2.jpeg",
          alt: "Holiday lighting",
          order: 1,
          absoluteUrl: "/images/demo2.jpeg",
        },
        {
          url: "/images/demo3.jpeg",
          alt: "Professional installation",
          order: 2,
          absoluteUrl: "/images/demo3.jpeg",
        },
      ],
    };

    // Make image URLs absolute
    const CMS_BASE_URL = "http://localhost:5000";
    if (data.gallery && Array.isArray(data.gallery)) {
      data.gallery = data.gallery.map((item) => ({
        ...item,
        absoluteUrl: item.url.startsWith("/")
          ? `${CMS_BASE_URL}${item.url}`
          : item.url,
      }));
    }

    console.log("Returning data to frontend");
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60",
      },
    });
  } catch (error) {
    console.error("Error in services API route:", error);

    return new Response(
      JSON.stringify({
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
