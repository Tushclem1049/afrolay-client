import { Logo, SideBarRoutes } from ".";

export const SideBar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-4">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <SideBarRoutes />
      </div>
    </div>
  );
};
