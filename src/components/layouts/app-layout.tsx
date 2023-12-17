import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Outlet />
    </main>
  );
};

export default AppLayout;
