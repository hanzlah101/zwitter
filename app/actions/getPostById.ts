import prisma from "@/prisma/prisma";

interface IParams {
  postId?: string;
}

export default async function getPostById(params: IParams) {
  try {
    const { postId } = params;

    const post = await prisma.post?.findUnique({
      where: { id: postId },
      include: { owner: true },
    });

    return {
      ...post,
      createdAt: post?.createdAt.toISOString(),
      updatedAt: post?.updatedAt.toISOString(),
      owner: {
        ...post?.owner,
        createdAt: post?.owner?.createdAt.toISOString(),
        updatedAt: post?.owner?.updatedAt.toISOString(),
        emailVerified: post?.owner?.emailVerified?.toISOString() || null,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
