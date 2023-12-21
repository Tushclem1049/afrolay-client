import { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { countries } from "countries-list";
import { toast } from "sonner";
import { Copy, HelpCircle, RefreshCcw } from "lucide-react";

import { ToolTip } from "@/components";

import { useAddShipmentForm } from "../lib";
import { cn } from "@/lib/utils";

import { BsPlusLg } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { MdFilterAltOff, MdDeleteOutline } from "react-icons/md";

import { isEventErrors, useShipmentInputsValidation } from "../../../../../sdk";

export const ShipmentForm = () => {
  const {
    states: {
      shipment: { belongsTo, destination, events, origin, status, trackingId },
      // isModalOpen,
      isSubmitting,
      // shipmentEvent,
      // whatToDo,
    },
    actions: {
      canShipmentBeSubmitted,
      // closeModal,
      deleteEvent,
      // handleEventSubmission,
      handleFormChange,
      // handleShipmentEventChange,
      handleShipmentSubmission,
      openModal,
      refreshNumber,
      // setShipmentEvent,
    },
  } = useAddShipmentForm();

  // List of all countries
  const countriesOptions = Object.values(countries).map(
    (country) => country.name
  );

  // function and state returned by the hook are used for inputs validation on blur
  const { handleBlur, shipmentErrors } = useShipmentInputsValidation();

  // show the bill input only when shipment status is seized
  const [showBill, setShowBill] = useState<boolean>(false);
  const statusRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (statusRef.current?.value === "seized") {
      setShowBill(true);
    } else {
      setShowBill(false);
    }
  }, [statusRef.current?.value]);

  return (
    <form onSubmit={(e) => handleShipmentSubmission(e)} className="w-full ">
      <p className="flex items-center whitespace-nowrap mb-8 text-sm text-slate-600">
        <HelpCircle className="mr-2 h-4 w-4 text-orange-500" /> Shipment must
        have at least one event.
      </p>
      {/* cdet */}
      <div className="flex flex-col">
        <h1 className="font-bold text-orange-800/95 mb-2 uppercase text-md">
          Client Details
        </h1>
        <div className="p-4  flex flex-col mb-8 gap-y-2 sm:gap-y-4">
          <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-4 md:gap-x-8 lg:gap-x-10">
            <p className="flex-1 flex flex-col lg:flex-row items-start lg:items-center w-full md:w-1/2 gap-2 text-sm font-medium text-neutral-800 ">
              <label htmlFor="name">Full&nbsp;Name:</label>

              <input
                onBlur={(e) => handleBlur(e)}
                type="text"
                name="fullName"
                id="name"
                value={belongsTo.fullName}
                onChange={(e) => handleFormChange(e)}
                className={cn(
                  "w-full p-2 ring-1 outline-none border-none ring-orange-300/50 rounded-full bg-white text-black focus:ring-2 focus-visible:ring-2 focus:ring-orange-400/40 ",
                  !isEventErrors(shipmentErrors) &&
                    shipmentErrors.fullName.showErrorMessage &&
                    "outline-2 outline-red-400"
                )}
                required
                aria-required
              />
            </p>

            {/* email */}
            <p className="flex-1 flex flex-col lg:flex-row items-start lg:items-center w-full md:w-1/2 gap-2 text-sm font-medium text-neutral-800 ">
              <label htmlFor="email">Email:</label>

              <input
                type="text"
                name="email"
                id="email"
                value={belongsTo.email}
                className={cn(
                  "w-full p-2 ring-1 outline-none border-none ring-orange-300/50 rounded-full bg-white text-black focus:ring-2 focus-visible:ring-2 focus:ring-orange-400/40 ",
                  !isEventErrors(shipmentErrors) &&
                    shipmentErrors.email.showErrorMessage &&
                    "outline-2 outline-red-400"
                )}
                required
                aria-required
              />
            </p>
          </div>
          {/* country */}
          <div className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-4 md:gap-x-8 lg:gap-x-12 mb-b">
            <p className="flex-1 flex flex-col lg:flex-row items-start lg:items-center w-full md:w-1/2 gap-2 text-sm font-medium text-neutral-800 ">
              <label htmlFor="country">Country:</label>
              <select
                onChange={(e) => handleFormChange(e)}
                aria-label="Select your country"
                required
                value={belongsTo.country}
                name="country"
                id="country"
                className="w-full p-2 ring-1 outline-none border-none ring-orange-300/50 rounded-full bg-white text-black focus:ring-2 focus-visible:ring-2 focus:ring-orange-400/40 "
              >
                {countriesOptions.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </p>
            <div className="flex-1 flex flex-col lg:flex-row items-start lg:items-center w-full md:w-1/2 gap-2 text-sm font-medium text-neutral-800 " />
          </div>
        </div>
      </div>
      {/* cdet */}

      {/* shipment details */}
      <div className="flex flex-col">
        <h1 className="font-bold text-orange-800/95 uppercase text-md mb-4">
          Shipment Details
        </h1>

        <div className="bg-orange-700/95 px-4 py-2 rounded-full flex justify-between items-center border-2 border-amber-500/95">
          <p className="text-white font-medium text-sm flex items-center gap-x-2">
            <ToolTip description="Refresh tracking number">
              <button type="button" onClick={refreshNumber}>
                <RefreshCcw className="text-amber-300 h-6 w-6" />
              </button>
            </ToolTip>
            Tracking Number: <span>{trackingId}</span>
          </p>
          <CopyToClipboard
            text={trackingId}
            onCopy={() => {
              toast.success("Copied to clipboard");
            }}
          >
            <ToolTip description="Copy to clipboard">
              <Copy className="text-white h-6 w-6 cursor-pointer" />
            </ToolTip>
          </CopyToClipboard>
        </div>

        <div className="flex flex-col md:flex-row gap-y-12 md:gap-y-8 mt-8 gap-x-8">
          <div className="flex flex-col w-full md:w-1/2">
            <h1 className="font-bold text-orange-800/95 uppercase text-sm mb-4">
              Addresses
            </h1>

            <div className="flex flex-col gap-y-4">
              <p className="flex-1 flex flex-col  sm:flex-row md:flex-col lg:items-start w-full gap-2 text-sm font-medium text-neutral-800 items-start sm:items-center md:items-start">
                <label htmlFor="origin" className="whitespace-nowrap">
                  Origin Address:
                </label>

                <input
                  onBlur={(e) => handleBlur(e)}
                  type="text"
                  name="originAddress"
                  id="origin"
                  value={origin.address.addressLocality}
                  onChange={(e) => handleFormChange(e)}
                  className={cn(
                    "w-full p-2 ring-1 outline-none border-none ring-orange-300/50 rounded-full bg-white text-black focus:ring-2 focus-visible:ring-2 focus:ring-orange-400/40 ",
                    !isEventErrors(shipmentErrors) &&
                      shipmentErrors.originAddress.showErrorMessage &&
                      "outline-2 outline-red-400"
                  )}
                  required
                  aria-required
                />
              </p>

              {/* destination address */}
              <p className="flex-1 flex flex-col sm:flex-row md:flex-col lg:items-start w-full gap-2 text-sm font-medium text-neutral-800 items-start sm:items-center md:items-start">
                <label htmlFor="destination" className="whitespace-nowrap">
                  Destination Address:
                </label>

                <input
                  onBlur={(e) => handleBlur(e)}
                  type="text"
                  name="destinationAddress"
                  id="destination"
                  value={destination.address.addressLocality}
                  onChange={(e) => handleFormChange(e)}
                  className={cn(
                    "w-full p-2 ring-1 outline-none border-none ring-orange-300/50 rounded-full bg-white text-black focus:ring-2 focus-visible:ring-2 focus:ring-orange-400/40 ",
                    !isEventErrors(shipmentErrors) &&
                      shipmentErrors.destinationAddress.showErrorMessage &&
                      "outline-2 outline-red-400"
                  )}
                  required
                  aria-required
                />
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <h1 className="font-bold text-orange-800/95 uppercase text-sm mb-4">
              Delivery status
            </h1>
          </div>
        </div>

        <div>
          {/* origin address */}
          <div>
            <div>
              <div>
                <h1>
                  Shipment Events
                  <button
                    type="button"
                    onClick={() => {
                      openModal("add");
                    }}
                  >
                    <BsPlusLg />
                    New Event
                  </button>
                </h1>
                <div>
                  {events.length ? (
                    events.map((event, i) => (
                      <article key={i}>
                        <p>
                          <span> {i + 1}.</span>
                          <span>
                            {event.description.length <= 40
                              ? event.description
                              : event.description.slice(0, 40).trim() + "..."}
                          </span>
                        </p>
                        <div>
                          <span>
                            <TbEdit
                              title="Edit event"
                              onClick={() => openModal("edit", event.eventId)}
                            />
                          </span>
                          <span>
                            <MdDeleteOutline
                              title="Delete event"
                              onClick={() => deleteEvent(event.eventId)}
                            />
                          </span>
                        </div>
                      </article>
                    ))
                  ) : (
                    <p>
                      <MdFilterAltOff />
                      No events to show.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* delivery status */}
            <div>
              <h1>Delivery Status</h1>
              {/* timestamp */}
              <div>
                <div>
                  <p>
                    <label htmlFor="timestamp">Timestamp:</label>
                    <input
                      onBlur={(e) => handleBlur(e)}
                      type="datetime-local"
                      name="statusTimestamp"
                      id="timestamp"
                      value={status.timestamp}
                      onChange={(e) => handleFormChange(e)}
                      style={
                        !isEventErrors(shipmentErrors) &&
                        shipmentErrors.deliveryTimestamp.showErrorMessage
                          ? {
                              border: "1px solid #ff2e2eb5",
                              outline: "2px solid #ff7d7d73",
                            }
                          : {}
                      }
                    />
                  </p>
                  {!isEventErrors(shipmentErrors) &&
                  shipmentErrors.deliveryTimestamp.showErrorMessage ? (
                    <small>{shipmentErrors.deliveryTimestamp.message}</small>
                  ) : (
                    ""
                  )}
                </div>

                {/* location */}
                <div>
                  <p>
                    <label htmlFor="location">Location:</label>

                    <input
                      onBlur={(e) => handleBlur(e)}
                      type="text"
                      name="statusLocationAddress"
                      id="location"
                      value={status.location.address.addressLocality}
                      onChange={(e) => handleFormChange(e)}
                      style={
                        !isEventErrors(shipmentErrors) &&
                        shipmentErrors.deliveryLocation.showErrorMessage
                          ? {
                              border: "1px solid #ff2e2eb5",
                              outline: "2px solid #ff7d7d73",
                            }
                          : {}
                      }
                    />
                  </p>
                  {!isEventErrors(shipmentErrors) &&
                  shipmentErrors.deliveryLocation.showErrorMessage ? (
                    <small>{shipmentErrors.deliveryLocation.message}</small>
                  ) : (
                    ""
                  )}
                </div>

                {/* description */}
                <div>
                  <p>
                    <label htmlFor="description">Description:</label>

                    <textarea
                      onBlur={(e) => handleBlur(e)}
                      name="statusDescription"
                      id="description"
                      value={status.description}
                      onChange={(e) => handleFormChange(e)}
                      style={
                        !isEventErrors(shipmentErrors) &&
                        shipmentErrors.deliveryDescription.showErrorMessage
                          ? {
                              border: "1px solid #ff2e2eb5",
                              outline: "2px solid #ff7d7d73",
                            }
                          : {}
                      }
                    ></textarea>
                  </p>
                  {!isEventErrors(shipmentErrors) &&
                  shipmentErrors.deliveryDescription.showErrorMessage ? (
                    <small>{shipmentErrors.deliveryDescription.message}</small>
                  ) : (
                    ""
                  )}
                </div>

                {/* status status */}
                <div>
                  <p>
                    <label htmlFor="status">status:</label>

                    <select
                      name="status"
                      id="status"
                      onChange={(e) => handleFormChange(e)}
                      value={status.status}
                      ref={statusRef}
                    >
                      <option value="pending">Pending</option>
                      <option value="shipping">Shipping</option>
                      <option value="delivered">Delivered</option>
                      <option value="seized">Seized</option>
                    </select>
                  </p>
                </div>

                {/* Bill */}
                <div
                  style={showBill ? { display: "block" } : { display: "none" }}
                >
                  <p>
                    <label htmlFor="bill">Bill:</label>
                    <input
                      type="number"
                      name="bill"
                      id="bill"
                      value={status.bill}
                      onChange={(e) => handleFormChange(e)}
                    />
                    <strong>$</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* submit button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting ? true : !canShipmentBeSubmitted()}
        >
          {isSubmitting ? "Please wait..." : "Add Shipment"}
        </button>
      </div>

      {/* modal */}
      {/* {isModalOpen && (
        <ShipmentEventModal
          {...{
            shipmentEvent,
            whatToDo,
            closeModal,
            handleEventSubmission,
            handleShipmentEventChange,
            setShipmentEvent,
          }}
        />
      )} */}
    </form>
  );
};
