import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { v2 } from "cloudinary";

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { caption, images } = await request.json();

    if (!caption) {
      return NextResponse.json(
        { message: "Please enter a caption" },
        { status: 400 }
      );
    }

    if (images) {
      const uploadedImages: any = [];

      for (const image of images) {
        const uploadedImage = await v2.uploader.upload(image, {
          folder: "posts",
          resource_type: "auto",
        });

        uploadedImages.push({
          public_id: uploadedImage.public_id,
          url: uploadedImage.secure_url,
        });
      }

      const post = await prisma.post?.create({
        data: {
          caption,
          images: uploadedImages,
          ownerId: currentUser?.id,
        },
      });

      return NextResponse.json({ success: true, post }, { status: 201 });
    }

    const post = await prisma.post?.create({
      data: {
        caption,
        ownerId: currentUser?.id,
      },
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}
