import { Clock, MobileSideBar, ProfilePopover } from ".";
import { useAuth } from "../../../sdk";

export const NavBar = () => {
  const {
    authStore: { authProfile },
  } = useAuth();
  return (
    <nav className="p-4 border-b border-orange-300/50 h-full flex items-center bg-white">
      <div className="items-center flex gap-x-4 justify-between w-full">
        <div className="flex md:hidden">
          <MobileSideBar />
        </div>
        <div className="shrink-0 flex gap-x-12 items-center px-4 md:justify-between md:w-full justify-between">
          <div className="hidden sm:block">
            <Clock />
          </div>
          <ProfilePopover>
            <div className="w-[46px] h-[46px] rounded-full shrink-0">
              <img
                src={authProfile.avatar || "/user2.jpg"}
                alt="avatar"
                className="w-full h-full rounded-full object-cover"
                role="button"
              />
            </div>
          </ProfilePopover>
        </div>
      </div>
    </nav>
  );
};
