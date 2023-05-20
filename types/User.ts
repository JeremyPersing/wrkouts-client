import { Workout } from "./Workout";
import { TimerWorkout } from "./TimerWorkout";

export type User = {
  _id?: string;
  email: string;
  password?: string;
  socialLoginProvider?: string;
  timerWorkouts: TimerWorkout[];
  workouts?: Workout[];
};
