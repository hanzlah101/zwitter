import React from "react";
import Topbar from "../components/Topbar";
import Post from "../components/Post";
import getTrendingPosts from "../actions/getTrendingPosts";
import getCurrentUser from "../actions/getCurrentUser";

export const metadata = {
  title: "Zwitter | Trending Now",
};

const Trending = async () => {
  const trendingPosts = await getTrendingPosts();
  const currentUser = await getCurrentUser();

  return (
    <div>
      <Topbar title="Trending Now" />

      <div>
        {trendingPosts?.map((post, i) => (
          <Post post={post} key={i} currentUser={currentUser || null} />
        ))}
      </div>
    </div>
  );
};

export default Trending;
