import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) { 
  try {
    // parse multipart/form-data (image file) from request
    const formData = await req.formData();
    console.log("FormData received:", formData);   
    const file = formData.get("image") as Blob | null;
    if (!file) {
      console.log("No image file provided");
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    // Convert Blob to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log("Buffer created from image file, size:", buffer.length);
       // Call Azure Computer Vision API
    const endpoint = process.env.AZURE_COGNITIVE_ENDPOINT!;
    const key = process.env.AZURE_COGNITIVE_KEY!;
    console.log("Calling Azure Computer Vision API at:", endpoint);
 
      
  const response = await fetch(`${endpoint}/vision/v3.2/analyze?visualFeatures=description&language=en`, {
  method: "POST",
  headers: {
    "Ocp-Apim-Subscription-Key": key,
    "Content-Type": "application/octet-stream",
  },
  body: buffer,
});
     
    console.log("Azure response status:", response.status);
    if (!response.ok) {
      const error = await response.json();
      console.error("Azure API error:", error);
      return NextResponse.json({ error: error.message || "Failed to analyze image" }, { status: 500 });
    }

    const data = await response.json();
    console.log("Azure API response data:", data);

    // Extract caption from response
    const caption =
      data.description?.captions?.[0]?.text ||
      "No description available for this image.";

    console.log("Image analysis caption:", caption);
    return NextResponse.json({ analysis: caption });
  } catch (error: any) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: error.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
