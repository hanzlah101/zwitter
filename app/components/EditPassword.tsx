"use client";

import { useFormik } from "formik";
import React, { FC, useState } from "react";
import { IoAlertCircle } from "react-icons/io5";
import * as yup from "yup";
import { SafeUser } from "../types";
import axios from "axios";
import { useRouter } from "next/navigation";
import useSettingsModal from "../hooks/useSettingsModal";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { toast } from "react-hot-toast";

interface EditPasswordProps {
  currentUser: SafeUser | null;
  setStep?: any;
}

const EditPassword: FC<EditPasswordProps> = ({ currentUser, setStep }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const router = useRouter();
  const settingsModal = useSettingsModal();

  const validationSchema = yup.object().shape({
    oldPassword: yup.string().required("Old Password is required"),
    newPassword: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("New Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), undefined], "Passwords must match")
      .required("Please confirm your password"),
  });

  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema,
      onSubmit: async (values) => {
        setIsLoading(true);

        try {
          await axios.put("/api/user/update/password", values);
          setStep();
          router.push(`/user/${currentUser?.id}`);
          settingsModal.onClose();
          toast.success("Password Updated!");
          router.refresh();
        } catch (error: any) {
          console.log(error);
          toast.error(error.response.data.message);
        } finally {
          setIsLoading(false);
        }
      },
    });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-8">
      <div className="relative">
        <input
          value={values.oldPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          id="oldPassword"
          name="oldPassword"
          type={show ? "text" : "password"}
          placeholder=" "
          className={`inputStyles peer ${
            errors.oldPassword && touched.oldPassword
              ? "border-red-600 focus:border-red-600"
              : "border-gray-600 focus:border-primaryBlue"
          }`}
        />

        <label htmlFor="oldPassword" className="inputLabel">
          Old Password
        </label>

        <div
          onClick={() => setShow(!show)}
          className="absolute top-3 right-3 p-1.5 cursor-pointer text-[1.2rem] transition-all rounded-full hover:bg-gray-400/50"
        >
          {show ? <VscEyeClosed /> : <VscEye />}
        </div>

        {errors.oldPassword && touched.oldPassword && (
          <p className="error">
            <IoAlertCircle className="text-[1rem]" /> {errors.oldPassword}
          </p>
        )}
      </div>

      <div className="relative">
        <input
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          id="newPassword"
          name="newPassword"
          type={show ? "text" : "password"}
          placeholder=" "
          className={`inputStyles peer ${
            errors.newPassword && touched.newPassword
              ? "border-red-600 focus:border-red-600"
              : "border-gray-600 focus:border-primaryBlue"
          }`}
        />

        <label htmlFor="newPassword" className="inputLabel">
          New Password
        </label>

        <div
          onClick={() => setShow(!show)}
          className="absolute top-3 right-3 p-1.5 cursor-pointer text-[1.2rem] transition-all rounded-full hover:bg-gray-400/50"
        >
          {show ? <VscEyeClosed /> : <VscEye />}
        </div>

        {errors.newPassword && touched.newPassword && (
          <p className="error">
            <IoAlertCircle className="text-[1rem]" /> {errors.newPassword}
          </p>
        )}
      </div>

      <div className="relative">
        <input
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          id="confirmPassword"
          name="confirmPassword"
          type={show ? "text" : "password"}
          placeholder=" "
          className={`inputStyles peer ${
            errors.confirmPassword && touched.confirmPassword
              ? "border-red-600 focus:border-red-600"
              : "border-gray-600 focus:border-primaryBlue"
          }`}
        />

        <label htmlFor="confirmPassword" className="inputLabel">
          Confirm Password
        </label>

        <div
          onClick={() => setShow(!show)}
          className="absolute top-3 right-3 p-1.5 cursor-pointer text-[1.2rem] transition-all rounded-full hover:bg-gray-400/50"
        >
          {show ? <VscEyeClosed /> : <VscEye />}
        </div>

        {errors.confirmPassword && touched.confirmPassword && (
          <p className="error">
            <IoAlertCircle className="text-[1rem]" /> {errors.confirmPassword}
          </p>
        )}
      </div>

      <button disabled={isLoading} type="submit" className="btnSecondary">
        Change
      </button>
    </form>
  );
};

export default EditPassword;
