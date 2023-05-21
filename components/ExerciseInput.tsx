import { FormikValues } from "formik";

import { Input } from "./Input";
import Select from "./Select";

export default function ExerciseInput({
  index,
  formik,
}: {
  index: number;
  formik: FormikValues;
}) {
  const values = formik.values.exercises[index];

  return (
    <div>
      <Input
        type="text"
        onChange={(e) =>
          formik.setFieldValue(`exercises[${index}].name`, e.target.value)
        }
        value={values.name}
        label="Exercise Name"
        placeholder="Bench Press ..."
        fieldName="name"
      />
      <div className="flex justify-between">
        <Select
          options={Array.from({ length: 100 }, (_, i) => i + 1)}
          label="Sets"
          onChange={(e) =>
            formik.setFieldValue(
              `exercises[${index}].sets`,
              Number(e.target.value)
            )
          }
          value={values.sets}
          selectClassName="sm:w-28"
        />

        <Select
          options={Array.from({ length: 200 }, (_, i) => i + 1)}
          label="Reps"
          className="sm:mx-16 mx-2"
          onChange={(e) =>
            formik.setFieldValue(
              `exercises[${index}].reps`,
              Number(e.target.value)
            )
          }
          value={values.reps}
          selectClassName="sm:w-28"
        />

        <Input
          type="number"
          onChange={(e) =>
            formik.setFieldValue(
              `exercises[${index}].weight`,
              Number(e.target.value)
            )
          }
          value={values.weight <= 0 ? undefined : values.weight}
          min={1}
          label="Weight"
          placeholder="Weight"
          fieldName="weight"
          className="sm:w-28"
        />
      </div>
    </div>
  );
}
