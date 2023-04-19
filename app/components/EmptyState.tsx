"use client";

import React, { FC } from "react";
import useLoginModal from "../hooks/useLoginModal";
import Heading from "./Heading";

interface EmptyStateProps {
  title: string;
  subtitle?: string;
}

const EmptyState: FC<EmptyStateProps> = ({ title, subtitle }) => {
  return (
    <div className="w-full h-[calc(100vh-5rem)] flex flex-col items-center justify-center fixed top-0 left-0">
      <Heading title={title} subtitle={subtitle} />
    </div>
  );
};

export default EmptyState;
