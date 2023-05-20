import WorkoutForm from "./Forms/WorkoutForm";

export default function WorkoutModal() {
  return (
    <div className="overflow-y-auto">
      <input type="checkbox" id="workout-modal" className="modal-toggle" />
      <label htmlFor="workout-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Add your workout</h3>
          <WorkoutForm />
        </label>
      </label>
    </div>
  );
}
