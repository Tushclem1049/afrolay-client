import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../sdk";

export const RequireAuth = () => {
  const {
    authStore: {
      auth: {
        data: { username: user },
      },
    },
  } = useAuth();

  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="auth/sign-in" state={{ from: location }} replace />
  );
};
