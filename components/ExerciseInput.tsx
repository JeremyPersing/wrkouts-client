import { FormikValues } from "formik";

import { Input } from "./Input";

export default function ExerciseInput({
  index,
  formik,
}: {
  index: number;
  formik: FormikValues;
}) {
  return (
    <div>
      <Input
        type="text"
        onChange={(e) =>
          formik.setFieldValue(`exercises[${index}].name`, e.target.value)
        }
        value={formik.values.exercises[index].name}
        label="Exercise Name"
        placeholder="Bench Press ..."
        fieldName="name"
      />
      <div className="flex justify-between">
        <Input
          type="number"
          onChange={(e) =>
            formik.setFieldValue(
              `exercises[${index}].sets`,
              Number(e.target.value)
            )
          }
          value={formik.values.exercises[index].sets}
          min={1}
          label="Sets"
          placeholder="Sets"
          fieldName="sets"
        />
        <Input
          type="number"
          className="mx-16"
          onChange={(e) =>
            formik.setFieldValue(
              `exercises[${index}].reps`,
              Number(e.target.value)
            )
          }
          value={formik.values.exercises[index].reps}
          min={1}
          label="Reps"
          placeholder="Reps"
          fieldName="reps"
        />
        <Input
          type="number"
          onChange={(e) =>
            formik.setFieldValue(
              `exercises[${index}].weight`,
              Number(e.target.value)
            )
          }
          value={formik.values.exercises[index].weight}
          min={1}
          label="Weight"
          placeholder="Weight"
          fieldName="weight"
        />
      </div>
    </div>
  );
}
