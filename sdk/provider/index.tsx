import { ReactNode, useEffect, useReducer, useState } from "react";
import { AuthContext } from "./context";
import { AuthInitState, authReducer } from "../../sdk";

export const AuthProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [authStore, authDispatch] = useReducer(authReducer, AuthInitState);
  const [persistLogin, setPersistLogin] = useState<boolean>(
    JSON.parse(localStorage.getItem("persist")!) || false
  );

  useEffect(() => {
    console.log(authStore.accessToken);
  }, [authStore]);

  return (
    <AuthContext.Provider
      value={{ authStore, authDispatch, persistLogin, setPersistLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
