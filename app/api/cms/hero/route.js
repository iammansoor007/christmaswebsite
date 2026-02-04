// app/api/cms/hero/route.js
export async function GET() {
  console.log('API Route: /api/cms/hero called');
  
  try {
    // Fetch from your CMS
    const response = await fetch('http://localhost:5000/api/hero');
    
    if (!response.ok) {
      console.error('CMS responded with error:', response.status);
      throw new Error('CMS server error');
    }
    
    const data = await response.json();
    console.log('Got data from CMS');
    
    // Return the data exactly as received
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
  } catch (error) {
    console.error('Error fetching from CMS:', error);
    
    // Return simple fallback data
    const fallbackData = {
      badge: { text: "LIMITED TIME: 25% Off Early Bird" },
      title: { part1: "Illuminate", part2: "Your Holidays" },
      subtitle: "Premium Christmas Lighting installations",
      features: ["Professional Installation", "Energy-Efficient LED Lights"],
      cta: { subtext: "Call Now", phone: "(123) 456-7890" }
    };
    
    return new Response(JSON.stringify(fallbackData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}