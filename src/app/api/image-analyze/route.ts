// import { NextResponse } from "next/server";

// export const runtime = "nodejs";

// export async function POST(req: Request) {
//   try {
//     // Parse multipart/form-data (image file) from request
//     const formData = await req.formData();
//     console.log("FormData received:", formData);

//     const file = formData.get("image") as Blob | null;
//     if (!file) {
//       console.log("No image file provided");
//       return NextResponse.json({ error: "No image file provided" }, { status: 400 });
//     }

//     // Convert Blob to Buffer
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);
//     console.log("Buffer created from image file, size:", buffer.length);

//     // Get Azure API credentials from environment variables
//     const endpoint = process.env.AZURE_COGNITIVE_ENDPOINT!;
//     const key = process.env.AZURE_COGNITIVE_KEY!;

//     console.log("Calling Azure Computer Vision API at:", endpoint);

//     // Send image to Azure Computer Vision API
//     const response = await fetch(
//       `${endpoint}/vision/v3.2/analyze?visualFeatures=description&language=en`,
//       {
//         method: "POST",
//         headers: {
//           "Ocp-Apim-Subscription-Key": key,
//           "Content-Type": "application/octet-stream",
//         },
//         body: buffer,
//       }
//     );

//     console.log("Azure response status:", response.status);

//     if (!response.ok) {
//       const error = await response.json();
//       console.error("Azure API error:", error);
//       return NextResponse.json(
//         { error: error.message || "Failed to analyze image" },
//         { status: 500 }
//       );
//     }

//     const data = await response.json();
//     console.log("Azure API response data:", data);

//     // Extract caption from response
//     const caption =
//       data.description?.captions?.[0]?.text ||
//       "No description available for this image.";

//     console.log("Image analysis caption:", caption);

//     return NextResponse.json({ analysis: caption });

//   } catch (error: unknown) {
//     console.error("Unexpected error:", error);

//     // Type-safe error handling
//     if (error instanceof Error) {
//       return NextResponse.json(
//         { error: error.message || "Unexpected error" },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       { error: "Unexpected error" },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    // Simulate handling file upload
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Simulated success response
    return NextResponse.json({
      message: "Simulated upload success",
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
    });
  } catch (error) {
    console.error("Simulated upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
