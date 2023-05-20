import { useStore } from "@/store";
import WorkoutForm from "./Forms/WorkoutForm";

export default function EditWorkoutModal() {
  const { editWorkout } = useStore();

  return (
    <div className="overflow-y-auto ">
      <input type="checkbox" id="edit-workout-modal" className="modal-toggle" />
      <label htmlFor="edit-workout-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Add your workout</h3>
          <WorkoutForm editWorkout={editWorkout} />
        </label>
      </label>
    </div>
  );
}
