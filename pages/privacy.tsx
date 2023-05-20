import Page from "@/components/Pages/Page";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Privacy() {
  return (
    <Page title="Privacy Policy" content="wrkouts.xyz privacy policy">
      <div className="flex flex-col items-center justify-center pt-32">
        <div className="w-96">
          <h1 className="text-3xl font-bold pb-5 text-center">
            Privacy Policy
          </h1>
          <p>
            The information that gets stored in our database is your email, your
            password in a hashed and salted form, and information about your
            workouts. If you want more specific details, check out the code for
            yourself on{" "}
            <Link
              className="hover:text-blue-400"
              href="https://github.com/JeremyPersing/wrkouts-server"
              target="__blank"
            >
              Github.
            </Link>
          </p>
        </div>
      </div>
    </Page>
  );
}
