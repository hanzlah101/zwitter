import React from "react";
import Post from "../components/Post";
import Topbar from "../components/Topbar";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getBookmarks from "../actions/getBookmarks";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const currentUser = await getCurrentUser();
  return {
    title: `Zwitter | ${currentUser?.fullName}'s Bookmarks`,
  };
}

const Bookmarks = async () => {
  const currentUser = await getCurrentUser();
  const bookmarks = await getBookmarks();

  if (currentUser === null) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Login to view your bookmarks"
      />
    );
  }

  return (
    <div>
      <Topbar title="My Bookmarks" />

      <div>
        {currentUser &&
          // @ts-ignore
          bookmarks?.length > 0 &&
          bookmarks?.map((post: any, i: number) => (
            <Post key={i} post={post} currentUser={currentUser} />
          ))}

        {currentUser &&
          // @ts-ignore
          bookmarks?.length === 0 && (
            <div className="w-full h-[calc(100vh-3.5rem)] flex items-center justify-center font-bold border-x border-b">
              You don't have any bookmarks yet
            </div>
          )}
      </div>
    </div>
  );
};

export default Bookmarks;
