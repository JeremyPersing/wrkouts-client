import axios from "axios";

import { apiEndpoints } from "@/constants";
import { TimerWorkout } from "@/types/TimerWorkout";

export const getTimerWorkouts = async (token: string | undefined) => {
  const { data } = await axios.get<TimerWorkout[]>(
    `${apiEndpoints.userTimerWorkout}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const createTimerWorkout = async (
  values: TimerWorkout,
  token: string | undefined
) => {
  const { name, rest, workout, rounds } = values;

  const { data } = await axios.post<TimerWorkout[]>(
    `${apiEndpoints.userTimerWorkout}`,
    {
      name,
      rest,
      workout,
      rounds,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const deleteTimerWorkout = async (
  workoutID: string,
  token: string | undefined
) => {
  const { data } = await axios.delete<TimerWorkout[]>(
    `${apiEndpoints.userTimerWorkout}/${workoutID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const updateTimerWorkout = async (
  values: TimerWorkout,
  token: string | undefined
) => {
  const { name, rest, workout, rounds } = values;

  const { data } = await axios.patch<TimerWorkout[]>(
    `${apiEndpoints.userTimerWorkout}`,
    {
      name,
      rest,
      workout,
      rounds,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};
