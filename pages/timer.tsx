import { useEffect, useState } from "react";

import Page from "@/components/Page";

export default function Timer() {
  const [seconds, setSeconds] = useState<null | number>(10);
  const [timerState, setTimerState] = useState<"stopped" | "running">(
    "stopped"
  );

  useEffect(() => {
    let interval: undefined | NodeJS.Timeout = undefined;

    if (timerState === "running" && seconds)
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    else if (timerState === "stopped") clearInterval(interval);

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
    setSeconds(10);
  };

  return (
    <Page title="Workout Timer" content="Workout timer for your workouts.">
      <div className="flex justify-center pt-20">
        <div>
          <div className="flex flex-col items-center">{seconds}</div>

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
      </div>
    </Page>
  );
}
