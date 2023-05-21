import EditWorkoutModal from "@/components/EditWorkoutModal";
import Page from "@/components/Pages/Page";
import WorkoutModal from "@/components/WorkoutModal";
import { useStore } from "@/store";

export default function Home() {
  const { user, setEditWorkout } = useStore();

  return (
    <Page title="Home" content="wrkouts.xyz - A super simple fitness tool">
      <div className="flex flex-col items-center justify-center">
        <div className="sm:w-96 w-full">
          {!user?.workouts || user?.workouts?.length === 0 ? (
            <div className="pt-10">
              <h2 className="font-bold text-3xl">
                Looks like you don't have any workouts!
              </h2>
              {user?.email === "defaultUser" ? (
                <p className="text-sm pt-3">
                  You also aren't signed into an account. If you sign in or
                  create an account then you'll be able to access your workouts
                  on any device. Otherwise, you'll only be able to access
                  workouts on this device.
                </p>
              ) : null}
            </div>
          ) : null}

          <label
            htmlFor="workout-modal"
            className="btn btn-primary btn-outline w-full mt-10"
          >
            Add Workout
          </label>

          {user?.workouts && user?.workouts.length ? (
            <div className="mt-10 sm:w-96 w-full overflow-y-auto">
              <p className="pb-2 font-bold text-xl">Your Workouts</p>
              {user.workouts.map((workout) => {
                return (
                  <label
                    key={workout._id}
                    htmlFor="edit-workout-modal"
                    onClick={() => setEditWorkout(workout)}
                  >
                    <div
                      className="px-5 py-3 border rounded shadow-sm hover:cursor-pointer my-3"
                      key={workout._id}
                    >
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-600">{workout.date}</p>
                        <p>
                          {workout.exercises.length}{" "}
                          {workout.exercises.length === 1
                            ? "exercise"
                            : "exercises"}
                        </p>
                      </div>
                      <ul>
                        {workout.exercises.map((i) => (
                          <div key={i.name} className="sm">
                            <span className="font-semibold">{i.name}</span>
                            <span>
                              {" "}
                              - {i.sets} sets - {i.reps} reps - {i.weight} lbs
                            </span>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </label>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
      <WorkoutModal />
      <EditWorkoutModal />
    </Page>
  );
}
