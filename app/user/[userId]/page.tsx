import React from "react";
import ProfileCard from "@/app/components/profile/ProfileCard";
import ProfileInfo from "@/app/components/profile/ProfileInfo";
import Post from "@/app/components/Post";
import getUserById from "@/app/actions/getUserById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getUserPosts from "@/app/actions/getUserPosts";
import { FiCamera } from "react-icons/fi";
import { Metadata } from "next";

interface IParams {
  userId?: string;
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const user = await getUserById(params);
  return {
    title: `Zwitter | ${user?.fullName}'s Profile`,
  };
}

const Profile = async ({ params }: { params: IParams }) => {
  const user = await getUserById(params);
  const currentUser = await getCurrentUser();
  const userPosts = await getUserPosts(params);

  return (
    <div className="min-h-screen">
      <div className="border-b pb-8 border-x">
        <ProfileCard user={user} currentUser={currentUser} />
        <ProfileInfo user={user} />
      </div>

      <div className="h-full">
        {/* @ts-ignore */}
        {userPosts?.length > 0 ? (
          userPosts?.map((post: any, i: number) => (
            <Post key={i} currentUser={currentUser} post={post} />
          ))
        ) : (
          <div className="w-full md:h-44 h-40 gap-1 border-x text-xl flex items-center justify-center font-bold flex-col">
            <div className="p-2 rounded-full border-2 border-black">
              <FiCamera size={28} />
            </div>
            No Posts Yet
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
