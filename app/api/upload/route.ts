// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Create a clean filename without special characters
    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const publicId = `zarwa-payments/${timestamp}_${cleanName}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create form data for Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", new Blob([buffer], { type: file.type }));
    cloudinaryFormData.append("upload_preset", "zarwa_organics");
    cloudinaryFormData.append("public_id", publicId);
    cloudinaryFormData.append("folder", "zarwa-zarwa_organics");

    console.log("🟡 Uploading to Cloudinary:", {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      publicId: publicId,
    });

    // Upload to Cloudinary
    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: cloudinaryFormData,
      }
    );

    const cloudinaryData = await cloudinaryResponse.json();

    if (!cloudinaryResponse.ok || cloudinaryData.error) {
      console.error("❌ Cloudinary error:", cloudinaryData);
      throw new Error(cloudinaryData.error?.message || "Upload failed");
    }

    console.log("✅ Upload successful:", cloudinaryData.secure_url);

    return NextResponse.json({
      success: true,
      imageUrl: cloudinaryData.secure_url,
      publicId: cloudinaryData.public_id,
    });
  } catch (error: any) {
    console.error("❌ Upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Upload failed. Please try again.",
      },
      { status: 500 }
    );
  }
}
