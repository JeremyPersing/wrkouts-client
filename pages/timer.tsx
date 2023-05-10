import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Input } from "@/components/Input";
import Page from "@/components/Page";
import Select from "@/components/Select";

const formatSeconds = (seconds: number) => {
  let hours = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  let minutes = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  let sec = Math.floor((seconds % 3600) % 60)
    .toString()
    .padStart(2, "0");

  if (hours == "00" && minutes === "00") return `${sec}`;
  if (hours !== "00") return `${hours}:${minutes}:${sec}`;

  return `${minutes}:${sec}`;
};

type Period = {
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Timer() {
  const [audio, setAudio] = useState<HTMLAudioElement | undefined>();
  const [seconds, setSeconds] = useState<null | number>(null);
  const [workoutSeconds, setWorkoutSeconds] = useState(0);
  const [restSeconds, setRestSeconds] = useState(0);
  const [roundPeriod, setRoundPeriod] = useState<"workout" | "rest">("workout");

  const [workoutPeriod, setWorkoutPeriod] = useState<Period>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [restPeriod, setRestPeriod] = useState<Period>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [rounds, setRounds] = useState(1);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [editWorkout, setEditWorkout] = useState(true);
  const [timerState, setTimerState] = useState<"stopped" | "running">(
    "stopped"
  );

  useEffect(() => {
    // Make sure to put audio file in public directory
    setAudio(new Audio("/assets/ding.wav"));
  }, []);

  useEffect(() => {
    let interval: undefined | NodeJS.Timeout = undefined;

    if (timerState === "running" && seconds)
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    else if (timerState === "stopped") clearInterval(interval);
    else if (seconds === 0) {
      audio?.play();

      if (roundsCompleted === rounds) {
        setTimerState("stopped");
        return clearInterval(interval);
      }

      if (roundPeriod === "workout") {
        setRoundsCompleted(roundsCompleted + 1);
        setRoundPeriod("rest");
        return setSeconds(restSeconds);
      }

      if (roundPeriod === "rest") {
        setRoundPeriod("workout");
        setSeconds(workoutSeconds);
      }
    }

    return () => clearInterval(interval);
  }, [timerState, seconds]);

  const startOrStopTimer = () => {
    if (seconds === 0) {
      resetTimer();
      return setTimerState("running");
    }

    if (timerState === "stopped") return setTimerState("running");

    setTimerState("stopped");
  };

  const resetTimer = () => {
    setTimerState("stopped");
    setSeconds(workoutSeconds);
    setRoundPeriod("workout");
    setRoundsCompleted(0);
  };

  const handlePeriodChange = (
    e: ChangeEvent<HTMLSelectElement>,
    type: "workout" | "rest",
    unit: keyof Period
  ) => {
    const val = Number(e.target.value);

    if (type === "workout") {
      const prevTimes = { ...workoutPeriod };
      prevTimes[unit] = val;

      const workoutTimeInSeconds =
        prevTimes.hours * 3600 + prevTimes.minutes * 60 + prevTimes.seconds;

      setWorkoutSeconds(workoutTimeInSeconds);
      return setWorkoutPeriod(prevTimes);
    }

    const prevTimes = { ...restPeriod };
    prevTimes[unit] = val;

    const restTimeInSeconds =
      prevTimes.hours * 3600 + prevTimes.minutes * 60 + prevTimes.seconds;

    setRestSeconds(restTimeInSeconds);
    return setRestPeriod(prevTimes);
  };

  const handleRoundsChange = (e: ChangeEvent<HTMLInputElement>) =>
    setRounds(Number(e.target.value));

  const handleGetStarted = () => {
    let problems = "";
    if (restSeconds < 1) problems += "Please enter a rest time greater than 0.";
    if (workoutSeconds < 1)
      problems += "Please enter a workout time greater than 0.";
    if (rounds < 1) problems += "Please make timer rounds more than 0.";

    if (problems !== "")
      return toast.error(problems, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    setSeconds(workoutSeconds);
    setEditWorkout(false);
    // If the user edits mid way through or something like that we'll make them restart
    if (roundPeriod === "rest") setRoundPeriod("workout");
    setRoundsCompleted(0);
  };

  return (
    <Page title="Workout Timer" content="Workout timer for your workouts.">
      {rounds > 0 && workoutSeconds > 0 && !editWorkout && (
        <div className="flex flex-col items-center pt-10">
          <div>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Rounds</div>
                <div className="stat-value text-2xl">{rounds}</div>
              </div>
            </div>

            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Workout</div>
                <div className="stat-value text-2xl">
                  {formatSeconds(workoutSeconds)}
                </div>
              </div>
            </div>

            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Rest</div>
                <div className="stat-value text-2xl">
                  {formatSeconds(restSeconds)}
                </div>
              </div>
            </div>
          </div>
          <button
            className="mt-5 btn w-96 btn-outline"
            onClick={() => setEditWorkout(true)}
          >
            Edit Workout
          </button>
        </div>
      )}
      <div className="flex justify-center pt-20">
        {editWorkout ? (
          <div>
            <h3 className="text-2xl mb-5">Workout Time</h3>
            <div className="flex w-96 justify-between mb-10">
              <Select
                options={Array.from({ length: 24 }, (_, i) => i)}
                label="Hours"
                onChange={(e) => handlePeriodChange(e, "workout", "hours")}
                value={workoutPeriod.hours}
                selectClassName="w-24"
              />
              <Select
                options={Array.from({ length: 60 }, (_, i) => i)}
                label="Minutes"
                onChange={(e) => handlePeriodChange(e, "workout", "minutes")}
                value={workoutPeriod.minutes}
                selectClassName="w-24"
              />
              <Select
                options={Array.from({ length: 60 }, (_, i) => i)}
                label="Seconds"
                onChange={(e) => handlePeriodChange(e, "workout", "seconds")}
                value={workoutPeriod.seconds}
                selectClassName="w-24"
              />
            </div>

            <h3 className="text-2xl mb-5">Rest Time</h3>
            <div className="flex w-96 justify-between mb-10">
              <Select
                options={Array.from({ length: 24 }, (_, i) => i)}
                label="Hours"
                onChange={(e) => handlePeriodChange(e, "rest", "hours")}
                value={restPeriod.hours}
                selectClassName="w-24"
              />
              <Select
                options={Array.from({ length: 60 }, (_, i) => i)}
                label="Minutes"
                onChange={(e) => handlePeriodChange(e, "rest", "minutes")}
                value={restPeriod.minutes}
                selectClassName="w-24"
              />
              <Select
                options={Array.from({ length: 60 }, (_, i) => i)}
                label="Seconds"
                onChange={(e) => handlePeriodChange(e, "rest", "seconds")}
                value={restPeriod.seconds}
                selectClassName="w-24"
              />
            </div>

            <Input
              type="number"
              label="Rounds"
              placeholder="Rounds"
              min={1}
              value={rounds}
              className="mb-10"
              onChange={handleRoundsChange}
            />

            <button
              className="w-full btn btn-outline"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </div>
        ) : (
          <div>
            <div
              className={`radial-progress ${
                seconds
                  ? roundPeriod === "rest"
                    ? "text-success"
                    : "text-primary"
                  : ""
              }`}
              style={
                {
                  "--value": seconds
                    ? roundPeriod === "rest"
                      ? (seconds / restSeconds) * 100
                      : (seconds / workoutSeconds) * 100
                    : 0,
                  "--size": "24rem",
                  "--thickness": "2px",
                } as any
              }
            >
              {seconds != null ? (
                <div className="flex flex-col items-center">
                  <div className="text-2xl leading-loose">
                    {formatSeconds(seconds)}
                  </div>
                  <p className="leading-loose font-bold capitalize">
                    {roundPeriod}
                  </p>
                  <p className="leading-loose font-bold">
                    Rounds Left: {rounds - roundsCompleted}
                  </p>
                </div>
              ) : null}
            </div>

            <div className="mt-16 flex justify-center">
              <button
                className="btn btn-success btn-outline w-40"
                onClick={startOrStopTimer}
              >
                {timerState !== "running" ? "Start" : "Stop"}
              </button>
              <button
                className="btn btn-error btn-outline ml-4 w-40"
                onClick={resetTimer}
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}
