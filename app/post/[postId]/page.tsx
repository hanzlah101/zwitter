import getCurrentUser from "@/app/actions/getCurrentUser";
import getPostById from "@/app/actions/getPostById";
import CommentForm from "@/app/components/CommentForm";
import Comments from "@/app/components/Comments";
import Heading from "@/app/components/Heading";
import Post from "@/app/components/Post";
import Topbar from "@/app/components/Topbar";
import { Metadata } from "next";
import React from "react";

interface IParams {
  postId?: string;
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const post = await getPostById(params);
  return {
    title: `Zwitter | ${post?.owner?.fullName}'s Zweet`,
  };
}

const SinglePost = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const post = await getPostById(params);

  return (
    <div className="min-h-screen">
      <Topbar title={`${post?.owner?.fullName}'s Zweet`} />

      {/* @ts-ignore */}
      <Post currentUser={currentUser} post={post} single />

      <div className="border-x border-b p-4">
        <Heading title="Comments" />

        {/* @ts-ignore */}
        {post?.comments?.length > 0 ? (
          post?.comments?.map((comment, i) => (
            <Comments
              key={i}
              comment={comment}
              currentUser={currentUser || null}
              // @ts-ignore
              post={post}
            />
          ))
        ) : (
          <div className="flex items-center text-sm font-semibold">
            No comment on this zweet yet!
          </div>
        )}

        {/* @ts-ignore */}
        {currentUser && <CommentForm post={post} />}
      </div>
    </div>
  );
};

export default SinglePost;
