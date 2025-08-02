// import { NextRequest, NextResponse } from "next/server";
// import { BlobServiceClient,StorageSharedKeyCredential } from "@azure/storage-blob";

// const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME!;
// const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!;
// const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME!;

// // Connect to Azure Blob Storage
// const blobServiceClient = new BlobServiceClient(
//   `https://${accountName}.blob.core.windows.net`,
//   new StorageSharedKeyCredential(accountName, accountKey)
// );

// export async function POST(req: NextRequest) {
  
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file") as File;
//     console.log(formData);
//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     const containerClient = blobServiceClient.getContainerClient(containerName);
//     const blockBlobClient = containerClient.getBlockBlobClient(file.name);

//     // Read file into buffer
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // Upload buffer to blob storage
//     await blockBlobClient.uploadData(buffer, {
//       blobHTTPHeaders: { blobContentType: file.type },
//     });
//     return NextResponse.json({ message: "File uploaded successfully",  blobName: file.name });
//   } catch (error) {
//     console.error("Upload error:", error);
//     return NextResponse.json({ error: "Upload failed" }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";

// Azure-related setup is commented for now
// import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";

// const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME!;
// const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!;
// const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME!;

// const blobServiceClient = new BlobServiceClient(
//   `https://${accountName}.blob.core.windows.net`,
//   new StorageSharedKeyCredential(accountName, accountKey)
// );

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
