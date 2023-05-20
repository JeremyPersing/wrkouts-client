import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useStore } from "@/store";

export default function Navbar() {
  const { status } = useSession();
  const { logout } = useStore();

  const handleSignOut = () => {
    logout();
    signOut({ redirect: false });
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={"/timer"}>Timer</Link>
            </li>
            <li tabIndex={0}>
              <a className="justify-between">
                Calculators
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </a>
              <ul className="p-2 bg-white z-10 shadow">
                <li>
                  <Link href={"/calculator/calories"}>Calories</Link>
                </li>
                <li>
                  <Link href={"/calculator/onerm"}>One Rep Max</Link>
                </li>
              </ul>
            </li>

            <div className="sm:hidden">
              {status === "authenticated" ? (
                <li>
                  <a onClick={handleSignOut}>Sign Out</a>
                </li>
              ) : (
                <>
                  <li>
                    <Link href={"/auth/login"}>Sign In</Link>
                  </li>
                  <li>
                    <Link href={"/auth/register"}>Sign Up</Link>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
        <Link href="/">
          <Image
            src="/assets/wrkouts-logo.svg"
            alt="Wrkouts.xyz Logo"
            className="mt-4 ml-3"
            width={200}
            height={100}
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/timer"}>Timer</Link>
          </li>
          <li tabIndex={0}>
            <a>
              Calculators
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-white z-10 shadow">
              <li>
                <Link href={"/calculator/calories"}>Calories</Link>
              </li>
              <li>
                <Link href={"/calculator/onerm"}>One Rep Max</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div>
          {status === "authenticated" ? (
            <button className="hidden sm:block btn" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <div className="hidden sm:block">
              <Link className="btn btn-outline mx-3" href={"/auth/login"}>
                Sign In
              </Link>
              <Link className="btn mx-3" href={"/auth/register"}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
