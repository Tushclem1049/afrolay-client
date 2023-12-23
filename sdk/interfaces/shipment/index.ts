// single event
export type TEvent = {
  _id?: string;

  eventId: string;

  timestamp: string;

  location: {
    address: {
      addressLocality: string;
    };
  };

  description: string;
};

export type EventErrors = {
  location: {
    message: string;
    showErrorMessage: boolean;
  };
  timestamp: {
    message: string;
    showErrorMessage: boolean;
  };
  description: {
    message: string;
    showErrorMessage: boolean;
  };
};

// all shipment events
export type TEvents = TEvent[];

// single shipment
export type TShipment = {
  _id?: string;

  createdAt?: string;

  updatedAt?: string;

  __v?: string;

  belongsTo: {
    fullName: string;
    email: string;
    country: string;
    checkout: boolean;
  };

  trackingId: string;

  origin: {
    address: {
      addressLocality: string;
    };
  };

  destination: {
    address: {
      addressLocality: string;
    };
  };

  status: {
    timestamp: string;

    location: {
      address: {
        addressLocality: string;
      };
    };

    status: "pending" | "seized" | "delivered" | "shipping";

    description: string;

    bill?: number | undefined;
  };

  events: TEvents;
};

// all shipments
export type TShipments = TShipment[] | [];

export type ShipmentErrors = {
  fullName: { message: string; showErrorMessage: boolean };

  email: { message: string; showErrorMessage: boolean };

  originAddress: {
    message: string;
    showErrorMessage: boolean;
  };

  destinationAddress: {
    message: string;
    showErrorMessage: boolean;
  };

  deliveryTimestamp: {
    message: string;
    showErrorMessage: boolean;
  };

  deliveryLocation: {
    message: string;
    showErrorMessage: boolean;
  };

  deliveryDescription: {
    message: string;
    showErrorMessage: boolean;
  };
};

export type APIAllShipResponse = {
  shipments: TShipments;
};

export type APISingleShipResponse = {
  shipment: TShipment;
};

export type APIResponseMessage = {
  message: string;
};
