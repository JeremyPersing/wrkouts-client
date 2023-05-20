import { useRouter } from "next/router";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import Page from "../../../components/Pages/Page";
import { resetPasswordSchema } from "../../../validation/auth";
import PasswordInput from "@/components/Forms/Formik/PasswordInput";
import { resetPassword } from "@/services/auth";
import { showToastError } from "@/utils/toast";

export default function ResetPassword() {
  const router = useRouter();
  const token = router.query?.token;

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordRepeat: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async ({ password, passwordRepeat }) => {
      try {
        if (!token || typeof token !== "string")
          return showToastError(
            "Unable to reset your password. Please try click the email link again or going through the forgot password process."
          );

        const passwordReset = await resetPassword({
          password,
          passwordRepeat,
          token,
        });

        if (passwordReset) {
          toast.success("Your password has been reset.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          return router.push("/auth/login");
        }

        showToastError("There was an error in trying to reset your password.");
      } catch (error: any) {
        showToastError(
          "An error has occurred trying to reset your password. " +
            error?.message
            ? error.message
            : ""
        );
      }
    },
  });

  return (
    <Page title="Reset Password" content="Reset Password">
      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="text-3xl font-bold pb-5">Reset Password</h1>
        <div
          className={`w-96 flex flex-col p-10 rounded justify-center items-center`}
        >
          <form onSubmit={formik.handleSubmit}>
            <PasswordInput formik={formik} fieldName="password" />
            <PasswordInput
              formik={formik}
              fieldName="passwordRepeat"
              label="Repeat Password"
              placeholder="Repeat Password"
            />

            <button type="submit" className="btn btn-block">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </Page>
  );
}
