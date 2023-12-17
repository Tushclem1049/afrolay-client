import { TAuthContext } from "../../sdk";

export const AuthProviderInitState: TAuthContext = {
  authStore: {
    auth: {
      data: { email: "", username: "", avatar: "" },
      accessToken: "",
    },

    state: {
      loading: false,
      error: false,
      errorMessage: null,
      success: false,
    },
  },

  persistLogin: false,

  authDispatch: () => null,
  setPersistLogin: () => null,
};
