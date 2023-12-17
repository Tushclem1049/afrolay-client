import { TAuth } from "../../sdk";

export const AuthInitState: TAuth = {
  auth: {
    data: {
      username: "",
      email: "",
      avatar: "",
    },
    accessToken: "",
  },

  state: {
    loading: false,
    error: false,
    errorMessage: null,
    success: false,
  },
};
