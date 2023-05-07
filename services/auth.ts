import axios from "axios";

import { apiEndpoints } from "@/constants";

export const loginOrRegisterUser = async (
  type: "login" | "register",
  email: string | undefined,
  password: string | undefined
) => {
  try {
    let url = "";
    if (type === "login") url = apiEndpoints.login;
    else if (type === "register") url = apiEndpoints.register;

    if (!url || !email || !password) return null;

    const { data } = await axios.post(url, { email, password });

    if (data) return data;

    return null;
  } catch (error) {
    return null;
  }
};

export const loginOAuthUser = async (
  token: string | undefined,
  provider: string
) => {
  try {
    if (!token) return null;

    const { data } = await axios.post(apiEndpoints.oauthLogin, {
      token,
      provider,
    });

    if (!data) return null;

    return data;
  } catch (error: any) {
    return null;
  }
};

export const getRefreshedTokenPair = async (token: any) => {
  try {
    const authHeader = `Bearer ${token.refreshToken}`;

    const { data } = await axios.post(
      apiEndpoints.tokenPair,
      {}, // Don't forget this ;), or you'll waste hours debugging like me
      {
        headers: {
          Authorization: authHeader,
        },
      }
    );

    if (!data) throw new Error("Unable to retrieve tokens");

    token.refreshToken = data.refreshToken;
    token.accessToken = data.accessToken;

    return { ...token };
  } catch (error: any) {
    return { ...token, error: "RefreshAccessTokenError" as const };
  }
};

export const submitForgotPassword = async (email: string) => {
  try {
    const { data } = await axios.post<{ message: string; emailSent: boolean }>(
      apiEndpoints.forgotPassword,
      { email }
    );

    return data;
  } catch (error) {
    return null;
  }
};

export const resetPassword = async ({
  password,
  passwordRepeat,
  token,
}: {
  password: string;
  passwordRepeat: string;
  token: string;
}) => {
  try {
    const { data } = await axios.post(
      apiEndpoints.resetPassword,
      { password, passwordRepeat },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    return null;
  }
};
