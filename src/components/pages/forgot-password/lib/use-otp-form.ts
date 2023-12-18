import { useFormik } from "formik";
import { toast } from "sonner";

import axios from "../../../../../sdk/api/config/index";
import { AuthActions, useAuth } from "../../../../../sdk";
import { validateOtp } from "./validation";

export interface OtpPayload {
  otp: number | null;
}

export const useOtpForm = () => {
  const { authDispatch } = useAuth();

  const formik = useFormik<OtpPayload>({
    initialValues: { otp: null },
    validate: validateOtp,
    validateOnChange: false,

    onSubmit: async (values, fn) => {
      authDispatch({ type: AuthActions.START_LOADING });

      try {
        const { data } = await axios.post("/verify-token", values);

        localStorage.setItem(
          "reset_token",
          JSON.stringify(data?.data?.reset_access_token)
        );

        toast.success(data?.message);

        fn.resetForm();
      } catch (error: any) {
        toast.error(error?.response?.data?.message);

        authDispatch({
          type: AuthActions.SET_ERROR,
          payload: error?.response?.data?.message,
        });
      }
    },
  });

  return formik;
};
