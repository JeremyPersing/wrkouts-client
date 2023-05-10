import { ChangeEvent, useState } from "react";
import { Input } from "../Input";
import Select from "../Select";

export default function OneRepMaxCalculator({
  className,
}: {
  className?: string;
}) {
  const [weight, setWeight] = useState<number>(0);
  const [reps, setReps] = useState<number>(1);
  const [units, setUnits] = useState<"lbs" | "kg">("lbs");

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setWeight(Number(e.target.value));
  };

  const handleRepsChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setReps(Number(e.target.value));
  };

  const handleUnitChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setUnits(e.currentTarget.value as "kg");

  return (
    <div className={`p-10 w-96 ${className}`}>
      <div className="flex flex-col items-end">
        <Select
          label="Units"
          options={["lbs", "kg"]}
          onChange={handleUnitChange}
          selectClassName="select-md w-24"
        />
      </div>

      <Input
        label="Weight"
        placeholder="Weight Lifted"
        type="number"
        min={1}
        onChange={handleWeightChange}
        value={weight}
      />

      <Input
        label="Reps"
        type="number"
        min={1}
        placeholder="Number of Reps"
        onChange={handleRepsChange}
        value={reps}
      />

      <div className="flex w-full justify-center pt-10">
        {weight && weight > -1 && reps > 0 ? (
          <p className="text-xl">
            Max:{" "}
            {reps === 1
              ? `${weight} ${units}`
              : `${(weight * (1 + reps / 30)).toFixed(1)} ${units}`}
          </p>
        ) : null}
      </div>
    </div>
  );
}
