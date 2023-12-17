import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../sdk";

export const RequireAuth = () => {
  const {
    authStore: { auth },
  } = useAuth();

  const location = useLocation();

  return true ? (
    <Outlet />
  ) : (
    <Navigate to="auth/sign-in" state={{ from: location }} replace />
  );
};
