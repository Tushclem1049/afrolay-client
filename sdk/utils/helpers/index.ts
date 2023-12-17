import { Dispatch, SetStateAction } from "react";
import { EventErrors, ShipmentErrors } from "../../../sdk";

// Type guard function
export const isValidDate = (value: any): value is Date => {
  return value instanceof Date || !isNaN(value);
};

// Type guard function
export const isEventErrors = (
  errors: EventErrors | ShipmentErrors
): errors is EventErrors => {
  return Object.keys(errors).includes("location");
};

export const setErrorMessage = (
  name: string,
  message: string,
  showErrorMessage: boolean,
  setErrors: Dispatch<SetStateAction<EventErrors | ShipmentErrors>>
) => {
  setErrors((prevErrors: EventErrors | ShipmentErrors) => {
    if (isEventErrors(prevErrors)) {
      return {
        ...prevErrors,
        [name]: {
          ...prevErrors[name as keyof EventErrors],
          message,
          showErrorMessage,
        },
      };
    }

    return {
      ...prevErrors,
      [name]: {
        ...prevErrors[name as keyof ShipmentErrors],
        message,
        showErrorMessage,
      },
    };
  });
};

// Resetting errors
export const resetErrors = (
  setErrors: Dispatch<SetStateAction<EventErrors | ShipmentErrors>>,
  errors: EventErrors | ShipmentErrors
) => {
  if (isEventErrors(errors)) {
    setErrors({
      location: {
        message: "",
        showErrorMessage: false,
      },
      description: {
        message: "",
        showErrorMessage: false,
      },
      timestamp: {
        message: "",
        showErrorMessage: false,
      },
    });
  } else {
    setErrors({
      fullName: {
        message: "",
        showErrorMessage: false,
      },
      email: {
        message: "",
        showErrorMessage: false,
      },
      originAddress: {
        message: "",
        showErrorMessage: false,
      },
      destinationAddress: {
        message: "",
        showErrorMessage: false,
      },
      deliveryTimestamp: {
        message: "",
        showErrorMessage: false,
      },
      deliveryLocation: {
        message: "",
        showErrorMessage: false,
      },
      deliveryDescription: {
        message: "",
        showErrorMessage: false,
      },
    });
  }
};

export const isEmailValid = (email: string): boolean => {
  // Regular expression for validating an Email
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};
