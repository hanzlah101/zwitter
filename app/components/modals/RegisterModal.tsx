"use client";

import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Modal from "./Modal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { IoAlertCircle } from "react-icons/io5";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Heading from "../Heading";
import moment from "moment";
import axios from "axios";
import { useRouter } from "next/navigation";
import { login } from "./LoginModal";
import { toast } from "react-hot-toast";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const toggleMenu = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };

  const validationSchema = yup.object().shape({
    fullName: yup.string().required("Name is required"),
    username: yup.string().required("Username is required"),
    email: yup
      .string()
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email"
      )
      .required("Email is required"),
    dob: yup
      .string()
      .required("Date of birth is required")
      .test(
        "dob",
        "Please choose a valid date of birth",
        (date) => moment().diff(moment(date), "years") >= 16
      ),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match")
      .required("Please confirm your password"),
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
      fullName: "",
      username: "",
      dob: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await axios.post("/api/register", values);
        registerModal.onClose();
        login({
          values,
          setIsLoading,
          router,
          loginModal,
          resetForm,
          setFieldValue,
        });
      } catch (error: any) {
        console.log(error);
        toast.error(error.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  let bodyContent = (
    <div className="overflow-hidden md:h-full min-h-[calc(100vh-7.5rem)]">
      <Heading
        title="Welcome To Zwitter!"
        subtitle="Signup to know every happening in the world."
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-8">
        <div className="relative">
          <input
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            id="fullName"
            type="text"
            name="fullName"
            placeholder=" "
            className={`inputStyles peer ${
              errors.fullName && touched.fullName
                ? "border-red-600 focus:border-red-600"
                : "border-gray-600 focus:border-primaryBlue"
            }`}
          />

          <label htmlFor="fullName" className="inputLabel">
            Full Name
          </label>

          {errors.fullName && touched.fullName && (
            <p className="error">
              <IoAlertCircle className="text-[1rem]" /> {errors.fullName}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            id="username"
            type="text"
            name="username"
            placeholder=" "
            className={`inputStyles peer ${
              errors.username && touched.username
                ? "border-red-600 focus:border-red-600"
                : "border-gray-600 focus:border-primaryBlue"
            }`}
          />

          <label htmlFor="userName" className="inputLabel">
            Username
          </label>

          {errors.username && touched.username && (
            <p className="error">
              <IoAlertCircle className="text-[1rem]" /> {errors.username}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            id="email"
            type="email"
            name="email"
            placeholder=" "
            className={`inputStyles peer ${
              errors.email && touched.email
                ? "border-red-600 focus:border-red-600"
                : "border-gray-600 focus:border-primaryBlue"
            }`}
          />

          <label htmlFor="email" className="inputLabel">
            Email Address
          </label>

          {errors.email && touched.email && (
            <p className="error">
              <IoAlertCircle className="text-[1rem]" /> {errors.email}
            </p>
          )}
        </div>

        <div className="relative">
          <input
            value={values.dob}
            onChange={handleChange}
            onBlur={handleBlur}
            id="dob"
            type="date"
            name="dob"
            placeholder=" "
            className={`inputStyles peer ${
              errors.dob && touched.dob
                ? "border-red-600 focus:border-red-600"
                : "border-gray-600 focus:border-primaryBlue"
            }`}
          />

          <label htmlFor="dob" className="inputLabel">
            Date Of Birth
          </label>

          {errors.dob && touched.dob && (
            <p className="error">
              <IoAlertCircle className="text-[1rem]" /> {errors.dob}
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
          Create
        </button>

        <div className="text-sm flex items-center gap-1 mt-3 w-full justify-center">
          Already have an account?
          <span
            onClick={toggleMenu}
            className="hover:underline cursor-pointer text-primaryBlue"
          >
            Log in
          </span>
        </div>
      </form>
    </div>
  );

  return (
    <Modal
      onClose={registerModal.onClose}
      isOpen={registerModal.isOpen}
      title="Sign up"
      body={bodyContent}
      register
    />
  );
};

export default RegisterModal;
