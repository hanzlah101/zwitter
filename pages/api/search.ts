import prisma from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query }: any = req.query;

    const users = await prisma.user?.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: "insensitive" } },
          { fullName: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
        ],
      },
    });

    if (!users) return null;

    const safeUsers = users?.map((user) => ({
      ...user,
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
      emailVerified: user.emailVerified?.toISOString() || null,
    }));

    return res.status(200).json({ success: true, safeUsers });
  } catch (error) {
    console.log(error);
  }
}
