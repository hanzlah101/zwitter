"use client";

import React from "react";

const UserLoader = () => {
  return (
    <div className="w-full border-gray-200 max-w-sm">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-400 h-12 w-12"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-400 rounded"></div>
          <div className="h-4 bg-gray-400 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
};

export default UserLoader;
