interface Exercise {
  name: string;
  reps: number;
  sets: number;
  weight: number;
}

export interface Workout {
  _id: string;
  userID?: string;
  date: string;
  exercises: Exercise[];
}
