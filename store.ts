import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { User } from "./types/User";
import { Workout } from "./types/Workout";
import { useEffect, useState } from "react";

type State = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;

  addWorkout: (workout: Workout) => void;
  updateWorkout: (workout: Workout) => void;
  deleteWorkout: (workoutID: string) => void;
  updateAllWorkouts: (workouts: Workout[]) => void;

  editWorkout: Workout | undefined;
  setEditWorkout: (workout: Workout | undefined) => void;
};

const defaultUser = {
  email: "defaultUser",
  timerWorkouts: [],
  workouts: [],
};

const emptyState: State = {
  user: null,
  login: () => {},
  logout: () => {},
  addWorkout: () => {},
  updateWorkout: () => {},
  deleteWorkout: () => {},
  updateAllWorkouts: () => {},
  editWorkout: undefined,
  setEditWorkout: () => {},
};

// Nextjs issues access localStorage when rendering on client
// https://github.com/pmndrs/zustand/issues/1145
export const usePersistedStore = create<State>()(
  persist(
    (set) => ({
      user: defaultUser,
      login: (user) => set(() => ({ user })),
      logout: () => set(() => ({ user: defaultUser })),

      addWorkout: (workout) =>
        set((state) => {
          if (state.user) {
            if (!state.user?.workouts) state.user.workouts = [];

            state.user.workouts.unshift(workout);
            return { user: state.user };
          }

          return state;
        }),
      updateWorkout: (workout) =>
        set((state) => {
          if (state.user) {
            if (!state.user?.workouts) return state;

            const index = state.user?.workouts
              ? state.user.workouts.findIndex((i) => i._id === workout._id)
              : -1;

            if (index > -1) {
              state.user.workouts[index] = workout;
              return { user: state.user };
            }
          }

          return state;
        }),
      deleteWorkout: (workoutID) =>
        set((state) => {
          if (state.user) {
            if (!state.user?.workouts) return state;

            const newWorkouts = state.user.workouts.filter(
              (i) => i._id !== workoutID
            );
            state.user.workouts = newWorkouts;

            return { user: state.user };
          }

          return state;
        }),
      updateAllWorkouts: (workouts) =>
        set((state) => {
          if (state.user) {
            state.user.workouts = workouts;
            return { user: state.user };
          }

          return state;
        }),

      editWorkout: undefined,
      setEditWorkout: (workout: Workout | undefined) =>
        set((state) => ({ editWorkout: workout })),
    }),
    {
      name: "wrkouts-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// This a fix to ensure zustand never hydrates the store before React hydrates the page
// else it causes a mismatch between SSR/SSG and client side on first draw which produces an error
export const useStore = ((selector, compare) => {
  const store = usePersistedStore(selector, compare);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return hydrated ? store : emptyState;
}) as typeof usePersistedStore;
