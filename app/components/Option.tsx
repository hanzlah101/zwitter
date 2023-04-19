import React, { FC } from "react";
import { IconType } from "react-icons";
import Heading from "./Heading";

interface OptionProps {
  icon: IconType;
  title: string;
  subtitle: string;
  onClick?: () => void;
}

const Option: FC<OptionProps> = ({ icon: Icon, subtitle, title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 transition hover:bg-gray-200 rounded-md cursor-pointer px-5 py-4"
    >
      <Icon className="text-gray-700" size={32} />
      <Heading title={title} subtitle={subtitle} small />
    </div>
  );
};

export default Option;
