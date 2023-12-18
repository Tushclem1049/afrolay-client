import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import axios from "../../../../../sdk/api/config/index";
import { AuthActions, useAuth } from "../../../../../sdk";
import { validateSignIn } from "./validation";

export interface SignInValues {
  password: string;
  email: string;
}

export const useSignInForm = () => {
  const { authDispatch } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik<SignInValues>({
    initialValues: { email: "", password: "" },
    validate: validateSignIn,
    validateOnChange: false,

    onSubmit: async (values, fn) => {
      const payload = { email: values.email, password: values.password };
      authDispatch({ type: AuthActions.START_LOADING });

      try {
        const { data } = await axios.post("/auth/sign-in", payload);
        const storePayload = {
          data: data?.data?.user,
          accessToken: data?.data?.accessToken,
        };
        authDispatch({ type: AuthActions.SET_AUTH, payload: storePayload });
        toast.success(data?.message);
        authDispatch({
          type: AuthActions.END_LOADING,
        });

        fn.resetForm();

        // redirect to dashboard
        navigate("/dashboard/shipment");
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
