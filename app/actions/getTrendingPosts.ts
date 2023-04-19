import prisma from "@/prisma/prisma";

export default async function getTrendingPosts() {
  try {
    const posts = await prisma.post?.findMany({
      where: { NOT: { likes: { isEmpty: true } } },
      orderBy: { likes: "desc" },
      include: { owner: true },
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
    console.log(error);
  }
}
