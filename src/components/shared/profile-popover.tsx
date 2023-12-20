import { Link, useNavigate } from "react-router-dom";
import { User2 } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { useLogout } from "../../../sdk";
import { Clock } from ".";

interface PopoverProps {
  children: React.ReactNode;
  side?: "right" | "left" | "bottom" | "top";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export function PropfilePopover({
  children,
  align,
  side,
  sideOffset = 0,
}: PopoverProps) {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-64 pt-3"
        align={align}
        side={side}
        sideOffset={sideOffset}
      >
        <div className="flex flex-col gap-y-4 pt-1 items-center">
          <Link to={"/dashboard/profile"} className="w-full">
            <p className="flex items-center justify-center">
              <User2 className="w-5 h-5 mr-2 text-orange-600" />{" "}
              <span className="font-medium">Edit Profile</span>
            </p>
          </Link>

          <Button
            className="w-full ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-offset-0"
            onClick={signOut}
          >
            Logout
          </Button>

          <div className="pt-2 mt-2 border-t w-full justify-center flex sm:hidden">
            <Clock />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
