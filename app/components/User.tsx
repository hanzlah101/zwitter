"use client";

import { FC } from "react";
import Avatar from "./Avatar";
import { useRouter } from "next/navigation";
import { SafeUser } from "../types";

interface UserProps {
  sidebar?: boolean;
  user: SafeUser | null;
}

const User: FC<UserProps> = ({ sidebar, user }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => !sidebar && router.push(`/user/${user?.id}`)}
      className="flex flex-row cursor-pointer"
    >
      <Avatar src={user?.avatar} alt={user?.username} />

      <div className={`${sidebar && "hidden xl:flex"} flex flex-col ml-2`}>
        <h1 className="text-gray-800 font-bold text-sm">{user?.fullName}</h1>
        <p className="text-gray-400 text-sm">@{user?.username}</p>
      </div>
    </div>
  );
};

export default User;
