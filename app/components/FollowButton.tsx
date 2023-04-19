"use client";

import React, { FC, useState } from "react";
import axios from "axios";
import { TbLoader2 } from "react-icons/tb";
import { SafeUser } from "../types";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface FollowButtonProps {
  user: SafeUser | null;
  currentUser: SafeUser | null;
}

const FollowButton: FC<FollowButtonProps> = ({ user, currentUser }) => {
  const [followLoading, setFollowLoading] = useState(false);
  const router = useRouter();

  const handleFollow = async () => {
    setFollowLoading(true);

    try {
      await axios.put(`/api/user/follow/${user?.id}`);
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setFollowLoading(false);
    }
  };

  return (
    <button
      disabled={followLoading}
      onClick={handleFollow}
      className="btn disabled:cursor-not-allowed"
    >
      {followLoading ? (
        <span>
          <TbLoader2 className="text-sm animate-spin" />
        </span>
      ) : (
        <span>
          {/* @ts-ignore */}
          {currentUser?.following?.includes(user?.id) && !followLoading
            ? "Unfollow"
            : "Follow"}
        </span>
      )}
    </button>
  );
};

export default FollowButton;
