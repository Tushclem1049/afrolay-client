import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, Mail } from "lucide-react";
import { useAuth } from "../../../../../sdk";
import { useEmailForm } from "../lib";

export const EmailForm = ({
  toggleForms,
}: {
  toggleForms: (form: "email" | "otp") => void;
}) => {
  const {
    authStore: {
      state: { loading },
    },
  } = useAuth();

  const formik = useEmailForm(toggleForms);

  return (
    <form className="my-4 p-4 flex flex-col" onSubmit={formik.handleSubmit}>
      <small className="text-center text-slate-200 mb-4">
        Please enter your email address. We will send you an email with a code
        to reset your password.
      </small>

      <p className="relative bg-transarent pr-10 border border-slate-300/30">
        <span className="absolute right-0 bottom-1/2 transform translate-y-1/2 grid place-items-center w-10 bg-orange-400 h-full">
          <Mail className="text-white w-5 h-5" />
        </span>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="on"
          className={cn(
            "w-full p-2 text-sm border-none bg-transparent outline-none text-white backdrop-blur-[4px]",
            formik.touched.email && formik.errors.email && "ring-2 ring-red-800"
          )}
          placeholder="Email@example.com"
          required
          aria-required
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </p>
      <div className="mt-4">
        <Button
          className="w-full rounded-none bg-orange-400/80 hover:bg-orange-400/90 disabled:cursor-not-allowed disabled:bg-orange-400"
          disabled={loading}
          type="submit"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span>Let's Go</span>
          )}
        </Button>
      </div>
    </form>
  );
};
