 import { NextRequest, NextResponse } from "next/server";
// import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
// import { OpenAI } from "openai";
// import * as pdfParse from "pdf-parse";

// export const runtime = "nodejs";

// // Helper to read stream into buffer
// async function streamToBuffer(readable: NodeJS.ReadableStream): Promise<Buffer> {
//   const chunks: Buffer[] = [];
//   for await (const chunk of readable) {
//     chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
//   }
//   return Buffer.concat(chunks);
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { blobName } = await req.json();

//     if (!blobName) {
//       return NextResponse.json({ error: "Missing blobName" }, { status: 400 });
//     }

//     // Azure Blob Storage setup
//     const account = process.env.AZURE_STORAGE_ACCOUNT_NAME!;
//     const key = process.env.AZURE_STORAGE_ACCOUNT_KEY!;
//     const container = process.env.AZURE_STORAGE_CONTAINER_NAME!;
//     const sharedKey = new StorageSharedKeyCredential(account, key);
//     const blobService = new BlobServiceClient(
//       `https://${account}.blob.core.windows.net`,
//       sharedKey
//     );

//     const containerClient = blobService.getContainerClient(container);
//     const blobClient = containerClient.getBlobClient(blobName);
//     const downloadResponse = await blobClient.download();


// const blobs = [];
// for await (const blob of containerClient.listBlobsFlat()) {
//   blobs.push(blob.name);
// }
//     if (!downloadResponse.readableStreamBody) {
//       throw new Error("No blob stream available");
//     }

//     const buffer = await streamToBuffer(downloadResponse.readableStreamBody);
//     const { text: resumeText } = await pdfParse(buffer);

//     // OpenAI client setup
//     const openai = new OpenAI({
//       apiKey: process.env.AZURE_OPENAI_API_KEY!,
//       baseURL: process.env.AZURE_OPENAI_ENDPOINT!,
//       defaultQuery: { "api-version": "2024-02-15-preview" },
//       defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY! },
//     });

//     // OpenAI completion request
//     const completion = await openai.chat.completions.create({
//       model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME!,
//       messages: [
//         { role: "system", content: "You are a helpful career coach." },
//         {
//           role: "user",
//           content: `Analyze this resume:\n\n${resumeText}`,
//         },
//       ],
//       temperature: 0.7,
//       max_tokens: 500,
//     });

//     const analysis = completion.choices?.[0]?.message?.content ?? "No analysis generated.";
//     return NextResponse.json({ analysis });

//   } catch (error: any) {
//     console.error("Analyze error:", error);
//     return NextResponse.json(
//       { error: error.message || "Failed to analyze resume" },
//       { status: 500 }
//     );
//   }
// }

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

