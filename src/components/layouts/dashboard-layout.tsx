import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const DashBoardLayout = () => {
  return (
    <div>
      <Toaster />
      <Outlet />
    </div>
  );
};

export default DashBoardLayout;
