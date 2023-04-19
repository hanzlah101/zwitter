"use client";

import React, { FC, useState } from "react";
import useZweetModal from "@/app/hooks/useZweetModal";
import Modal from "./Modal";
import Form from "../Form";
import { SafeUser } from "@/app/types";

interface ZweetModalProps {
  currentUser: SafeUser | null;
}

const ZweetModal: FC<ZweetModalProps> = ({ currentUser }) => {
  const zweetModal = useZweetModal();

  return (
    <Modal
      onClose={zweetModal.onClose}
      isOpen={zweetModal.isOpen}
      title="Post a Zweet"
      body={<Form currentUser={currentUser} />}
    />
  );
};

export default ZweetModal;
