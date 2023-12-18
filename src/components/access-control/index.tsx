import { useEffect, useState } from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth, useRefreshToken } from "../../../sdk";

export const RequireAuth = () => {
  const {
    authStore: {
      authProfile: { username: user },
    },
  } = useAuth();

  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="sign-in" state={{ from: location }} replace />
  );
};

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const refresh = useRefreshToken();
  const {
    authStore: { accessToken },
  } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } finally {
        setIsLoading(false);
      }
    };

    !accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, [refresh, accessToken]);

  useEffect(() => {
    console.log("[isLOADING]: ", isLoading);
    console.log("[ACCESS TOKEN]: ", accessToken);
  }, [isLoading, accessToken]);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};
