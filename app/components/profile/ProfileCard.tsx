"use client";

import { FC } from "react";
import Avatar from "../Avatar";
import { SafeUser } from "@/app/types";
import FollowButton from "../FollowButton";
import useSettingsModal from "@/app/hooks/useSettingsModal";

interface ProfileCardProps {
  user?: SafeUser | null;
  currentUser?: SafeUser | null;
}

const ProfileCard: FC<ProfileCardProps> = ({ user, currentUser }) => {
  const settingsModal = useSettingsModal();

  return (
    <div className="w-full h-full relative">
      <img
        className="w-full h-52 object-cover"
        src={user?.coverImage || "/assets/cover.jpeg"}
        alt={user?.username}
      />

      <div className="absolute top-[9rem] flex items-center justify-between w-full md:px-5 px-3">
        <Avatar
          src={user?.avatar || "/assets/placeholder.jpeg"}
          alt={user?.username}
          large
        />

        {user?.id === currentUser?.id ? (
          <button onClick={settingsModal.onOpen} className="btn px-4 mt-12">
            Edit Profile
          </button>
        ) : (
          <div className="mt-12">
            <FollowButton
              user={user || null}
              currentUser={currentUser || null}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
