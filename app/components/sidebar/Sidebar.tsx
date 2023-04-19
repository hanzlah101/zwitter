"use client";

import { FC, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ClickOutHandler } from "react-clickout-ts";
import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { FaSlackHash } from "react-icons/fa";
import { CgHashtag } from "react-icons/cg";
import User from "../User";
import UserMenu from "./UserMenu";
import {
  HiOutlineChevronDown,
  HiOutlinePower,
  HiOutlineBookmark,
  HiBookmark,
  HiOutlineUser,
  HiUser,
} from "react-icons/hi2";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import useZweetModal from "@/app/hooks/useZweetModal";
import useSettingsModal from "@/app/hooks/useSettingsModal";

interface SidebarProps {
  currentUser: SafeUser | null;
}

const Sidebar: FC<SidebarProps> = ({ currentUser }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();
  const { push } = useRouter();

  const zweetModal = useZweetModal();
  const settingsModal = useSettingsModal();

  let sidebarItems = [];

  if (currentUser) {
    sidebarItems = [
      {
        name: "Home",
        href: "/",
        onClick: () => push("/"),
        icon: (
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M22.58 7.35L12.475 1.897c-.297-.16-.654-.16-.95 0L1.425 7.35c-.486.264-.667.87-.405 1.356.18.335.525.525.88.525.16 0 .324-.038.475-.12l.734-.396 1.59 11.25c.216 1.214 1.31 2.062 2.66 2.062h9.282c1.35 0 2.444-.848 2.662-2.088l1.588-11.225.737.398c.485.263 1.092.082 1.354-.404.263-.486.08-1.093-.404-1.355z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15.435c-1.795 0-3.25-1.455-3.25-3.25s1.455-3.25 3.25-3.25 3.25 1.455 3.25 3.25-1.455 3.25-3.25 3.25z"
            />
          </svg>
        ),

        fillIcon: (
          <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              fill="currentColor"
              d="M22.58 7.35L12.475 1.897c-.297-.16-.654-.16-.95 0L1.425 7.35c-.486.264-.667.87-.405 1.356.18.335.525.525.88.525.16 0 .324-.038.475-.12l.734-.396 1.59 11.25c.216 1.214 1.31 2.062 2.66 2.062h9.282c1.35 0 2.444-.848 2.662-2.088l1.588-11.225.737.398c.485.263 1.092.082 1.354-.404.263-.486.08-1.093-.404-1.355zM12 15.435c-1.795 0-3.25-1.455-3.25-3.25s1.455-3.25 3.25-3.25 3.25 1.455 3.25 3.25-1.455 3.25-3.25 3.25z"
            />
          </svg>
        ),
      },

      {
        name: "Explore",
        href: "/trending",
        onClick: () => push("/trending"),
        icon: <CgHashtag />,
        fillIcon: <FaSlackHash className="rotate-[19deg]" />,
      },

      {
        name: "Bookmarks",
        href: "/bookmarks",
        onClick: () => push("/bookmarks"),
        icon: <HiOutlineBookmark />,
        fillIcon: <HiBookmark />,
      },

      {
        name: "Settings",
        href: "/settings",
        onClick: () => settingsModal.onOpen(),
        icon: <IoSettingsOutline />,
        fillIcon: <IoSettingsSharp />,
      },

      {
        name: "Profile",
        href: `/user/${currentUser?.id}`,
        onClick: () => push(`/user/${currentUser?.id}`),
        icon: <HiOutlineUser />,
        fillIcon: <HiUser />,
      },
    ];
  } else {
    sidebarItems = [
      {
        name: "Explore",
        href: "/",
        onClick: () => push("/"),
        icon: <CgHashtag />,
        fillIcon: <FaSlackHash className="rotate-[19deg]" />,
      },
    ];
  }

  return (
    <div className="w-[68px] xs:w-[88px] xl:w-[275px] min-w-[68px] h-screen z-50">
      <div
        className={`flex flex-col h-screen xl:pr-3 fixed w-[68px] xs:w-[88px] py-8 xl:w-[275px] 
      ${currentUser ? "justify-between" : "gap-y-12"}`}
      >
        <Link
          href="/"
          className="flex justify-center text-3xl xl:justify-start text-primaryBlue"
        >
          <FaTwitter />
        </Link>

        <nav>
          {sidebarItems.map((item, i) => (
            <div
              key={i}
              onClick={item.onClick}
              className={`flex items-center cursor-pointer hover:text-primaryBlue justify-center xl:justify-start mb-8 transition duration-300 ease-in-out 
            ${pathname === item.href ? "text-primaryBlue" : "text-gray-800"}`}
            >
              <span className="text-[26px]">
                {pathname === item.href ? item.fillIcon : item.icon}
              </span>

              <span
                className={`hidden xl:block ml-4 text-md ${
                  pathname === item.href ? "font-extrabold" : "font-bold"
                }`}
              >
                {item.name}
              </span>
            </div>
          ))}

          {currentUser && (
            <button
              onClick={() => signOut()}
              className="flex items-center xl:justify-start justify-center w-full hover:text-blue-400 mb-8"
            >
              <HiOutlinePower className="text-[26px]" />
              <span className="hidden xl:block ml-4 font-bold text-md">
                Logout
              </span>
            </button>
          )}

          {currentUser && (
            <button
              onClick={zweetModal.onOpen}
              className="mx-auto w-11 cursor-pointer h-11 xl:w-full flex items-center justify-center bg-blue-400 hover:bg-blue-500 py-3 rounded-full text-white font-bold font-sm transition duration-350 ease-in-out mb-10"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="block xl:hidden h-6 w-6"
              >
                <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z"></path>
              </svg>
              <span className="hidden xl:block font-bold text-md">Zweet</span>
            </button>
          )}
        </nav>

        <div>
          <ClickOutHandler onClickOut={() => setOpenMenu(false)}>
            <div className="relative transition-all">
              {openMenu && (
                <div className="z-[998]">
                  <UserMenu currentUser={currentUser} />
                </div>
              )}
            </div>
          </ClickOutHandler>

          {currentUser && (
            <div>
              {openMenu && (
                <div
                  onClick={() => setOpenMenu(true)}
                  className="w-14 xl:w-full flex items-center justify-center xl:justify-between mx-auto flex-row rounded-full bg-blue-50 p-2 cursor-pointer transition duration-350 ease-in-out"
                >
                  <User sidebar user={currentUser} />
                  <HiOutlineChevronDown
                    className={`transition xl:block hidden ${
                      openMenu ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
              )}

              {!openMenu && (
                <div
                  onClick={() => setOpenMenu(true)}
                  className="w-14 xl:w-full flex items-center justify-center xl:justify-between mx-auto flex-row rounded-full hover:bg-blue-50 p-2 cursor-pointer transition duration-350 ease-in-out"
                >
                  <User sidebar user={currentUser} />
                  <HiOutlineChevronDown className="xl:block hidden" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
