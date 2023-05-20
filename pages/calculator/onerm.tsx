import Page from "@/components/Pages/Page";
import OneRepMaxCalculator from "@/components/Forms/OneRepMaxCalculator";

export default function OneRm() {
  return (
    <Page title="One Rep Max Calculator" content="1 Rep Max Calculator">
      <div className="flex justify-center items-center">
        <OneRepMaxCalculator />
      </div>
    </Page>
  );
}
