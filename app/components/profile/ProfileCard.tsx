"use client";

import { FC, useState } from "react";
import Avatar from "../Avatar";
import { SafeUser } from "@/app/types";
import FollowButton from "../FollowButton";
import useSettingsModal from "@/app/hooks/useSettingsModal";
import { FiCamera, FiCheck } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { RiImageEditLine } from "react-icons/ri";

interface ProfileCardProps {
  user?: SafeUser | null;
  currentUser?: SafeUser | null;
}

const ProfileCard: FC<ProfileCardProps> = ({ user, currentUser }) => {
  const settingsModal = useSettingsModal();
  const [avatar, setAvatar] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [coverLoading, setCoverLoading] = useState(false);

  const router = useRouter();

  const handleAvatarChange = async (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatar(reader?.result);
    };
  };

  const handleCoverImageChange = async (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setCoverImage(reader?.result);
    };
  };

  const handleAvatarSubmit = async (e: any) => {
    e.stopPropagation();

    setAvatarLoading(true);

    try {
      await axios.put("/api/user/update/avatar", { avatar });
      setAvatar("");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleCoverSubmit = async (e: any) => {
    e.stopPropagation();

    setCoverLoading(true);

    try {
      await axios.put("/api/user/update/cover", { coverImage });
      setCoverImage("");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setCoverLoading(false);
    }
  };

  return (
    <div className="w-full h-full relative">
      <label htmlFor="coverImage" className="cursor-pointer">
        <input
          id="coverImage"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleCoverImageChange}
          readOnly={coverLoading}
        />

        <img
          className="w-full h-52 object-cover"
          src={
            coverImage !== ""
              ? coverImage
              : user?.coverImage || "/assets/cover.jpeg"
          }
          alt={user?.username}
        />

        {coverImage === "" ? (
          <div className="absolute p-2 rounded-md bg-white border border-gray-200 hover:border-gray-300 shadow-sm right-4 top-4">
            <RiImageEditLine size={22} />
          </div>
        ) : (
          <button
            disabled={coverLoading}
            onClick={handleCoverSubmit}
            className="absolute p-2 rounded-md disabled:cursor-progress bg-white border border-gray-200 hover:border-gray-300 shadow-sm right-4 top-4"
          >
            <FiCheck size={22} />
          </button>
        )}
      </label>

      <div className="absolute top-[9rem] flex items-center justify-between w-full md:px-5 px-3">
        <label className="cursor-pointer" htmlFor="avatar">
          <input
            id="avatar"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleAvatarChange}
            readOnly={avatarLoading}
          />

          <div className="relative">
            <Avatar
              src={
                avatar !== ""
                  ? avatar
                  : user?.avatar || "/assets/placeholder.jpeg"
              }
              alt={user?.username}
              large
            />

            {avatar === "" ? (
              <div className="absolute p-2 rounded-full bg-white border border-gray-200 hover:border-gray-300 shadow-sm right-0 bottom-4">
                <FiCamera size={22} />
              </div>
            ) : (
              <button
                disabled={avatarLoading}
                onClick={handleAvatarSubmit}
                className="absolute p-2 rounded-full disabled:cursor-progress bg-white border border-gray-200 hover:border-gray-300 shadow-sm right-0 bottom-4"
              >
                <FiCheck size={22} />
              </button>
            )}
          </div>
        </label>

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
