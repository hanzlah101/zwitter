"use client";

import React, { FC, useEffect, useState } from "react";
import { BsCalendarMonth } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import moment from "moment";
import { SafeUser } from "@/app/types";
import axios from "axios";

interface ProfileCardProps {
  user?: SafeUser | null;
}

const ProfileInfo: FC<ProfileCardProps> = ({ user }) => {
  const [location, setLocation] = useState<any>();

   useEffect(() => {
     axios.get("https://api.ipregistry.co/?key=7efelgucp4wyiol7").then((res) =>
      setLocation({
         country: res.data.location.country.name,
        city: res.data.location.city,
      })
     );
   }, []);

  return (
    <div className="md:mt-[88px] mt-[70px] md:px-8 px-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <h1 className="text-xl font-extrabold">{user?.fullName}</h1>
          <svg
            viewBox="0 0 24 24"
            aria-label="Verified account"
            fill="currentColor"
            className="w-4 h-4 ml-1 mt-0.5 text-blue-500"
          >
            <g>
              <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
            </g>
          </svg>
        </div>

        <span className="text-sm text-gray-400">@{user?.username}</span>
      </div>

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-3 text-gray-400 mt-4">
        <span className="text-sm flex items-center gap-1">
          <HiOutlineLocationMarker className="text-xl" />
          {location?.city}, {location?.country}
        </span>

        <div className="text-sm flex items-center gap-1.5">
          <IoCalendarNumberOutline className="text-lg" />
          <p className="font-bold text-gray-600">Joined</p>
          {moment(user?.createdAt).format("MMM DD, YYYY")}
        </div>

        <div className="text-sm flex items-center gap-1.5 text-gray-400">
          <BsCalendarMonth className="text-lg" />
          <p className="font-bold text-gray-600">Born</p>
          {moment(user?.dob).format("MMM DD, YYYY")}
        </div>
      </div>

      <div className="flex items-center gap-5 mt-6">
        <div className="flex items-center font-bold gap-2 cursor-pointer">
          {user?.following?.length}
          <p className="font-normal text-sm text-gray-500">Followings</p>
        </div>

        <div className="flex items-center font-bold gap-2 cursor-pointer">
          {user?.followers?.length}
          <p className="font-normal text-sm text-gray-500">Followers</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
