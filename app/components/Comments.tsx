"use client";

import { FC, useState } from "react";
import { BsDot } from "react-icons/bs";
import { RiDeleteBin2Line } from "react-icons/ri";
import Image from "next/image";
import ReactTimeago from "react-timeago";
import { useRouter } from "next/navigation";
import { SafePost, SafeUser } from "../types";
import axios from "axios";
import { toast } from "react-hot-toast";

interface CommentsProps {
  comment: any;
  currentUser: SafeUser | null;
  post: SafePost;
}

const Comments: FC<CommentsProps> = ({ comment, currentUser, post }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      await axios.put(`/api/post/comment/${post?.id}`, {
        commentId: comment._id,
      });
      toast.success("Comment Deleted!");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="w-fit py-2 my-4 px-3 bg-gray-100 rounded-md">
        <div className="flex items-start justify-between gap-3">
          <div
            onClick={() => router.push(`/user/${comment?.user?.id}`)}
            className="flex-shrink-0 group block cursor-pointer"
          >
            <div className="flex items-top">
              <div>
                <Image
                  unoptimized
                  width={"9"}
                  height={"9"}
                  className="inline-block h-9 w-9 rounded-full object-cover"
                  src={comment?.user?.avatar || "/assets/placeholder.jpeg"}
                  alt={comment?.user?.username}
                />
              </div>

              <div className="ml-3">
                <div className="flex items-center text-base leading-6 font-medium text-gray-800">
                  {comment?.user?.fullName}
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
                    @{comment?.user?.username}
                    <BsDot />
                    <p className="text-xs">
                      <ReactTimeago
                        date={comment?.createdAt}
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

          {comment?.user?.id === currentUser?.id && (
            <button disabled={isLoading} onClick={handleDelete}>
              <RiDeleteBin2Line
                size={20}
                className="text-gray-600 transition hover:text-red-600"
              />
            </button>
          )}
        </div>

        <p className="text-sm text-gray-600 mt-1 pl-9">{comment?.comment}</p>
      </div>
    </div>
  );
};

export default Comments;
