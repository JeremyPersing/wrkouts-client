import Page from "@/components/Pages/Page";
import CalorieCalculator from "@/components/Forms/CalorieCalculator";

export default function Calories() {
  return (
    <Page title="Calorie Calculator" content="Calorie Calculator">
      <div className="flex justify-center items-center">
        <CalorieCalculator />
      </div>
    </Page>
  );
}
