import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const AuthLayout = () => {
  return (
    <>
      <Toaster expand={true} closeButton={true} />
      <Outlet />
    </>
  );
};

export default AuthLayout;
