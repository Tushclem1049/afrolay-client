import { useFormik } from "formik";
import { toast } from "sonner";

import axios from "../../../../../sdk/api/config/index";
import { AuthActions, useAuth } from "../../../../../sdk";
import { validateEmail } from "./validation";

export interface ResetPayload {
  email: string;
}

export const useEmailForm = (toggleForms: (form: "email" | "otp") => void) => {
  const { authDispatch } = useAuth();

  const formik = useFormik<ResetPayload>({
    initialValues: { email: "" },
    validate: validateEmail,
    validateOnChange: false,

    onSubmit: async (values, fn) => {
      authDispatch({ type: AuthActions.START_LOADING });

      try {
        const { data } = await axios.post("/forgot-password", values);

        localStorage.setItem("otp_msg", JSON.stringify(data?.messgae));
        toast.success(data?.message);

        toggleForms("otp");

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
