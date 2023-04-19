"use client";

import { useCallback, useEffect, useState } from "react";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onBack?: () => void;
  title?: string;
  body?: React.ReactElement;
  register?: boolean;
  disabled?: boolean;
  settings?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  body,
  register,
  settings,
  onBack,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999] outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 mx-auto max-h-full md:pt-6">
          {/* CONTENT */}

          <div
            className={`translate duration-300 h-full
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
          `}
          >
            <div
              className={`translate h-auto border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ${
                register ? "md:rounded-t-xl pb-3" : "md:rounded-xl"
              }`}
            >
              {/* HEADER */}

              <div
                className={`flex items-center px-6 h-[4.5rem] relative border-b-[1px] ${
                  settings ? "justify-between" : "justify-center"
                }`}
              >
                {settings && (
                  <button
                    className="p-1 disabled:cursor-not-allowed border-0 hover:opacity-70 transition text-black"
                    onClick={onBack}
                  >
                    <HiOutlineArrowLongLeft size={24} />
                  </button>
                )}

                <div className="text-lg font-semibold">{title}</div>

                <button
                  className={`p-1 disabled:cursor-not-allowed border-0 hover:opacity-70 transition 
                   ${settings ? "relative" : "absolute left-5"}`}
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
              </div>

              {/* BODY */}

              <div className="relative p-6 flex-auto">{body}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
