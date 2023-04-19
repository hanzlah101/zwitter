import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  postId?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { postId } = params;

    const post = await prisma.post?.findUnique({ where: { id: postId } });

    if (!post) {
      return NextResponse.json({ message: "No Post Found" }, { status: 400 });
    }

    let postIds = [...(currentUser?.bookmarks || [])];

    if (currentUser.bookmarks?.includes(post.id)) {
      await prisma.user?.update({
        where: { id: currentUser?.id },
        data: { bookmarks: { set: postIds.filter((id) => id !== post?.id) } },
      });

      return NextResponse.json(
        { message: "Bookmark Removed" },
        { status: 200 }
      );
    } else {
      await prisma.user?.update({
        where: { id: currentUser?.id },
        data: { bookmarks: { push: post?.id } },
      });

      return NextResponse.json({ message: "Bookmarked" }, { status: 200 });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}
