import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

import { useStore } from "@/store";
import { useEffect } from "react";
import { getMe } from "@/services/user";

if (process.env.NODE_ENV === "development")
  process.env.NEXTAUTH_URL = "http://localhost:3000";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthLayout />
      <Component {...pageProps} />
      <ToastContainer />
    </SessionProvider>
  );
}

function AuthLayout() {
  const { login, user, logout } = useStore();
  const session = useSession();

  useEffect(() => {
    async function handleGetUser() {
      if (session.status === "authenticated") {
        const user = await getMe(session.data.accessToken);
        if (user && user?.email) login(user);
      } else if (
        session.status === "unauthenticated" &&
        user &&
        user.email !== "defaultUser"
      ) {
        logout();
      }
    }

    handleGetUser();
  }, [session]);

  return <></>;
}
