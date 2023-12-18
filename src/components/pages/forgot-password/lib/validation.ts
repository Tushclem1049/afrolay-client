import { toast } from "sonner";

import { ResetPayload, OtpPayload } from ".";

/**
 * Validation function for reset password email form
 * @param {ResetPayload} values
 * @returns Validation errors
 */
export const validateEmail = (values: ResetPayload) => {
  const errors: Partial<ResetPayload> = {};

  if (!values.email.trim()) {
    errors.email = toast.error("Email is required") as string;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = toast.error("Invalid email address") as string;
  }

  return errors;
};

/**
 * Validation function for OTP form
 * @param {OtpPayload} values
 * @returns Validation errors
 */
export const validateOtp = (values: OtpPayload) => {
  const errors: Partial<OtpPayload> = {};

  if (!values.otp) {
    errors.otp = toast.error("Enter the OTP sent to your email") as number;
  }

  return errors;
};
