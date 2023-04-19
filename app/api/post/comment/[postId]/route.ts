import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { v4 } from "uuid";

interface IParams {
  postId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { postId } = params;

    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      return NextResponse.json({ message: "No Post Found" }, { status: 400 });
    }

    const { comment } = await request.json();

    if (!comment || comment === "") {
      return NextResponse.json(
        { message: "Please add a comment" },
        { status: 400 }
      );
    }

    const objectId = v4().replace(/-/g, "");

    const commentData = {
      _id: objectId.toString(),
      comment,
      user: currentUser,
      post: post.id,
      createdAt: new Date(Date.now()).toString(),
    };

    await prisma.post?.update({
      where: { id: post?.id },
      data: {
        comments: { push: commentData },
      },
    });

    return NextResponse.json({ message: "Comment Posted Successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { postId } = params;
    const { commentId } = await request.json();

    if (!commentId) {
      return NextResponse.json(
        { message: "No Comment Found" },
        { status: 400 }
      );
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      return NextResponse.json({ message: "No Post Found" }, { status: 400 });
    }

    if (post?.ownerId !== currentUser?.id) {
      return NextResponse.json(
        { message: "You are not allowed!" },
        { status: 400 }
      );
    }

    let commentIds = [...(post?.comments || [])];

    await prisma.post?.update({
      where: { id: postId },
      data: {
        comments: {
          set: commentIds?.filter((comment: any) => comment?._id !== commentId),
        },
      },
    });

    return NextResponse.json({ message: "Comment Deleted Successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}
