import { AuthInitState, TAuthContext } from "../../sdk";

export const AuthProviderInitState: TAuthContext = {
  authStore: AuthInitState,
  persistLogin: false,
  authDispatch: () => null,
  setPersistLogin: () => null,
};
