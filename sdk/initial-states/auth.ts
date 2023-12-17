import { TAuth } from "../../sdk";

export const AuthInitState: TAuth = {
  auth: {
    user: "",
    email: "",
    imgUrl: "",
    accessToken: "",
  },

  state: {
    loading: false,
    error: false,
    errorMessage: null,
    success: false,
  },
};
