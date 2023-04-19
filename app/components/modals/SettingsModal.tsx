"use client";

import useSettingsModal from "@/app/hooks/useSettingsModal";
import React, { FC, useState } from "react";
import Modal from "./Modal";
import { SafeUser } from "@/app/types";
import { FaUserEdit } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import Option from "../Option";
import EditProfile from "../EditProfile";
import EditPassword from "../EditPassword";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";

interface SettingsModalProps {
  currentUser: SafeUser | null;
}

enum STEPS {
  MAIN = 0,
  PROFILE = 1,
  PASSWORD = 2,
}

const SettingsModal: FC<SettingsModalProps> = ({ currentUser }) => {
  const [step, setStep] = useState(STEPS.MAIN);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const settingsModal = useSettingsModal();

  const onBack = () => {
    setStep(STEPS.MAIN);
  };

  const onProfile = () => {
    setStep(STEPS.PROFILE);
  };

  const onPassword = () => {
    setStep(STEPS.PASSWORD);
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`/api/user/delete/${currentUser?.id}`);
      signOut();
      toast.success("Account deleted successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  let bodyContent = (
    <div className="flex flex-col">
      <Option
        icon={FaUserEdit}
        title="Edit Profile"
        subtitle="Change your name, username, email and much more."
        onClick={onProfile}
      />

      <Option
        icon={MdPassword}
        title="Change Password"
        subtitle="Change your password if your account is at risk."
        onClick={onPassword}
      />

      <button
        onClick={handleDelete}
        disabled={deleteLoading}
        className="text-lg text-start text-red-600 font-bold p-5"
      >
        Delete Account
      </button>
    </div>
  );

  step === STEPS.PROFILE &&
    (bodyContent = (
      <div>
        <EditProfile
          currentUser={currentUser}
          setStep={() => setStep(STEPS.MAIN)}
        />
      </div>
    ));

  step === STEPS.PASSWORD &&
    (bodyContent = (
      <div>
        <EditPassword
          currentUser={currentUser}
          setStep={() => setStep(STEPS.MAIN)}
        />
      </div>
    ));

  return (
    <Modal
      onClose={settingsModal.onClose}
      isOpen={settingsModal.isOpen}
      title={`${currentUser?.fullName?.split(" ")[0]}'s Account Settings`}
      body={bodyContent}
      settings={step !== STEPS.MAIN}
      onBack={onBack}
    />
  );
};

export default SettingsModal;
