import {
  ChangeEvent,
  FormEvent,
  useState,
  useCallback,
  useEffect,
} from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

import {
  ShipmentErrors,
  TEvent,
  TShipment,
  changeToLocalDatetime,
  shipmentEventInitState,
  shipmentInitState,
  useShipmentInputsValidation,
} from "../../sdk";

export const useEditShipForm = (__shipment: TShipment) => {
  const [shipment, setShipment] = useState<TShipment>(shipmentInitState);

  // Before committing shipment to state, reformat time to avoid format descripancies, warnings, and potential bugs. Basically, timestamp format returned from database includes seconds, whereas in the datetime-local input type, the seconds is optional/not-included. So filling such inputs with values that are not supported causes some issues. Example, from datetime-local input type, we return '2023-10-21T15:47' format, whereas, from database, we return ISOString e.g '2023-10-21T15:48:13.959Z'
  useEffect(() => {
    let isMounted = true;

    const formattedShipEvents = __shipment.events.map((event) => {
      return { ...event, timestamp: changeToLocalDatetime(event.timestamp) };
    });

    const formattedShipment: TShipment = {
      ...__shipment,
      status: {
        ...__shipment.status,
        timestamp: changeToLocalDatetime(__shipment.status.timestamp),
      },
      events: formattedShipEvents,
    };

    if (isMounted) {
      setShipment(formattedShipment);
    }

    return () => {
      isMounted = false;
    };
  }, [setShipment, __shipment]);

  // handle subsequent form change events
  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    e.persist();
    const { name, value } = e.target;

    switch (name) {
      case "fullName":
      case "email":
      case "country":
        return setShipment((prevShipment) => ({
          ...prevShipment,
          belongsTo: { ...prevShipment.belongsTo, [name]: value },
        }));

      case "originAddress":
        return setShipment((prevShipment) => ({
          ...prevShipment,
          origin: {
            ...prevShipment.origin,
            address: {
              ...prevShipment.origin.address,
              addressLocality: value,
            },
          },
        }));

      case "destinationAddress":
        return setShipment((prevShipment) => ({
          ...prevShipment,
          destination: {
            ...prevShipment.destination,
            address: {
              ...prevShipment.destination.address,
              addressLocality: value,
            },
          },
        }));

      case "statusTimestamp":
        return setShipment((prevShipment) => ({
          ...prevShipment,
          status: { ...prevShipment.status, timestamp: value },
        }));

      case "statusLocationAddress":
        return setShipment((prevShipment) => ({
          ...prevShipment,
          status: {
            ...prevShipment.status,
            location: {
              ...prevShipment.status.location,
              address: {
                ...prevShipment.status.location.address,
                addressLocality: value,
              },
            },
          },
        }));

      case "status":
        return setShipment((prevShipment) => ({
          ...prevShipment,
          status: {
            ...prevShipment.status,
            status: value as "pending" | "shipping" | "delivered" | "seized",
          },
        }));

      case "statusDescription":
        return setShipment((prevShipment) => ({
          ...prevShipment,
          status: { ...prevShipment.status, description: value },
        }));

      case "bill":
        return setShipment((prevShipment) => ({
          ...prevShipment,
          status: { ...prevShipment.status, bill: +value },
        }));

      default:
        return setShipment((prevShipment) => ({
          ...prevShipment,
          [name]: value,
        }));
    }
  };

  // form for shipment event section
  const [shipmentEvent, setShipmentEvent] = useState<TEvent>(
    shipmentEventInitState
  );

  const handleShipmentEventChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.persist();
    const { name, value } = e.target;

    switch (name) {
      case "eventLocationAddress":
        return setShipmentEvent((prevEvent) => ({
          ...prevEvent,
          location: {
            ...prevEvent.location,
            address: {
              ...prevEvent.location.address,
              addressLocality: value,
            },
          },
        }));

      default:
        return setShipmentEvent((prevEvent) => ({
          ...prevEvent,
          [name]: value,
        }));
    }
  };

  // state to determine what action the button on the modal should take, whether to edit an event or to add a new one
  const [whatToDo, setWhatToDo] = useState<"add" | "edit">("add");

  // modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // clear modal content before closing so that when modal opens again, it doesn't open prefilled with an event data
    setShipmentEvent(shipmentEventInitState);
  }, []);

  const openModal = useCallback(
    (type: "add" | "edit" | undefined, eventId?: string) => {
      const allEvents = shipment.events;

      if (type === "add" || undefined) {
        setIsModalOpen(true);
        setWhatToDo("add");
      } else if (type === "edit") {
        setWhatToDo("edit");
        // load modal with the data for the event that is to be edited
        const foundEvent = allEvents.find((event) => event.eventId === eventId);

        foundEvent && setShipmentEvent(foundEvent);
        setIsModalOpen(true);
      }
    },
    [shipment.events]
  );

  // handle what happens when an event is submitted. Should it be edited or should it be added as new?
  const handleEventSubmission = useCallback(() => {
    if (whatToDo === "add") {
      setShipment((prevShipment) => ({
        ...prevShipment,
        events: [...prevShipment.events, shipmentEvent],
      }));

      closeModal();
    } else {
      const filteredEvents = shipment.events.filter(
        (event) => event.eventId !== shipmentEvent.eventId
      );

      setShipment((prevShipment) => ({
        ...prevShipment,
        events: [...filteredEvents, { ...shipmentEvent }],
      }));

      closeModal();
    }
  }, [closeModal, shipment.events, whatToDo, shipmentEvent]);

  // delete single event
  const deleteEvent = useCallback(
    (eventId: string) => {
      const allEvents = shipment.events;

      // filter out unwanted event
      const filteredEvents = allEvents.filter((event) => {
        return event.eventId !== eventId;
      });

      setShipment((prevShipment) => ({
        ...prevShipment,
        events: [...filteredEvents],
      }));
    },
    [shipment.events]
  );

  // check for shipment form validity
  const { shipmentErrors } = useShipmentInputsValidation();

  const canShipmentBeSubmitted = useCallback(() => {
    return (
      Object.values(shipmentErrors as ShipmentErrors).every(
        (error) => error.message === ""
      ) &&
      Boolean(shipment.events.length) &&
      Boolean(shipment.trackingId)
    );
  }, [shipment.events.length, shipment.trackingId, shipmentErrors]);

  // form submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // const navigate = useNavigate();

  // handle form submission
  const handleShipmentUpdate = (
    e: FormEvent<HTMLFormElement>,
    trackingId: string
  ) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(trackingId);

    // shipmentRequest
    //   .patch(`/${trackingId}`, shipment)
    //   .then((data) => {
    //     // notify UI
    //     toast.success(data?.data.message, {
    //       id: "shipment success",
    //       duration: 6000,
    //     });
    //     // Reset Form
    //     setShipment(shipmentInitState);

    //     navigate("/dashboard/shipments", { preventScrollReset: true });
    //   })
    //   .catch((err) => {
    //     // notify UI
    //     toast.error(err?.response?.data?.message, {
    //       id: "shipment error",
    //       duration: 6000,
    //     });
    //   })
    //   .finally(() => {
    //     setIsSubmitting(false);
    //   });
  };

  return {
    states: {
      shipment,
      shipmentEvent,
      isModalOpen,
      isSubmitting,
      whatToDo,
    },

    actions: {
      handleFormChange,
      handleShipmentEventChange,
      closeModal,
      openModal,
      handleEventSubmission,
      handleShipmentUpdate,
      deleteEvent,
      setShipmentEvent,
      canShipmentBeSubmitted,
      setShipment,
    },
  };
};
