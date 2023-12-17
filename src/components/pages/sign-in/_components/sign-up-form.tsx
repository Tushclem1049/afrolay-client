import { useRef, useState } from "react";
import { Mail, EyeOff, Eye, Loader2, User2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../../../../sdk";
import { useSignUpForm } from "../lib";
import { cn } from "@/lib/utils";

export const SignUpForm = ({
  handleClick,
}: {
  handleClick: (tab: "login" | "sign-up") => void;
}) => {
  const [isVisible, setisVisible] = useState({ nP: false, cP: false });
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const cPasswordInputRef = useRef<HTMLInputElement>(null);

  if (passwordInputRef?.current) {
    passwordInputRef.current.type = isVisible.nP ? "text" : "password";
  }

  if (cPasswordInputRef?.current) {
    cPasswordInputRef.current.type = isVisible.cP ? "text" : "password";
  }

  const toggleVisibility = (p: "nP" | "cP") => {
    p === "nP" && setisVisible((current) => ({ ...current, nP: !current.nP }));
    p === "cP" && setisVisible((current) => ({ ...current, cP: !current.cP }));
  };

  const {
    authStore: {
      state: { loading },
    },
  } = useAuth();

  const formik = useSignUpForm();

  return (
    <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
      <div>
        <p className="relative bg-slate-100 pr-10">
          <span className="absolute right-0 bottom-1/2 transform translate-y-1/2 grid place-items-center w-10 bg-orange-400 h-full">
            <User2 className="text-white w-5 h-5" />
          </span>
          <input
            type="username"
            name="username"
            autoComplete="on"
            className={cn(
              "w-full p-2 text-sm border-none bg-transparent outline-none",
              formik.touched.username &&
                formik.errors.username &&
                "ring-2 ring-red-800"
            )}
            placeholder="Username"
            required
            aria-required
            value={formik.values.username}
            onChange={formik.handleChange}
          />
        </p>
      </div>
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
            className={cn(
              "w-full p-2 text-sm border-none bg-transparent outline-none",
              formik.touched.email &&
                formik.errors.email &&
                "ring-2 ring-red-800"
            )}
            placeholder="Email@example.com"
            required
            aria-required
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </p>
      </div>
      <div>
        <p className="relative bg-slate-100 pr-10">
          <span className="absolute right-0 bottom-1/2 transform translate-y-1/2 grid place-items-center w-10 bg-orange-400 h-full">
            {isVisible.nP ? (
              <EyeOff
                className="text-white w-5 h-5 cursor-pointer"
                onClick={() => toggleVisibility("nP")}
              />
            ) : (
              <Lock
                className="text-white w-5 h-5 cursor-pointer"
                onClick={() => toggleVisibility("nP")}
              />
            )}
          </span>

          <input
            type="password"
            name="newPassword"
            autoComplete="on"
            className={cn(
              "w-full p-2 text-sm border-none bg-transparent outline-none select-none",
              formik.touched.newPassword &&
                formik.errors.newPassword &&
                "ring-2 ring-red-800"
            )}
            placeholder="New password"
            ref={passwordInputRef}
            required
            aria-required
            value={formik.values.newPassword}
            onChange={formik.handleChange}
          />
        </p>
      </div>
      <div>
        <p className="relative bg-slate-100 pr-10">
          <span className="absolute right-0 bottom-1/2 transform translate-y-1/2 grid place-items-center w-10 bg-orange-400 h-full">
            {isVisible.cP ? (
              <EyeOff
                className="text-white w-5 h-5 cursor-pointer"
                onClick={() => toggleVisibility("cP")}
              />
            ) : (
              <Eye
                className="text-white w-5 h-5 cursor-pointer"
                onClick={() => toggleVisibility("cP")}
              />
            )}
          </span>

          <input
            type="password"
            name="confirmPassword"
            autoComplete="on"
            className={cn(
              "w-full p-2 text-sm border-none bg-transparent outline-none select-none",
              formik.touched.confirmPassword &&
                formik.errors.confirmPassword &&
                "ring-2 ring-red-800"
            )}
            placeholder="Confirm password"
            ref={cPasswordInputRef}
            required
            aria-required
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
        </p>
      </div>
      <div>
        <p className="text-white text-[13px]">
          <span>Already have an account?</span>
          <Button
            variant="link"
            className=" text-orange-500"
            onClick={() => handleClick("login")}
            type="submit"
          >
            Login.
          </Button>
        </p>
      </div>
      <div>
        <Button
          className="w-full rounded-none bg-orange-400/75 hover:bg-orange-400  disabled:cursor-not-allowed disabled:bg-orange-400"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span>Sign Up</span>
          )}
        </Button>
      </div>
    </form>
  );
};
