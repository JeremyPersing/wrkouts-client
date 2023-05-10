import { ChangeEvent, useState } from "react";
import { useFormik } from "formik";

import { calorieCalculatorSchema } from "../../constants";
import {
  convertInchesToCM,
  convertLbsToKg,
  getBmr,
} from "@/utils/calculations";
import Select from "../Select";
import { Input } from "../Input";

const units = ["Imperial", "Metric"];
const sex = ["Male", "Female"];
const activityLevelMultipliers: { [key: string]: number } = {
  "Little to no exercise in a day": 1.2,
  "Light exercise 1-3 days per week": 1.375,
  "Moderate exercise 3-5 days per week": 1.55,
  "Hard exercise 6-7 days per week": 1.725,
  "Very intense daily exercise": 1.9,
};

const activityLevels = [
  "Little to no exercise in a day",
  "Light exercise 1-3 days per week",
  "Moderate exercise 3-5 days per week",
  "Hard exercise 6-7 days per week",
  "Very intense daily exercise",
];

export default function CalorieCalculator() {
  const [calories, setCalories] = useState<number>(0);

  const formik = useFormik({
    initialValues: {
      sex: sex[0],
      age: "",
      height: "",
      weight: "",
      units: units[0],
      activityLevel: activityLevels[0],
    },
    validationSchema: calorieCalculatorSchema,
    onSubmit: (values: {
      sex: string;
      age: string;
      height: string;
      weight: string;
      units: string;
      activityLevel: string;
    }) => {
      const { sex, age, height, weight, units, activityLevel } = values;

      const metricWeight =
        units === "Imperial" ? convertLbsToKg(Number(weight)) : Number(weight);

      const metricHeight =
        units === "Imperial"
          ? convertInchesToCM(Number(height))
          : Number(height);

      const bmr = getBmr(sex, metricWeight, metricHeight, Number(age));
      const activityMultiplier = activityLevelMultipliers[activityLevel];

      const cals = bmr * activityMultiplier;

      setCalories(Math.round(cals));
    },
  });

  const handleSelectChange = (
    field: "sex" | "units" | "activityLevel",
    e: ChangeEvent<HTMLSelectElement>
  ) => formik.setFieldValue(field, e.target.value);

  const handleInputChange = (
    field: "age" | "height" | "weight",
    e: ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    formik.setFieldValue(field, e.target.value);
  };

  return (
    <div className="w-96 p-10">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-between mb-3">
          <Select
            label="Sex"
            options={sex}
            onChange={(e) => handleSelectChange("sex", e)}
          />
          <Select
            label="Units"
            options={units}
            onChange={(e) => handleSelectChange("units", e)}
          />
        </div>

        <Input
          className="mb-3"
          label="Age"
          placeholder="Your Age"
          type="number"
          min={1}
          onChange={(e) => handleInputChange("age", e)}
          fieldName="age"
          formik={formik}
        />

        <Input
          className="mb-3"
          label={`Height ${
            formik.values.units === "Metric" ? "(cm)" : "(inches)"
          }`}
          placeholder="Your Height"
          type="number"
          step={0.01}
          min={1}
          onChange={(e) => handleInputChange("height", e)}
          fieldName="height"
          formik={formik}
        />

        <Input
          className="mb-3"
          label={`Weight ${
            formik.values.units === "Metric" ? "(kg)" : "(lbs)"
          }`}
          placeholder="Your Weight"
          type="number"
          min={1}
          step={0.01}
          onChange={(e) => handleInputChange("weight", e)}
          fieldName="weight"
          formik={formik}
        />

        <Select
          label="Activity Level"
          options={activityLevels}
          className="w-full mb-5"
          onChange={(e) => handleSelectChange("activityLevel", e)}
        />

        <button type="submit" className="btn w-full">
          Calculate
        </button>
      </form>

      <div className="flex w-full justify-center pt-10">
        {calories ? (
          <div>
            <p className="text-xl mb-2">
              Bulking Calories: {(calories + 500).toLocaleString()}
            </p>
            <p className="text-xl mb-2">
              Maintenance Calories: {calories.toLocaleString()}
            </p>
            <p className="text-xl mb-2">
              Cutting Calories: {(calories - 500).toLocaleString()}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
