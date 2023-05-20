export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/api/v1"
    : "http://wrkouts.xyz/api/v1";

export const tokenExpiration = 60 * 60 * 24;
const userTimerWorkout = "/user/workouts/timer";
const workouts = "/workouts";

export const apiEndpoints = {
  me: baseURL + "/user/me",
  tokenPair: baseURL + "/token",
  oauthLogin: baseURL + "/oauth/login",
  forgotPassword: baseURL + "/forgotpassword",
  resetPassword: baseURL + "/resetpassword",
  login: baseURL + "/login",
  register: baseURL + "/register",
  userTimerWorkout: baseURL + userTimerWorkout,
  workouts: baseURL + workouts,
};
