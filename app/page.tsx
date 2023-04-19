import getCurrentUser from "./actions/getCurrentUser";
import getPosts from "./actions/getPosts";
import getTrendingPosts from "./actions/getTrendingPosts";
import Form from "./components/Form";
import Post from "./components/Post";
import Topbar from "./components/Topbar";
import { MdGridOff } from "react-icons/md";

export const metadata = {
  title: "Zwitter | Home",
};

export default async function Home() {
  const currentUser = await getCurrentUser();
  const posts = await getPosts();
  const trendingPosts = await getTrendingPosts();

  return (
    <div className="min-h-screen">
      <Topbar
        currentUser={currentUser || null}
        title={currentUser ? "Home" : "Trending Now"}
      />

      {currentUser && (
        <div className="border-x border-b">
          <Form currentUser={currentUser} />
        </div>
      )}

      {currentUser && posts?.length === 0 && (
        <div className="w-full md:h-[28.8rem] h-[28rem] flex-col gap-1 text-xl font-bold border-x flex items-center justify-center">
          <MdGridOff size={28} />
          Follow other users to view posts
        </div>
      )}

      {currentUser &&
        posts?.map((post, i) => (
          <Post key={i} post={post} currentUser={currentUser} />
        ))}

      {currentUser === null &&
        trendingPosts?.map((post, i) => (
          <Post key={i} post={post} currentUser={currentUser} />
        ))}
    </div>
  );
}
