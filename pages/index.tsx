import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import axios from "axios";

import Page from "@/components/Page";

const getMe = async (accessToken: string | undefined) => {
  try {
    if (!accessToken) return;

    const { data } = await axios.get("http://localhost:4000/api/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (data) alert(data);
    else alert("Can't get data");
  } catch (error) {
    alert(JSON.stringify(error));
  }
};

export default function Home() {
  const { status, data } = useSession();

  return (
    <Page title="Adosus - Home" content="A fitness app">
      <p>{JSON.stringify(status)}</p>
      <p>{JSON.stringify(data)}</p>
      <div className="flex ">
        <button
          className="btn btn-accent mr-5"
          onClick={() => getMe(data?.accessToken)}
        >
          Get Me
        </button>

        <div>
          {status === "authenticated" ? (
            <button
              className="btn btn-secondary"
              onClick={() => signOut({ redirect: false })}
            >
              Sign Out
            </button>
          ) : (
            <div>
              <Link className="btn mx-3 btn-secondary" href={"/auth/login"}>
                Sign In
              </Link>
              <Link className="btn mx-3" href={"/auth/register"}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}
