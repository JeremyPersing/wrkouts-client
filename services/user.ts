import { apiEndpoints } from "@/constants";
import axios from "axios";

export const getMe = async (accessToken: string | undefined) => {
  try {
    if (!accessToken) return;

    const { data } = await axios.get(apiEndpoints.me, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (data) alert(data);
    else alert("Can't get data");
  } catch (error) {
    alert(JSON.stringify(error));
  }
};
