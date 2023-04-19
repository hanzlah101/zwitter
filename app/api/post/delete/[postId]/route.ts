import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { v2 } from "cloudinary";

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface IParams {
  postId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { postId }: any = params;

    const post = await prisma.post?.findUnique({ where: { id: postId } });

    if (!post) {
      return NextResponse.json({ message: "No Post Found" }, { status: 400 });
    }

    if (post.ownerId !== currentUser.id) {
      return NextResponse.json(
        { message: "You can't delete this post" },
        { status: 400 }
      );
    }

    if (post.images.length > 0) {
      post.images?.forEach(async (img: any) => {
        await v2.uploader.destroy(img.public_id);
      });
    }

    await prisma.post?.delete({ where: { id: post.id } });

    return NextResponse.json({ message: "Post Deleted" });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}
