import prisma from "@/prisma/prisma";
import getCurrentUser from "./getCurrentUser";

export default async function getPosts() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const posts = await prisma.post?.findMany({
      where: {
        OR: [
          { ownerId: currentUser?.id },
          { ownerId: { in: currentUser.following } },
        ],
      },
      include: { owner: true },
      orderBy: { createdAt: "desc" },
    });

    const safePosts = posts.map((post) => ({
      ...post,
      createdAt: post?.createdAt.toISOString(),
      updatedAt: post?.updatedAt.toISOString(),
      owner: {
        ...post?.owner,
        createdAt: post?.owner?.createdAt.toISOString(),
        updatedAt: post?.owner?.updatedAt.toISOString(),
        emailVerified: post?.owner?.emailVerified?.toISOString() || null,
      },
    }));

    return safePosts;
  } catch (error: any) {
    throw new Error(error);
  }
}
