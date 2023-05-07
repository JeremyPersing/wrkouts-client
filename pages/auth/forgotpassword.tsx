import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";

import Page from "../../components/Page";
import { forgotUserPasswordSchema } from "@/constants";
import EmailInput from "@/components/Forms/Formik/EmailInput";
import { submitForgotPassword } from "@/services/auth";

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

        return toast.error(forgotPasswordRes.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      toast.error("Unable to find account", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
  });

  return (
    <Page title="Forgot Password" content="Forgot Password">
      <section className="h-screen flex justify-center items-center">
        <div className="flex flex-col items-center w-96">
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
              <div className="flex justify-center pb-10">
                <h2 className="font-semibold text-3xl ">
                  Please enter your email
                </h2>
              </div>

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
