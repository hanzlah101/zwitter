import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  userId?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { userId }: any = params;

    const otherUser = await prisma.user?.findUnique({ where: { id: userId } });

    if (!otherUser) {
      return NextResponse.json({ message: "No User Found" }, { status: 400 });
    }

    let followingIds = [...(currentUser.following || [])];
    let followersIds = [...(otherUser.followers || [])];

    if (currentUser.following?.includes(otherUser.id)) {
      await prisma.user?.update({
        where: { id: currentUser.id },
        data: {
          following: {
            set: followingIds.filter((id: string) => id !== otherUser.id),
          },
        },
      });

      await prisma.user?.update({
        where: { id: otherUser.id },
        data: {
          followers: {
            set: followersIds.filter((id: string) => id !== currentUser.id),
          },
        },
      });

      return NextResponse.json({ message: "Followed" }, { status: 200 });
    } else {
      await prisma.user?.update({
        where: { id: currentUser.id },
        data: { following: { push: otherUser.id } },
      });

      await prisma.user?.update({
        where: { id: otherUser.id },
        data: { followers: { push: currentUser.id } },
      });

      return NextResponse.json({ message: "Unfollowed" }, { status: 200 });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}
