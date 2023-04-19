import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { v2 } from "cloudinary";

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();
  const { avatar } = await request.json();

  try {
    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const uploadedImage = await v2.uploader.upload(avatar, {
      folder: "avatars",
      resource_type: "image",
    });

    const user = await prisma.user?.update({
      where: { id: currentUser?.id },
      data: {
        avatar: uploadedImage?.secure_url,
      },
    });

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: error || "Something went wrong",
      },
      { status: 400 }
    );
  }
}
