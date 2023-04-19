import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function DELETE(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    const user = await prisma.user?.findUnique({
      where: { id: currentUser?.id },
    });

    await prisma.post?.deleteMany({
      where: { ownerId: currentUser?.id },
    });

    const posts = await prisma.post?.findMany({
      where: { likes: { has: currentUser?.id } },
    });

    posts.map(async (post) => {
      await prisma.post?.update({
        where: { id: post?.id },
        data: {
          likes: { set: post?.likes?.filter((id) => id !== currentUser?.id) },
        },
      });
    });

    posts.map(async (post) => {
      await prisma.post?.update({
        where: { id: post?.id },
        data: {
          comments: {
            set: post?.comments?.filter(
              (comment: any) => comment?._id !== currentUser?.id
            ),
          },
        },
      });
    });

    await prisma?.user?.delete({ where: { id: currentUser?.id } });

    return NextResponse.json(
      { success: true, message: "Account deleted successfully!" },
      { status: 200 }
    );
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
