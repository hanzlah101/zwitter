"use client";


import { FC } from "react";

interface AvatarProps {
  src: any;
  alt?: any;
  large?: boolean;
}

const Avatar: FC<AvatarProps> = ({ src, alt = "_profile_image_", large }) => {
  return (
    <img
      className={`rounded-full object-cover ${
        large
          ? "md:w-36 md:h-36 w-32 h-32 md:border-[5px] border-4 border-white"
          : "w-10 h-10 border-none"
      }`}
      src={src}
      alt={alt}
    />
  );
};

export default Avatar;
