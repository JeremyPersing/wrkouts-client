import { useFormik } from "formik";
import { useEffect } from "react";

import { useStore } from "@/store";
import { Input } from "../Input";
import { getTimeStamp } from "@/utils/getTimeStamp";
import { Workout } from "@/types/Workout";
import ExerciseInput from "../ExerciseInput";
import {
  deleteWorkout as deleteServerWorkout,
  createOrUpdateWorkout,
} from "@/services/workouts";
import { useSession } from "next-auth/react";
import { showToastError } from "@/utils/toast";
import { workoutSchema } from "@/validation/workouts";

const defaultExercise = { name: "", sets: 1, reps: 1, weight: 1 };
const defaultState = {
  date: new Date().toLocaleDateString("en-CA"),
  exercises: [defaultExercise],
};

export default function WorkoutForm({
  editWorkout,
}: {
  editWorkout?: Workout;
}) {
  const {
    user,
    setEditWorkout,
    updateWorkout,
    deleteWorkout,
    updateAllWorkouts,
  } = useStore();
  const { addWorkout } = useStore();
  const { data } = useSession();

  const getPrevWorkouts = () => (user?.workouts ? [...user.workouts] : []);

  const updateUserWorkouts = (prevID: string, newWorkout: Workout) => {
    const prevWorkouts = getPrevWorkouts();
    const index = prevWorkouts.findIndex((i) => i._id === prevID);

    if (index !== -1) {
      prevWorkouts[index] = newWorkout;
      updateAllWorkouts(prevWorkouts);
    }
  };

  const createOrUpdateServerWorkout = async (
    workout: Workout,
    type: "create" | "update"
  ) => {
    if (user && data?.accessToken) {
      const res = await createOrUpdateWorkout(
        workout,
        user._id as string,
        data.accessToken,
        type
      );

      if (res) updateUserWorkouts(workout._id, res);
    }
  };

  const addExercise = () => {
    const newExercises = formik.values.exercises;
    newExercises.push(defaultExercise);

    formik.setFieldValue("exercises", newExercises);
  };

  const deleteExercise = (index: number) => {
    const newExercises = formik.values.exercises.filter(
      (_, idx) => idx !== index
    );

    formik.setFieldValue("exercises", newExercises);
  };

  const deleteUserWorkout = async () => {
    const prevWorkouts = getPrevWorkouts();
    try {
      if (editWorkout) {
        const id = editWorkout._id;

        // If you don't setTimeout the modal won't close
        setTimeout(() => {
          deleteWorkout(id);
          setEditWorkout(undefined);
          formik.resetForm();
        }, 100);

        if (data?.accessToken) await deleteServerWorkout(id, data.accessToken);
      }
    } catch (error: any) {
      // Have to put this on a timer, because the state change above has to
      // be on a timer. If it isn't it will not restore to prev state
      setTimeout(() => updateAllWorkouts(prevWorkouts), 200);
      showToastError("Unable to delete workout.");
    }
  };

  const formik = useFormik({
    enableReinitialize: true, // make sure this is true or it won't work: https://github.com/jaredpalmer/formik/issues/811
    initialValues: editWorkout ? { ...editWorkout } : { ...defaultState },
    validationSchema: workoutSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const prevWorkouts = getPrevWorkouts();
      try {
        const _id = getTimeStamp();
        const workout: Workout = {
          _id,
          ...values,
        };

        setSubmitting(false);

        if (editWorkout) {
          workout._id = editWorkout._id;
          updateWorkout(workout);
          setEditWorkout(undefined);

          return await createOrUpdateServerWorkout(workout, "update");
        }

        addWorkout(workout);
        formik.resetForm();
        await createOrUpdateServerWorkout(workout, "create");
      } catch (error) {
        updateAllWorkouts(prevWorkouts);
        showToastError("Unable to save workout.");
      }
    },
  });

  useEffect(() => {
    if (editWorkout) {
      formik.setFieldValue("date", editWorkout.date);
      formik.setFieldValue("exercises", editWorkout.exercises);
    } else {
      formik.setFieldValue("date", defaultState.date);
      formik.setFieldValue("exercises", defaultState.exercises);
    }
  }, [editWorkout]);

  return (
    <div>
      <Input
        label="Date"
        placeholder="Date"
        type="date"
        className="mb-5"
        formik={formik}
        fieldName="date"
        value={formik.values.date}
      />

      {formik.values.exercises.map((_, idx) => (
        <div key={idx} className="my-3">
          <ExerciseInput formik={formik} index={idx} />
          {formik.values.exercises.length > 1 && (
            <button
              className="btn btn-outline btn-xs btn-warning mt-2"
              onClick={() => deleteExercise(idx)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
      <div className="flex justify-end">
        <button className="btn btn-sm mt-3" onClick={addExercise}>
          Add Exercise
        </button>
      </div>

      <div className="flex justify-between mt-5">
        <label
          htmlFor={editWorkout ? "edit-workout-modal" : "workout-modal"}
          className="btn btn-warning"
          onClick={() => formik.resetForm()}
        >
          Cancel
        </label>

        {editWorkout && (
          <label
            htmlFor="edit-workout-modal"
            className="btn btn-error"
            onClick={deleteUserWorkout}
          >
            Delete
          </label>
        )}

        <label
          htmlFor={editWorkout ? "edit-workout-modal" : "workout-modal"}
          className="btn btn-info"
          onClick={() => setTimeout(() => formik.handleSubmit(), 100)}
        >
          {editWorkout ? "Save Edits" : "Save"}
        </label>
      </div>
    </div>
  );
}
