import { AuthForm } from "@/components/Forms/AuthForm";
import Page from "@/components/Page";

export default function Register() {
  return (
    <Page title="Sign Up" content="Sign up">
      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="text-3xl font-bold pb-5">Register</h1>
        <AuthForm type="register" />
      </div>
    </Page>
  );
}
