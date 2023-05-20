export interface ExerciseTemplate {
  id: number;
  name: string;
  reps: number;
  sets: number;
  restTime?: number;
}

export interface Exercise extends ExerciseTemplate {
  weight: number;
}
