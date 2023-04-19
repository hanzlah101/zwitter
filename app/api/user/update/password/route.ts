import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { hash, compare } from "bcrypt";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PUT(request: Request) {
  const { oldPassword, newPassword } = await request.json();
  const currentUser = await getCurrentUser();

  try {
    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Please provide all required fields" },
        { status: 400 }
      );
    }

    const isPasswordCorrect = await compare(oldPassword, currentUser?.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { success: false, message: "Old password is invalid" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(newPassword, 12);

    const user = await prisma.user.update({
      where: { id: currentUser?.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error || "Something went wrong" },
      { status: 400 }
    );
  }
}
