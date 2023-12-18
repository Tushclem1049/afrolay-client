import { ArrowLeftCircle, FileDigit, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useAuth } from "../../../../../sdk";
import { useOtpForm } from "../lib";

export const OtpForm = ({
  toggleForms,
}: {
  toggleForms: (form: "email" | "otp") => void;
}) => {
  const {
    authStore: {
      state: { loading },
    },
  } = useAuth();

  const message = JSON.parse(localStorage.getItem("otp_msg")!);

  const formik = useOtpForm();

  return (
    <form className="my-4 p-4 flex flex-col">
      <small className="text-center text-slate-200 mb-4">
        {message || "Enter the 6 digit OTP that was sent to your email"}
      </small>

      <p className="relative bg-transarent pr-10 border border-slate-300/30">
        <span className="absolute right-0 bottom-1/2 transform translate-y-1/2 grid place-items-center w-10 bg-orange-400 h-full">
          <FileDigit className="text-white w-5 h-5" />
        </span>
        <input
          type="number"
          name="otp"
          className={cn(
            "w-full p-2 text-sm border-none bg-transparent outline-none text-white backdrop-blur-[4px] hide-scroll",
            formik.touched.otp && formik.errors.otp && "ring-2 ring-red-800"
          )}
          placeholder="OTP"
          required
          aria-required
          value={formik.values.otp as number}
          onChange={formik.handleChange}
        />
      </p>
      <div className="mt-4">
        <Button
          className="w-full rounded-none bg-orange-400/80 hover:bg-orange-400/90 disabled:cursor-not-allowed disabled:bg-orange-400"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span>Let's Go</span>
          )}
        </Button>
      </div>

      <div>
        <Button
          className="text-muted/60 text-[12px] font-normal hover:no-underline"
          variant={"link"}
          onClick={() => toggleForms("email")}
        >
          Wrong email?
          <ArrowLeftCircle className="text-muted/60 h-5 w-5 ml-1" />
        </Button>
      </div>
    </form>
  );
};
