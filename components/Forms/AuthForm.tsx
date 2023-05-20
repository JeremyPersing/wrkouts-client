import { useFormik } from "formik";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { GrGoogle } from "react-icons/gr";

import {
  loginValidationSchema,
  registerValidationSchema,
} from "../../validation/auth";
import EmailInput from "./Formik/EmailInput";
import PasswordInput from "./Formik/PasswordInput";

export const AuthForm = ({
  type,
  className,
}: {
  type: "login" | "register";
  className?: string;
}) => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema:
      type === "register" ? registerValidationSchema : loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await signIn("credentials", {
        callbackUrl: "/",
        email: values.email,
        password: values.password,
        type,
      });

      setSubmitting(false);
    },
  });

  return (
    <div
      style={{ height: "36rem" }}
      className={`w-96 flex flex-col border p-10 rounded justify-center items-center ${className}`}
    >
      <form onSubmit={formik.handleSubmit} className="w-full">
        <EmailInput formik={formik} fieldName="email" />
        <PasswordInput formik={formik} fieldName="password" />

        <div className="text-sm w-full mb-10">
          {type === "register" ? (
            <Link className="hover:underline" href={"/auth/login"}>
              Already have an account?
            </Link>
          ) : (
            <div className="flex justify-between">
              <Link className="hover:underline" href={"/auth/register"}>
                Need to sign up?
              </Link>
              <Link className="hover:underline" href={"/auth/forgotpassword"}>
                Forgot password?
              </Link>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn w-full"
          disabled={formik.isSubmitting}
        >
          Submit
        </button>
      </form>

      <div className="flex justify-between items-center my-10 w-full">
        <div className="border-t w-32" />
        <p>OR</p>
        <div className="border-t w-32" />
      </div>

      <button
        className="btn btn-outline btn- w-full"
        onClick={() =>
          signIn("google", {
            callbackUrl: "/",
          })
        }
      >
        <GrGoogle className="mr-3" />
        Continue With Google
      </button>
    </div>
  );
};
