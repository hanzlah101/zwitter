import React, { FC } from "react";

interface HeadingProps {
  title: string;
  subtitle?: string;
  small?: boolean;
}

const Heading: FC<HeadingProps> = ({ title, subtitle, small }) => {
  return (
    <div>
      <div className={`font-bold ${small ? "text-xl" : "text-2xl"}`}>
        {title}
      </div>
      <div className="font-light text-neutral-500 text-sm">{subtitle}</div>
    </div>
  );
};

export default Heading;
