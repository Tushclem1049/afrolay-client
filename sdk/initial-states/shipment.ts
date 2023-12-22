import {
  EventErrors,
  SHIPMENT_FORM_VALIDATION_MESSAGES,
  ShipmentErrors,
  TEvent,
  TShipment,
} from "../../sdk";

export const shipmentInitState: TShipment = {
  belongsTo: {
    fullName: "",
    email: "",
    country: "",
    checkout: false,
  },

  trackingId: "",

  origin: {
    address: {
      addressLocality: "",
    },
  },

  destination: {
    address: {
      addressLocality: "",
    },
  },

  status: {
    timestamp: "",

    location: {
      address: {
        addressLocality: "",
      },
    },

    status: "pending",

    description: "",

    bill: "",
  },
  events: [],
};

export const shipmentEventInitState: TEvent = {
  eventId: "",

  timestamp: "",

  location: {
    address: {
      addressLocality: "",
    },
  },

  description: "",
};

export const eventErrorsInitState: EventErrors = {
  location: {
    message: SHIPMENT_FORM_VALIDATION_MESSAGES.Event_Location,
    showErrorMessage: false,
  },

  description: {
    message: SHIPMENT_FORM_VALIDATION_MESSAGES.Event_Description,
    showErrorMessage: false,
  },

  timestamp: {
    message: SHIPMENT_FORM_VALIDATION_MESSAGES.Event_Timestamp,
    showErrorMessage: false,
  },
};

export const shipmentErrorsInitState: ShipmentErrors = {
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
};
