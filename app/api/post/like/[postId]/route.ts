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

    const { postId }: any = params;

    const post = await prisma.post?.findUnique({ where: { id: postId } });

    if (!post) {
      return NextResponse.json({ message: "No Post Found" }, { status: 400 });
    }

    let postIds = [...(post.likes || [])];

    if (post.likes?.includes(currentUser?.id)) {
      await prisma.post?.update({
        where: { id: post.id },
        data: {
          likes: { set: postIds?.filter((id) => id !== currentUser?.id) },
        },
      });

      return NextResponse.json({ message: "Unliked" }, { status: 200 });
    } else {
      await prisma.post?.update({
        where: { id: post.id },
        data: { likes: { push: currentUser?.id } },
      });

      return NextResponse.json({ message: "Liked" }, { status: 200 });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}
