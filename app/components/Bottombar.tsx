"use client";

import React from "react";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";

const Bottombar = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  return (
    <div className="fixed bottom-0 left-0 h-20 flex justify-between text-white bg-primaryBlue w-screen">
      <div className="md:flex mx-auto flex-col hidden justify-center">
        <h1 className="text-2xl font-semibold">Don’t miss what’s happening</h1>
        <p className="text-base">People on Twitter are the first to know.</p>
      </div>

      <div className="flex items-center justify-between gap-3 md:w-auto w-full mx-6">
        <div
          onClick={loginModal.onOpen}
          className="text- font-bold cursor-pointer flex items-center justify-center bg-primaryBlue py-1 hover:opacity-70 px-4 rounded-full border-2 border-white grow"
        >
          Login
        </div>

        <div
          onClick={registerModal.onOpen}
          className="text- font-bold cursor-pointer bg-white flex items-center justify-center text-black px-4 py-1 hover:opacity-70 rounded-full border-2 border-white grow"
        >
          Signup
        </div>
      </div>
    </div>
  );
};

export default Bottombar;
