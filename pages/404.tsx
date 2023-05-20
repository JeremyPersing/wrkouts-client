import Page from "@/components/Pages/Page";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();

  return (
    <Page title="Not Found" content="This page does not exist.">
      <div className="flex flex-col items-center justify-center pt-32 ">
        <h1 className="text-3xl font-bold pb-5">404 - Page Not Found</h1>
        <button onClick={router.back} className="btn btn-primary">
          Go Back
        </button>
      </div>
    </Page>
  );
}
