import Link from "next/link";
import { GoMarkGithub } from "react-icons/go";

export default function Footer() {
  return (
    <footer className="footer items-center p-6 bg-neutral text-neutral-content">
      <div>
        <p>
          <Link href={"/"} className="hover:text-blue-400">
            wrkouts.xyz
          </Link>{" "}
          - Super Simple Fitness Tool
        </p>
        <p className="text-xs">
          Emojis come from the{" "}
          <Link
            href={"https://twemoji.twitter.com/"}
            className="hover:text-blue-400"
            target="__blank"
          >
            Twemoji Project
          </Link>
        </p>
        <Link href={"/privacy"} className="text-xs hover:text-blue-400">
          Privacy Policy
        </Link>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <Link target="__blank" href={"https://github.com/JeremyPersing/"}>
          <GoMarkGithub className="text-4xl" />
        </Link>
      </div>
    </footer>
  );
}
