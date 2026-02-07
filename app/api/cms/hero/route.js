// app/api/cms/hero/route.js
export async function GET() {
  console.log("API Route: /api/cms/hero called");

  try {
    // Fetch from your CMS backend
    const response = await fetch("http://localhost:5000/api/hero", {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      console.error("CMS responded with error:", response.status);
      return new Response(
        JSON.stringify({
          error: "Failed to fetch from CMS",
          status: response.status,
        }),
        {
          status: 502,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const data = await response.json();
    console.log("Successfully fetched from CMS");

    // FIX: Transform relative image URLs to absolute URLs
    const transformImageUrls = (heroData) => {
      const CMS_BASE_URL = "http://localhost:5000";

      // Helper function to make URL absolute
      const makeAbsolute = (url) => {
        if (!url) return url;

        // If already absolute URL, return as is
        if (url.startsWith("http://") || url.startsWith("https://")) {
          return url;
        }

        // If it starts with /uploads, make it absolute to CMS
        if (url.startsWith("/uploads/")) {
          return `${CMS_BASE_URL}${url}`;
        }

        // If it starts with /images, make it absolute to CMS
        if (url.startsWith("/images/")) {
          return `${CMS_BASE_URL}${url}`;
        }

        // If it's a relative path (starts with /), make it absolute
        if (url.startsWith("/")) {
          return `${CMS_BASE_URL}${url}`;
        }

        // Otherwise, assume it's already a full URL or relative to CMS
        return url;
      };

      // Clone the data to avoid mutating
      const transformed = { ...heroData };

      // Transform background image URL
      if (transformed.backgroundImage && transformed.backgroundImage.url) {
        transformed.backgroundImage = {
          ...transformed.backgroundImage,
          url: makeAbsolute(transformed.backgroundImage.url),
          // Add a backup for Next.js Image component
          absoluteUrl: makeAbsolute(transformed.backgroundImage.url),
        };
      }

      // Transform side image URL
      if (transformed.sideImage && transformed.sideImage.url) {
        transformed.sideImage = {
          ...transformed.sideImage,
          url: makeAbsolute(transformed.sideImage.url),
          // Add a backup for Next.js Image component
          absoluteUrl: makeAbsolute(transformed.sideImage.url),
        };
      }

      return transformed;
    };

    // Transform the data before returning
    const transformedData = transformImageUrls(data);

    return new Response(JSON.stringify(transformedData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60",
      },
    });
  } catch (error) {
    console.error("Error fetching from CMS:", error);

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

// Also add POST/PUT methods if you want to update from Next.js
export async function PUT(request) {
  try {
    const body = await request.json();

    const response = await fetch("http://localhost:5000/api/hero", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to update CMS" }), {
        status: response.status,
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
