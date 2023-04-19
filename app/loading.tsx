import React from "react";
import Loader from "./components/loaders/Loader";

const Loading = () => {
  return (
    <div className="fixed z-[55] bg-white top-0 left-0 flex items-center justify-center w-screen h-screen">
      <Loader />
    </div>
  );
};

export default Loading;
