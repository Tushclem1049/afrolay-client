import { Dispatch } from "react";
import { TAuth } from "../auth";
import { TAuthAction } from "../actions";

export type TAuthContext = {
  authStore: TAuth;
  authDispatch: Dispatch<TAuthAction>;
};
