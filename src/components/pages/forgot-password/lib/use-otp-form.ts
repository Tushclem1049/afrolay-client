import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "sonner";

import axios from "../../../../../sdk/api/config/index";
import { AuthActions, useAuth } from "../../../../../sdk";
import { validateOtp } from "./validation";

export interface OtpPayload {
  otp: string;
}

export const useOtpForm = () => {
  const { authDispatch } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik<OtpPayload>({
    initialValues: { otp: "" },
    validate: validateOtp,
    validateOnChange: false,

    onSubmit: async (values, fn) => {
      authDispatch({ type: AuthActions.START_LOADING });
      console.log(values);

      try {
        const { data } = await axios.post("/verify-token", values);

        localStorage.setItem(
          "reset_token",
          JSON.stringify(data?.data?.reset_access_token)
        );

        toast.success(data?.message);

        fn.resetForm();
        navigate("/account/reset-password");
      } catch (error: any) {
        toast.error(error?.response?.data?.message);

        authDispatch({
          type: AuthActions.SET_ERROR,
          payload: error?.response?.data?.message,
        });
      } finally {
        authDispatch({ type: AuthActions.END_LOADING });
      }
    },
  });

  return formik;
};
