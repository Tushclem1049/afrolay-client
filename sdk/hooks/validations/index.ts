import { ChangeEvent, useCallback, useMemo, useState } from "react";
import {
  EventErrors,
  SHIPMENT_FORM_VALIDATION_MESSAGES,
  ShipmentErrors,
  eventErrorsInitState,
  isValidDate,
  setErrorMessage,
  shipmentErrorsInitState,
} from "../../../sdk";

export const useShipmentInputsValidation = () => {
  const [shipmentErrors, setShipmentErrors] = useState<
    ShipmentErrors | EventErrors
  >(shipmentErrorsInitState);

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      switch (name) {
        case "fullName":
          if (value) {
            setErrorMessage("fullName", "", false, setShipmentErrors);
          } else {
            setErrorMessage(
              "fullName",
              SHIPMENT_FORM_VALIDATION_MESSAGES.Client_FullName,
              true,
              setShipmentErrors
            );
          }
          break;

        case "originAddress":
          if (value) {
            setErrorMessage("originAddress", "", false, setShipmentErrors);
          } else {
            setErrorMessage(
              "originAddress",
              SHIPMENT_FORM_VALIDATION_MESSAGES.Origin_Address,
              true,
              setShipmentErrors
            );
          }
          break;

        case "destinationAddress":
          if (value) {
            setErrorMessage("destinationAddress", "", false, setShipmentErrors);
          } else {
            setErrorMessage(
              "destinationAddress",
              SHIPMENT_FORM_VALIDATION_MESSAGES.Destination_Address,
              true,
              setShipmentErrors
            );
          }
          break;

        case "statusTimestamp":
          if (!value) {
            setErrorMessage(
              "deliveryTimestamp",
              SHIPMENT_FORM_VALIDATION_MESSAGES.Delivery_Timestamp,
              true,
              setShipmentErrors
            );
          } else if (isValidDate(value)) {
            setErrorMessage(
              "deliveryTimestamp",
              SHIPMENT_FORM_VALIDATION_MESSAGES.Invalid_Date,
              true,
              setShipmentErrors
            );
          } else {
            setErrorMessage("deliveryTimestamp", "", false, setShipmentErrors);
          }
          break;

        case "statusLocationAddress":
          if (value) {
            setErrorMessage("deliveryLocation", "", false, setShipmentErrors);
          } else {
            setErrorMessage(
              "deliveryLocation",
              SHIPMENT_FORM_VALIDATION_MESSAGES.Delivery_Address,
              true,
              setShipmentErrors
            );
          }
          break;

        case "statusDescription":
          if (value) {
            setErrorMessage(
              "deliveryDescription",
              "",
              false,
              setShipmentErrors
            );
          } else {
            setErrorMessage(
              "deliveryDescription",
              SHIPMENT_FORM_VALIDATION_MESSAGES.Delivery_Description,
              true,
              setShipmentErrors
            );
          }
          break;
      }
    },
    []
  );

  return {
    handleBlur,
    setShipmentErrors,
    shipmentErrors,
  };
};

// Events validaion
export const useShipmentEventsInputValidation = () => {
  const [eventErrors, setEventErrors] = useState<EventErrors | ShipmentErrors>(
    eventErrorsInitState
  );

  const handleEventInputBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      switch (name) {
        case "eventLocationAddress":
          if (value) {
            setErrorMessage("location", "", false, setEventErrors);
          } else {
            setErrorMessage(
              "location",
              SHIPMENT_FORM_VALIDATION_MESSAGES.Event_Location,
              true,
              setEventErrors
            );
          }
          break;

        case "timestamp":
          if (!value) {
            setErrorMessage(
              "timestamp",
              SHIPMENT_FORM_VALIDATION_MESSAGES.Event_Timestamp,
              true,
              setEventErrors
            );
          } else if (isValidDate(value)) {
            setErrorMessage(
              "timestamp",
              SHIPMENT_FORM_VALIDATION_MESSAGES.Invalid_Date,
              true,
              setEventErrors
            );
          } else {
            setErrorMessage("timestamp", "", false, setEventErrors);
          }

          break;

        case "description":
          if (value) {
            setErrorMessage("description", "", false, setEventErrors);
          } else {
            setErrorMessage(
              "description",
              SHIPMENT_FORM_VALIDATION_MESSAGES.Event_Description,
              true,
              setEventErrors
            );
          }
          break;
      }
    },
    []
  );

  const canEventBeSubmitted = useMemo(() => {
    return Object.values(eventErrors).every((error) => error.message === "");
  }, [eventErrors]);

  return {
    handleEventInputBlur,
    canEventBeSubmitted,
    eventErrors,
    setEventErrors,
  };
};
