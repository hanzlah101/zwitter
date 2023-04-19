"use client";

import { FC, useState } from "react";
import { useFormik } from "formik";
import moment from "moment";
import { IoAlertCircle } from "react-icons/io5";
import * as yup from "yup";
import { SafeUser } from "../types";
import axios from "axios";
import { useRouter } from "next/navigation";
import useSettingsModal from "../hooks/useSettingsModal";
import { toast } from "react-hot-toast";

interface EditProfileProps {
  currentUser: SafeUser | null;
  setStep?: any;
}

const EditProfile: FC<EditProfileProps> = ({ currentUser, setStep }) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const settingsModal = useSettingsModal();

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
      .test(
        "dob",
        "Please choose a valid date of birth",
        (date) => moment().diff(moment(date), "years") >= 16
      )
      .required("Date of birth is required"),
  });

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      fullName: currentUser?.fullName || "",
      username: currentUser?.username || "",
      email: currentUser?.email || "",
      dob: currentUser?.dob || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        await axios.put("/api/user/update", values);
        setStep();
        router.push(`/user/${currentUser?.id}`);
        settingsModal.onClose();
        toast.success("Profile Updated Successfully!");
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
          value={values.fullName}
          onChange={handleChange}
          id="fullName"
          type="text"
          name="fullName"
          placeholder=" "
          className={`inputStyles peer ${
            errors.fullName
              ? "border-red-600 focus:border-red-600"
              : "border-gray-600 focus:border-primaryBlue"
          }`}
        />

        <label htmlFor="fullName" className="inputLabel">
          Full Name
        </label>

        {errors.fullName && (
          <p className="error">
            <IoAlertCircle className="text-[1rem]" /> {errors.fullName}
          </p>
        )}
      </div>

      <div className="relative">
        <input
          value={values.username}
          onChange={handleChange}
          id="username"
          type="text"
          name="username"
          placeholder=" "
          className={`inputStyles peer ${
            errors.username
              ? "border-red-600 focus:border-red-600"
              : "border-gray-600 focus:border-primaryBlue"
          }`}
        />

        <label htmlFor="userName" className="inputLabel">
          Username
        </label>

        {errors.username && (
          <p className="error">
            <IoAlertCircle className="text-[1rem]" /> {errors.username}
          </p>
        )}
      </div>

      <div className="relative">
        <input
          value={values.email}
          onChange={handleChange}
          id="email"
          type="email"
          name="email"
          placeholder=" "
          className={`inputStyles peer ${
            errors.email
              ? "border-red-600 focus:border-red-600"
              : "border-gray-600 focus:border-primaryBlue"
          }`}
        />

        <label htmlFor="email" className="inputLabel">
          Email Address
        </label>

        {errors.email && (
          <p className="error">
            <IoAlertCircle className="text-[1rem]" /> {errors.email}
          </p>
        )}
      </div>

      <div className="relative">
        <input
          value={values.dob}
          onChange={handleChange}
          id="dob"
          type="date"
          name="dob"
          placeholder=" "
          className={`inputStyles peer ${
            errors.dob
              ? "border-red-600 focus:border-red-600"
              : "border-gray-600 focus:border-primaryBlue"
          }`}
        />

        <label htmlFor="dob" className="inputLabel">
          Date Of Birth
        </label>

        {errors.dob && (
          <p className="error">
            <IoAlertCircle className="text-[1rem]" /> {errors.dob}
          </p>
        )}
      </div>

      <button disabled={isLoading} type="submit" className="btnSecondary">
        Update
      </button>
    </form>
  );
};

export default EditProfile;
