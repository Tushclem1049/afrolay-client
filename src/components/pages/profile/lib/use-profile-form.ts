import { toast } from "sonner";

import { AuthActions, useAuth, useAxiosPrivate } from "../../../../../sdk";
import { FormEvent } from "react";

export interface ProfileFormPayload {
  username?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  avatar: File | string;
}
export const useProfileForm = () => {
  const { authDispatch } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    value: ProfileFormPayload
  ) => {
    e.preventDefault();
    if (!value.email?.trim()) {
      return toast.error("Email cannot be empty");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
      return toast.error("Invalid email address");
    }

    if (!value.username?.trim()) {
      return toast.error("Username cannot be empty");
    } else if (value.username.length < 3) {
      return toast.error("Username should have atleast three characters");
    }

    if (value.newPassword?.trim()) {
      if (value.newPassword.length < 6) {
        return toast.error("Password must have at least six characters");
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(value.newPassword)
      ) {
        return toast.error(
          "At least one number, a symbol, uppercase and lowercase letters are required."
        );
      } else if (value.newPassword !== value.confirmPassword) {
        return toast.error("Passwords do not match");
      }
    }

    const {
      confirmPassword,
      email,
      newPassword,
      oldPassword,
      username,
      avatar,
    } = value;

    let payload: Partial<ProfileFormPayload> = {
      username,
      email,
    };

    if (oldPassword?.trim()) {
      payload = {
        ...payload,
        oldPassword: oldPassword,
      };
    }

    if (newPassword?.trim()) {
      if (!confirmPassword?.trim()) {
        return toast.error("Please confirm your new password");
      }
    }

    if (newPassword?.trim()) {
      payload = {
        ...payload,
        newPassword: newPassword,
      };
    }

    if (confirmPassword?.trim()) {
      payload = {
        ...payload,
        confirmPassword: confirmPassword,
      };
    }

    if (value.avatar instanceof File) {
      payload = {
        ...payload,
        avatar: avatar as File,
      };
    }

    console.log(payload);

    /** Handle form submission */
    authDispatch({ type: AuthActions.START_LOADING });

    try {
      const { data } = await axiosPrivate.patch("/user", payload, {
        withCredentials: true,
      });

      authDispatch({
        type: AuthActions.SET_AUTH,
        payload: {
          profile: data?.data?.user,
          token: data?.data?.accessToken,
        },
      });
      toast.success(data?.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);

      authDispatch({
        type: AuthActions.SET_ERROR,
        payload: error?.response?.data?.message,
      });
    }
  };

  return handleSubmit;
};
