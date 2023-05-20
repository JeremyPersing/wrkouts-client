import { object, string, array, number } from "yup";

export const calorieCalculatorSchema = object({
  sex: string().required(),
  age: string().required("Please enter your age."),
  height: string().required("Please enter your height."),
  weight: number().positive().required("Please enter your weight"),
  units: string().required(),
  activityLevel: string().required(),
});

export const exerciseSchema = object({
  _id: string(),
  name: string().required().max(150),
  sets: number().required().min(1),
  reps: number().required().min(1),
  weight: number().required().min(1),
});

export const workoutSchema = object({
  date: string().required().max(20),
  exercises: array()
    .of(exerciseSchema)
    .min(1, "At least 1 exercise is required.")
    .required(),
});
