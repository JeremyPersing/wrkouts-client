import { apiEndpoints } from "@/constants";
import { User } from "@/types/User";
import axios from "axios";

export const getMe = async (accessToken: string | undefined) => {
  try {
    if (!accessToken) return;

    const { data } = await axios.get<User>(apiEndpoints.me, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    return null;
  }
};
