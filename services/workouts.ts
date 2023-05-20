import axios from "axios";

import { Workout } from "@/types/Workout";
import { showToastError } from "@/utils/toast";
import { apiEndpoints } from "@/constants";

export const createOrUpdateWorkout = async (
  workout: Workout,
  userID: string,
  accessToken: string,
  type: "create" | "update"
) => {
  const fetcher = type === "create" ? axios.post : axios.put;
  const url =
    type === "create"
      ? apiEndpoints.workouts
      : `${apiEndpoints.workouts}/${workout?._id}`;

  const { data } = await fetcher<Workout>(
    url,
    {
      userID,
      date: workout.date,
      exercises: workout.exercises,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data;
};

export const getWorkout = async (workoutID: string, accessToken: string) => {
  const { data } = await axios.get<Workout>(
    `${apiEndpoints.workouts}/${workoutID}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data;
};

export const deleteWorkout = async (workoutID: string, accessToken: string) => {
  const { status } = await axios.delete<Workout>(
    `${apiEndpoints.workouts}/${workoutID}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (status === 204) return true;
  return false;
};
