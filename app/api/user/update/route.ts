import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();
  const { fullName, username, dob, email } = await request.json();

  try {
    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail && existingEmail.id !== currentUser.id) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 401 }
      );
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername && existingUsername.id !== currentUser.id) {
      return NextResponse.json(
        { message: "Username already taken" },
        { status: 401 }
      );
    }

    // if (coverImage) {
    //   const uploadedImage = await v2.uploader.upload(coverImage, {
    //     folder: "cover_images",
    //     resource_type: "image",
    //   });

    //   const user = await prisma.user?.update({
    //     where: { id: currentUser?.id },
    //     data: {
    //       avatar: uploadedImage?.secure_url,
    //     },
    //   });

    //   return NextResponse.json({ success: true, user }, { status: 200 });
    // }

    const user = await prisma.user.update({
      where: { id: currentUser?.id },
      data: {
        fullName,
        username,
        dob,
        email,
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
