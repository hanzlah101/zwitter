"use client";

import axios from "axios";
import React, { FC, useState } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { SafePost } from "../types";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface CommentFormProps {
  post: SafePost;
}

const CommentForm: FC<CommentFormProps> = ({ post }) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const hanldeSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`/api/post/comment/${post?.id}`, { comment });
      setComment("");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={hanldeSubmit} className="mt-7 relative">
      <input
        type="text"
        placeholder="Post your reply"
        className="w-full px-2 py-3 bg-gray-100 border-b-2 border-gray-400 transition-all ease-linear duration-300 focus:border-b-2 focus:border-black"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        disabled={isLoading || comment === ""}
        className="absolute right-2 bg-gray-100 pl-1 text-black top-3 disabled:opacity-70 disabled:cursor-not-allowed"
        type="submit"
      >
        <HiOutlinePaperAirplane size={22} />
      </button>
    </form>
  );
};

export default CommentForm;
