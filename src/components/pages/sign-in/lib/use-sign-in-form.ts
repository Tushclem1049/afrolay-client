import { useFormik } from "formik";

import axios from "../../../../../sdk/api/config/index";
import { AuthActions, useAuth } from "../../../../../sdk";
import { validateSignIn } from "./validation";
import { toast } from "sonner";

export interface SignInValues {
  password: string;
  email: string;
}

export const useSignInForm = () => {
  const { authDispatch } = useAuth();

  const formik = useFormik<SignInValues>({
    initialValues: { email: "", password: "" },
    validate: validateSignIn,
    validateOnChange: false,

    onSubmit: async (values, fn) => {
      const payload = { email: values.email, password: values.password };
      authDispatch({ type: AuthActions.START_LOADING });

      try {
        const res = await axios.post("/auth/sign-in", payload);
        console.log(res);
        // authDispatch({ type: AuthActions.SET_AUTH });
        toast.success(res.data?.message);
        authDispatch({
          type: AuthActions.END_LOADING,
        });

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
