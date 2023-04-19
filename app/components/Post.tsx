"use client";

import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import { BsDot } from "react-icons/bs";
import {
  HiOutlineHeart,
  HiHeart,
  HiOutlineBookmark,
  HiBookmark,
  HiOutlineTrash,
} from "react-icons/hi2";
import { SafePost, SafeUser } from "../types";
import TimeAgo from "react-timeago";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import useLoginModal from "../hooks/useLoginModal";
import { toast } from "react-hot-toast";

interface PostProps {
  post: SafePost;
  currentUser?: SafeUser | null;
  single?: boolean;
}

const Post: FC<PostProps> = ({ post, currentUser, single }) => {
  const [likeLoading, setLikeLoading] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const router = useRouter();
  const videoRef = useRef<any>(null);

  const loginModal = useLoginModal();

  const handleLike = async (e: any) => {
    e.stopPropagation();

  if (currentUser === null) {
      return loginModal.onOpen();
    }

    setLikeLoading(true);

    try {
      await axios.put(`/api/post/like/${post?.id}`);
      setLikeLoading(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLikeLoading(false);
    }
  };

  const handleBookmark = async (e: any) => {
    e.stopPropagation();

   if (currentUser === null) {
      return loginModal.onOpen();
    }

    setBookmarkLoading(true);

    try {
      await axios.put(`/api/user/bookmark/${post?.id}`);
      setBookmarkLoading(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data.message);
      setBookmarkLoading(false);
    }
  };

  const handleDelete = async (e: any) => {
    e.stopPropagation();
    setDeleteLoading(true);

    try {
      await axios.delete(`/api/post/delete/${post?.id}`);
      setDeleteLoading(false);
      toast.success("Post deleted successfully!");
      router.refresh();
    } catch (error) {
      console.log(error);
      setDeleteLoading(false);
    }
  };

  const isImage = (url: any) => {
    const extensions = ["jpg", "jpeg", "png", "gif"];
    const fileExtension = url.split(".").pop();
    return extensions.includes(fileExtension.toLowerCase());
  };

  useEffect(() => {
    const options = {
      root: null,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div
      onClick={() => !single && router.push(`/post/${post?.id}`)}
      className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer transition duration-350 ease-in-out pb-4 border-x"
    >
      <div className="flex flex-shrink-0 p-4 pb-0">
        <div
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/user/${post?.owner?.id}`);
          }}
          className="flex-shrink-0 group block"
        >
          <div className="flex items-top">
            <div>
              <Image
                unoptimized
                width={"9"}
                height={"9"}
                className="inline-block h-9 w-9 rounded-full object-cover"
                src={post?.owner?.avatar || "/assets/placeholder.jpeg"}
                alt={post?.owner?.username}
              />
            </div>

            <div className="ml-3">
              <div className="flex items-center text-base leading-6 font-medium text-gray-800">
                {post?.owner?.fullName}
                <svg
                  viewBox="0 0 24 24"
                  aria-label="Verified account"
                  fill="currentColor"
                  className="w-4 h-4 ml-1 text-blue-500"
                >
                  <g>
                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                  </g>
                </svg>
                <span className="ml-1 text-sm leading-5 flex items-center font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                  @{post?.owner?.username}
                  <BsDot />
                  <p className="text-xs">
                    <TimeAgo
                      date={post?.createdAt}
                      formatter={(value: any, unit: any, suffix: any) =>
                        value + unit[0]
                      }
                    />
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pl-16">
        <p className="text-base width-auto font-medium text-gray-800 flex-shrink pr-1">
          {post?.caption}
        </p>

        {single ? (
          <div className="flex flex-col gap-3 my-4 px-2">
            {post?.images?.map((img: any, i: number) => (
              <div key={i}>
                {isImage(img?.url) ? (
                  <Image
                    width={"100"}
                    height={"100"}
                    className="rounded-2xl w-full h-full min-h-[250px] max-h-[540px] object-cover border border-gray-200"
                    unoptimized
                    src={img?.url}
                    alt={post?.caption}
                  />
                ) : (
                  <video
                    className="rounded-2xl w-full h-full min-h-[250px] max-h-[540px] object-cover border border-gray-200"
                    src={img?.url}
                    controls
                    loop
                    ref={videoRef}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex my-3 mr-2 rounded-2xl overflow-hidden h-full">
            {/* @ts-ignore */}
            {post?.images?.length === 1 && isImage(post?.images[0]?.url) && (
              <Image
                width={"100"}
                height={"100"}
                className="rounded-2xl w-full h-full min-h-[250px] max-h-[540px] object-cover border border-gray-200"
                unoptimized
                // @ts-ignore
                src={post?.images[0]?.url}
                alt={post?.caption}
              />
            )}

            {/* @ts-ignore */}
            {post?.images?.length === 1 && !isImage(post?.images[0]?.url) && (
              <video
                className="rounded-2xl w-full h-full min-h-[250px] max-h-[540px] object-cover border border-gray-200"
                // @ts-ignore
                src={post?.images[0]?.url}
                controls
                loop
                ref={videoRef}
              />
            )}

            {post?.images?.length > 1 && (
              <div className="grid grid-cols-2 gap-3">
                {post?.images?.map((img: any, index: any) => (
                  <div className="max-h-[260px]" key={index}>
                    {isImage(img?.url) ? (
                      <Image
                        width={"20"}
                        height={"20"}
                        className="rounded-xl object-cover w-full h-full border border-gray-200"
                        unoptimized
                        src={img?.url}
                        alt={post?.caption}
                      />
                    ) : (
                      <div className="relative flex items-center justify-center">
                        <video
                          className="rounded-xl object-cover w-full h-full border border-gray-200"
                          src={img?.url}
                          loop
                          controls
                          ref={videoRef}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex">
          <div className="w-full">
            <div className="flex items-center">
              <div className="flex-1 flex items-center text-xs text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <g>
                    <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                  </g>
                </svg>
                {post?.comments?.length}
              </div>

              <button
                onClick={handleLike}
                disabled={likeLoading}
                className="flex-1 flex gap-1.5 items-center text-xs text-gray-400 hover:text-rose-500 transition duration-350 ease-in-out"
              >
                {/* @ts-ignore */}
                {post?.likes?.includes(currentUser?.id) ? (
                  <HiHeart className="text-xl text-rose-500" />
                ) : (
                  <HiOutlineHeart className="text-xl" />
                )}
                {post?.likes?.length}
              </button>

              <button
                disabled={bookmarkLoading}
                onClick={handleBookmark}
                className="flex-1 text-xl text-gray-400 hover:text-gray-700 transition duration-350 ease-in-out"
              >
                {currentUser?.bookmarks?.includes(post?.id) ? (
                  <HiBookmark className="text-gray-700" />
                ) : (
                  <HiOutlineBookmark />
                )}
              </button>

              {currentUser && currentUser?.id === post?.ownerId && (
                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="flex-1 text-xl text-gray-400 hover:text-red-500 transition duration-350 ease-in-out"
                >
                  <HiOutlineTrash />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
