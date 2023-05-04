import { Formik } from "formik";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { GrGoogle } from "react-icons/gr";

import { loginValidationSchema, registerValidationSchema } from "@/constants";

export const AuthForm = ({
  type,
  className,
}: {
  type: "login" | "register";
  className?: string;
}) => {
  return (
    <div
      style={{ height: "36rem" }}
      className={`w-96 flex flex-col border p-10 rounded justify-center items-center ${className}`}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={
          type === "register" ? registerValidationSchema : loginValidationSchema
        }
        onSubmit={async (values, { setSubmitting }) => {
          await signIn("credentials", {
            callbackUrl: "/",
            email: values.email,
            password: values.password,
            type,
          });

          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="email" className="text-sm">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <div className="text-red-500">
                {errors.email && touched.email && errors.email}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered w-full"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <div className="text-red-500">
                {errors.password && touched.password && errors.password}
              </div>
            </div>

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
                  <Link
                    className="hover:underline"
                    href={"/auth/forgotpassword"}
                  >
                    Forgot password?
                  </Link>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn w-full"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <div className="flex justify-between items-center my-10 w-full">
        <div className="border-t w-32" />
        <p>OR</p>
        <div className="border-t w-32" />
      </div>

      <button
        className="btn gap-2 bg-slate-100 hover:bg-zinc-900 w-full"
        onClick={() =>
          signIn("google", {
            callbackUrl: "/",
          })
        }
      >
        <GrGoogle />
        Continue With Google
      </button>
    </div>
  );
};
