import axios from "../api/config";
import { AuthActions } from "../constants";
import { useAuth } from ".";

export const useRefreshToken = () => {
  const {
    authDispatch,
    authStore: { accessToken },
  } = useAuth();

  const refresh = async () => {
    try {
      const { data } = await axios.get("/auth/refresh-token", {
        withCredentials: true,
      });

      const token: string = data?.data?.accessToken;

      console.log("[OLD TOKEN]: ", accessToken);
      console.log("[NEW TOKEN]: ", token);

      authDispatch({ type: AuthActions.SET_TOKEN, payload: token });

      return token;
    } catch (error) {
      console.log("[REFRESH ERROR]: ", error);
    }
  };

  return refresh;
};
