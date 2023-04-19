import prisma from "@/prisma/prisma";
import getCurrentUser from "./getCurrentUser";

export default async function getSuggestions() {
  try {
    const currentUser = await getCurrentUser();

    const users = await prisma.user.findMany({
      where: {
        id: { not: currentUser?.id },
        NOT: { id: { in: currentUser?.following } },
      },
      take: 3,
    });

    if (!users) return null;

    const safeUsers = users.map((user) => ({
      ...user,
      createdAt: user?.createdAt.toISOString(),
      updatedAt: user?.updatedAt.toISOString(),
      emailVerified: user.emailVerified?.toISOString() || null,
    }));

    return safeUsers;
  } catch (error) {
    console.log(error);
  }
}
