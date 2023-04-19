"use client";

import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import Modal from "./Modal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { IoAlertCircle } from "react-icons/io5";
import { signIn } from "next-auth/react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Heading from "../Heading";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const login = ({
  values,
  setIsLoading,
  router,
  loginModal,
  resetForm,
  setFieldValue,
  modalType,
}: any) => {
  setIsLoading(true);
  signIn("credentials", { ...values, redirect: false }).then((callback) => {
    setIsLoading(false);
    if (callback?.ok) {
      router.refresh();
      loginModal.onClose();
      modalType === "login"
        ? toast.success("Login Success")
        : toast.success("Register Success");
      resetForm();
    }

    if (callback?.error) {
      setIsLoading(false);
      toast.error(callback?.error);
      setFieldValue("password", "");
    }
  });
};

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleMenu = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      login({
        values,
        setIsLoading,
        router,
        loginModal,
        resetForm,
        setFieldValue,
        modalType: "login",
      });
    },
  });

  let bodyContent = (
    <div className="overflow-x-hidden overflow-y-auto md:h-full h-[calc(100vh-7.5rem)]">
      <Heading
        title="Welcome Back!"
        subtitle="Login to know every happening in the world."
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-8">
        <div className="relative">
          <input
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            id="email"
            type="text"
            name="email"
            placeholder=" "
            className={`inputStyles peer ${
              errors.email && touched.email
                ? "border-red-600 focus:border-red-600"
                : "border-gray-600 focus:border-primaryBlue"
            }`}
          />

          <label htmlFor="email" className="inputLabel">
            Username or Email Address
          </label>

          {errors.email && touched.email && (
            <p className="error">
              <IoAlertCircle className="text-[1rem]" /> {errors.email}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            id="password"
            name="password"
            type={show ? "text" : "password"}
            placeholder=" "
            className={`inputStyles peer ${
              errors.password && touched.password
                ? "border-red-600 focus:border-red-600"
                : "border-gray-600 focus:border-primaryBlue"
            }`}
          />

          <label htmlFor="password" className="inputLabel">
            Password
          </label>

          <div
            onClick={() => setShow(!show)}
            className="absolute top-3 right-3 p-1.5 cursor-pointer text-[1.2rem] transition-all rounded-full hover:bg-gray-400/50"
          >
            {show ? <VscEyeClosed /> : <VscEye />}
          </div>

          {errors.password && touched.password && (
            <p className="error">
              <IoAlertCircle className="text-[1rem]" /> {errors.password}
            </p>
          )}
        </div>

        <button disabled={isLoading} type="submit" className="btnSecondary">
          Login
        </button>

        <div className="text-sm flex items-center gap-1 mt-3 w-full justify-center">
          Don&apos;t have an account?
          <span
            onClick={toggleMenu}
            className="hover:underline cursor-pointer text-primaryBlue"
          >
            Sign up
          </span>
        </div>
      </form>
    </div>
  );

  return (
    <Modal
      onClose={loginModal.onClose}
      isOpen={loginModal.isOpen}
      title="Login"
      body={bodyContent}
    />
  );
};

export default LoginModal;
