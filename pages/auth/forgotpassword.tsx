import { useFormik } from "formik";
import { useState } from "react";

import Page from "../../components/Pages/Page";
import { forgotUserPasswordSchema } from "../../validation/auth";
import EmailInput from "@/components/Forms/Formik/EmailInput";
import { submitForgotPassword } from "@/services/auth";
import { showToastError } from "@/utils/toast";

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: forgotUserPasswordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const forgotPasswordRes = await submitForgotPassword(values.email);
      setSubmitting(false);

      if (forgotPasswordRes) {
        if (forgotPasswordRes.emailSent) return setEmailSent(true);

        return showToastError(forgotPasswordRes.message);
      }

      showToastError("Unable to find account");
    },
  });

  return (
    <Page title="Forgot Password" content="Forgot Password" showFooter={false}>
      <section className="flex justify-center items-center">
        <div className="flex flex-col items-center sm:w-96 w-full">
          {emailSent ? (
            <div className="flex justify-center pb-10 w-full">
              <h2 className="font-semibold text-lg text-center">
                An email has been sent your way. If you don't see it, please
                check your spam folder. Just follow the directions in the email
                to reset your password.
              </h2>
            </div>
          ) : (
            <div className="py-16 px-4 rounded-lg w-full">
              <h2 className="font-semibold text-3xl text-center pb-10">
                Please enter your email
              </h2>

              <form onSubmit={formik.handleSubmit}>
                <EmailInput fieldName="email" formik={formik} />

                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="btn btn-block"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </Page>
  );
}
