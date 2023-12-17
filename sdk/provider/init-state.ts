import { TAuthContext } from "../../sdk";

export const AuthProviderInitState: TAuthContext = {
  authStore: {
    auth: {
      user: "Somto",
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
  },
  authDispatch: () => null,
};
