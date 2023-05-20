import { useEffect } from "react";
import { useRouter } from "next/router";

import { AuthForm } from "@/components/Forms/AuthForm";
import Page from "@/components/Pages/Page";
import { useSession } from "next-auth/react";
import { showToastError } from "@/utils/toast";

export default function AuthPage({ type }: { type: "Login" | "Register" }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const query = router.query;
    if (query && query?.error) {
      const errorString = type === "Login" ? "logging into" : "registering";

      showToastError(`There was an error ${errorString} your account.`);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status]);

  const content =
    type === "Register"
      ? "Register an account with wrkouts.xyz and track your fitness progress."
      : "Login to your wrkouts.xyz account.";

  return (
    <Page title={type} content={content} showFooter={false} showNav={false}>
      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="text-3xl font-bold pb-5">{type}</h1>
        <AuthForm type={type === "Login" ? "login" : "register"} />
      </div>
    </Page>
  );
}
