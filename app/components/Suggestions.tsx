"use client";

import React, { FC } from "react";
import SearchInput from "./SearchInput";
import User from "./User";
import Footer from "./Footer";
import FollowButton from "./FollowButton";
import { SafeUser } from "../types";
import { usePathname } from "next/navigation";

interface SuggestionsProps {
  users?: SafeUser[] | null;
  currentUser: SafeUser | null;
}

const Suggestions: FC<SuggestionsProps> = ({ users, currentUser }) => {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null;
  }

  return (
    <div className="hidden lg:block w-[350px] h-screen">
      <div className="flex flex-col fixed overflow-y-auto lg:w-[350px] h-screen">
        <SearchInput />

        <div className="m-2 bg-gray-100 rounded-lg overflow-hidden">
          <h1 className="text-gray-900 text-md font-bold p-3 border-gray-200">
            Who to follow
          </h1>

          {users?.map((user, i) => (
            <div
              key={i}
              className="text-blue-400 text-sm font-normal p-3 border-t border-gray-200 hover:bg-gray-200 cursor-pointer transition duration-350 ease-in-out"
            >
              <div className="flex flex-row justify-between p-2">
                <User user={user} />

                <div>
                  <div className="flex items-center h-full text-gray-800">
                    <FollowButton
                      user={user || null}
                      currentUser={currentUser || null}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Suggestions;
