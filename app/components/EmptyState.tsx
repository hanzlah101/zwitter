"use client";

import React, { FC } from "react";
import useLoginModal from "../hooks/useLoginModal";

interface EmptyStateProps {
  title: string;
  subtitle?: string;
}

const EmptyState: FC<EmptyStateProps> = ({ title, subtitle }) => {
  return (
    <div className="w-full h-[calc(100vh-5rem)] flex flex-col items-center justify-center fixed top-0 left-0">
      <h1 className="font-bold md:text-4xl text-3xl">{title}</h1>
      <h1 className="md:text-xl text-lg text-gray-700">{subtitle}</h1>
    </div>
  );
};

export default EmptyState;
