import { ReactNode, useReducer } from "react";
import { AuthContext } from "./context";
import { AuthInitState, authReducer } from "../../sdk";

export const AuthProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [authStore, authDispatch] = useReducer(authReducer, AuthInitState);

  return (
    <AuthContext.Provider value={{ authStore, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
