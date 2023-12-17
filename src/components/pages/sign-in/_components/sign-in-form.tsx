import { useRef, useState } from "react";
import { Mail, EyeOff, Eye, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../../../../sdk";

export const SignInForm = () => {
  const [isVisible, setisVisible] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  if (passwordInputRef?.current) {
    passwordInputRef.current.type = isVisible ? "text" : "password";
  }

  const toggleVisibility = () => {
    setisVisible((current) => !current);
  };

  const {
    authStore: {
      state: { loading },
    },
  } = useAuth();

  return (
    <form className="flex flex-col gap-4">
      <div>
        <p className="relative bg-slate-100 pr-10">
          <span className="absolute right-0 bottom-1/2 transform translate-y-1/2 grid place-items-center w-10 bg-orange-400 h-full">
            <Mail className="text-white w-5 h-5" />
          </span>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="on"
            className="w-full p-2 text-sm border-none bg-transparent outline-none"
            placeholder="Your_email@example.com"
          />
        </p>
      </div>
      <div>
        <p className="relative bg-slate-100 pr-10">
          <span className="absolute right-0 bottom-1/2 transform translate-y-1/2 grid place-items-center w-10 bg-orange-400 h-full">
            {isVisible ? (
              <EyeOff
                className="text-white w-5 h-5 cursor-pointer"
                onClick={toggleVisibility}
              />
            ) : (
              <Eye
                className="text-white w-5 h-5 cursor-pointer"
                onClick={toggleVisibility}
              />
            )}
          </span>

          <input
            type="password"
            name="password"
            id="password"
            autoComplete="on"
            className="w-full p-2 text-sm border-none bg-transparent outline-none"
            placeholder="Your password"
            ref={passwordInputRef}
          />
        </p>
      </div>
      <div className="flex justify-between items-center py-2">
        <p className="text-white flex gap-2 items-center">
          <input
            type="checkbox"
            name="rememberMe"
            id="rememberMe"
            className=""
          />
          <label htmlFor="rememberMe" className="cursor-pointer text-[14px]">
            Remember me
          </label>
        </p>
        <p className="text-white text-[13px]">
          <Link
            to="/account/forgot-password"
            className="hover:text-white/75 transition"
          >
            Forgot Password?
          </Link>
        </p>
      </div>
      <div>
        <Button
          className="w-full rounded-none bg-orange-400/75 hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-orange-400"
          disabled={loading}
        >
          {loading ? <Loader2 /> : <span>Login</span>}
        </Button>
      </div>
    </form>
  );
};
