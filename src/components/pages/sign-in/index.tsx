import { useState } from "react";

import { cn } from "@/lib/utils";

import { SignInForm } from "./_components/sign-in-form";
import { SignUpForm } from "./_components/sign-up-form";

const SignInPage = () => {
  const [active, setActive] = useState<"login" | "sign-up">("login");

  const handleClick = (tab: "login" | "sign-up") => {
    setActive(tab);
  };

  return (
    <div
      className="flex items-center justify-center p-6 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('bg-03.jpg')" }}
    >
      <div className="w-full max-w-[420px] mx-auto border border-slate-300/30 bg-black/30 shadow-md  backdrop-blur-[6px] flex flex-col">
        <div className="flex">
          <div
            className={cn(
              "flex-1 shrink-0 flex justify-center items-center border-b border-slate-300/30",
              active === "login" && "border-orange-400"
            )}
          >
            <p
              className={cn(
                "text-[14px] text-slate-300 w-full flex justify-center items-center cursor-pointer px-4 py-3",
                active === "login" && "text-orange-400 cursor-default"
              )}
              onClick={() => handleClick("login")}
            >
              Login
            </p>
          </div>
          <div
            className={cn(
              "flex-1 shrink-0 flex justify-center items-center border-b border-slate-300/30",
              active === "sign-up" && "border-orange-400"
            )}
          >
            <p
              className={cn(
                "text-[14px] text-slate-300 w-full flex justify-center items-center cursor-pointer px-4 py-3",
                active === "sign-up" && "text-orange-400 cursor-default"
              )}
              onClick={() => handleClick("sign-up")}
            >
              Sign Up
            </p>
          </div>
        </div>
        <div className="w-full my-6 p-4">
          {active === "login" ? (
            <SignInForm />
          ) : (
            <SignUpForm handleClick={handleClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

{
  /* <div className="hidden sm:flex bg-sky-700 flex-1 bg-cover bg-center bg-no-repeat bg-gradient-to-br from-black to-white sign-in-gradient flex-col items-center justify-center p-4">
  <div className="p-4 rounded-2xl bg-black/25 shadow-md px-8 backdrop-blur-md border border-slate-100/25">
    <h2 className="font-bold text-3xl md:text-5xl lg:text-6xl text-white text-center">
      Dashboard.
    </h2>
  </div>
  <p className="text-yellow-300 mt-1 text-sm text-center italic">
    The best plans begin on a board... Be in charge today!
  </p>
</div> */
}
