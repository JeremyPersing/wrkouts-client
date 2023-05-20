import Link from "next/link";
import { GoMarkGithub } from "react-icons/go";

export default function Footer() {
  return (
    <footer className="footer items-center p-6 bg-neutral text-neutral-content">
      <div className="items-center grid-flow-col">
        <p>
          <Link href={"/"} className="hover:text-blue-400">
            wrkouts.com
          </Link>{" "}
          - Super Simple Fitness Tool
        </p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <Link target="__blank" href={"https://github.com/JeremyPersing/"}>
          <GoMarkGithub className="text-3xl" />
        </Link>
      </div>
    </footer>
  );
}
