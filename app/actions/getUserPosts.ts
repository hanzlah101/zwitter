import prisma from "@/prisma/prisma";

interface IParams {
  userId?: string;
}

export default async function getUserPosts(params: IParams) {
  try {
    const { userId } = params;

    const user = await prisma.user?.findUnique({
      where: { id: userId },
    });

    if (!user) return null;

    const posts = await prisma.post?.findMany({
      where: { ownerId: user?.id },
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
