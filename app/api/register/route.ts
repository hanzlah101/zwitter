import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  try {
    const { fullName, username, dob, email, password, avatar, coverImage } =
      await request.json();

    const emailExists = await prisma.user?.findUnique({
      where: { email },
    });

    if (emailExists) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 401 }
      );
    }

    const usernameExists = await prisma.user?.findUnique({
      where: { username },
    });

    if (usernameExists) {
      return NextResponse.json(
        { message: "Username already taken" },
        { status: 401 }
      );
    }

    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        fullName,
        username,
        dob,
        email,
        password: hashedPassword,
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
        coverImage: "https://i.stack.imgur.com/CASC4.png",
      },
    });

    return NextResponse.json({ success: true, user }, { status: 201 });
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
