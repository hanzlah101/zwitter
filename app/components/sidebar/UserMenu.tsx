"use client";

import React, { FC } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useSettingsModal from "@/app/hooks/useSettingsModal";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const pathname = usePathname();
  const { push } = useRouter();

  const settingsModal = useSettingsModal();

  const useMenuItems = [
    {
      name: "My Profile",
      href: `/user/${currentUser?.id}`,
      onClick: () => push(`/user/${currentUser?.id}`),
    },

    {
      name: "My Bookmarks",
      href: "/bookmarks",
      onClick: () => push("/bookmarks"),
    },

    {
      name: "Settings",
      href: "/settings",
      onClick: () => settingsModal.onOpen(),
    },
  ];

  return (
    <div className="absolute bottom-2 z-[999] ml-4 flex overflow-hidden flex-col w-44 h-fit shadow-md shadow-gray-300 border border-gray-100 rounded-xl bg-white">
      {useMenuItems.map((item, i) => (
        <div
          key={i}
          onClick={item.onClick}
          className={`py-2 px-4 cursor-pointer hover:bg-gray-100 ease-in-out 
            ${pathname === item.href ? "text-primaryBlue" : "text-gray-800"}`}
        >
          <span className="font-semibold text-base">{item.name}</span>
        </div>
      ))}

      <hr />

      <button
        onClick={() => signOut()}
        className="w-full text-start hover:text-red-600 transition py-2 px-4 hover:bg-gray-100 ease-in-out"
      >
        <span className="font-semibold text-base">Logout</span>
      </button>
    </div>
  );
};

export default UserMenu;
