import { BsInfoCircle, BsPlusLg } from "react-icons/bs";
import { GoCopy } from "react-icons/go";
import { BiSolidCopy } from "react-icons/bi";
import {
  MdOutlineRefresh,
  MdFilterAltOff,
  MdDeleteOutline,
} from "react-icons/md";
import { TbEdit } from "react-icons/tb";

import { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { countries } from "countries-list";

import {
  isEventErrors,
  useAddShipForm,
  useShipmentInputsValidation,
} from "../../../sdk";
import { toast } from "sonner";

const AddShipmentForm = () => {
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
      // resetEventModal,
      deleteEvent,
      // handleEventSubmission,
      handleFormChange,
      // handleShipmentEventChange,
      handleShipmentSubmission,
      toggleMode,
      refreshNumber,
      // setShipmentEvent,
    },
  } = useAddShipForm();

  // List of all countries
  const countriesOptions = Object.values(countries).map(
    (country) => country.name
  );

  // state to manage icons when tracking number gets copied to clipboard
  const [copied, setCopy] = useState(false);

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
    <form onSubmit={(e) => handleShipmentSubmission(e)}>
      <p>
        <BsInfoCircle />
        &nbsp;Shipment must have at least one event.
      </p>
      <div>
        <div>
          <h1>Client Details</h1>
          {/* full name */}
          <div>
            <div>
              <p>
                <label htmlFor="name">Full&nbsp;Name:</label>

                <input
                  onBlur={(e) => handleBlur(e)}
                  type="text"
                  name="fullName"
                  id="name"
                  value={belongsTo.fullName}
                  onChange={(e) => handleFormChange(e)}
                  style={
                    !isEventErrors(shipmentErrors) &&
                    shipmentErrors.fullName.showErrorMessage
                      ? {
                          border: "1px solid #ff2e2eb5",
                          outline: "2px solid #ff7d7d73",
                        }
                      : {}
                  }
                />
              </p>
              {!isEventErrors(shipmentErrors) &&
              shipmentErrors.fullName.showErrorMessage ? (
                <small>{shipmentErrors.fullName.message}</small>
              ) : (
                ""
              )}
            </div>

            {/* email */}
            <div>
              <p>
                <label htmlFor="email">Email:</label>

                <input
                  type="text"
                  name="email"
                  id="email"
                  value={belongsTo.email}
                  onChange={(e) => handleFormChange(e)}
                />
              </p>
            </div>

            {/* country */}
            <div>
              <p>
                <label htmlFor="country">Country:</label>
                <select
                  onChange={(e) => handleFormChange(e)}
                  aria-label="Select your country"
                  required
                  value={belongsTo.country}
                  name="country"
                  id="country"
                >
                  <option value={"none"}>Select country</option>
                  {countriesOptions.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </p>
            </div>
          </div>
        </div>

        {/* shipment details */}
        <div>
          <h1>Shipment Details</h1>

          <div>
            <div>
              <p>
                Tracking Number: <span>{trackingId}</span>
              </p>
              <div>
                <CopyToClipboard
                  text={trackingId}
                  onCopy={() => {
                    setCopy(true);
                    setTimeout(() => setCopy(false), 2000);
                    // notify UI
                    toast.success("Copied to clipboard", {
                      id: "clipboard",
                      duration: 6000,
                    });
                  }}
                >
                  {copied ? (
                    <div>
                      <BiSolidCopy />
                    </div>
                  ) : (
                    <div>
                      <GoCopy title="Copy to clipboard" />
                    </div>
                  )}
                </CopyToClipboard>
                <div>
                  <button type="button" title="Refresh" onClick={refreshNumber}>
                    <MdOutlineRefresh />
                  </button>
                </div>
              </div>
            </div>

            {/* origin address */}
            <div>
              <div>
                <div>
                  <h1>Addresses</h1>
                  <div>
                    <div>
                      <p>
                        <label htmlFor="origin">Origin Address:</label>

                        <input
                          onBlur={(e) => handleBlur(e)}
                          type="text"
                          name="originAddress"
                          id="origin"
                          value={origin.address.addressLocality}
                          onChange={(e) => handleFormChange(e)}
                          style={
                            !isEventErrors(shipmentErrors) &&
                            shipmentErrors.originAddress.showErrorMessage
                              ? {
                                  border: "1px solid #ff2e2eb5",
                                  outline: "2px solid #ff7d7d73",
                                }
                              : {}
                          }
                        />
                      </p>
                      {!isEventErrors(shipmentErrors) &&
                      shipmentErrors.originAddress.showErrorMessage ? (
                        <small>{shipmentErrors.originAddress.message}</small>
                      ) : (
                        ""
                      )}
                    </div>

                    {/* destination address */}
                    <div>
                      <p>
                        <label htmlFor="destination">
                          Destination Address:
                        </label>

                        <input
                          onBlur={(e) => handleBlur(e)}
                          type="text"
                          name="destinationAddress"
                          id="destination"
                          value={destination.address.addressLocality}
                          onChange={(e) => handleFormChange(e)}
                          style={
                            !isEventErrors(shipmentErrors) &&
                            shipmentErrors.destinationAddress.showErrorMessage
                              ? {
                                  border: "1px solid #ff2e2eb5",
                                  outline: "2px solid #ff7d7d73",
                                }
                              : {}
                          }
                        />
                      </p>
                      {!isEventErrors(shipmentErrors) &&
                      shipmentErrors.destinationAddress.showErrorMessage ? (
                        <small>
                          {shipmentErrors.destinationAddress.message}
                        </small>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h1>
                    Shipment Events
                    <button
                      type="button"
                      onClick={() => {
                        toggleMode("add");
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
                                onClick={() =>
                                  toggleMode("edit", event.eventId)
                                }
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
                      <small>
                        {shipmentErrors.deliveryDescription.message}
                      </small>
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
                    style={
                      showBill ? { display: "block" } : { display: "none" }
                    }
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
            resetEventModal,
            handleEventSubmission,
            handleShipmentEventChange,
            setShipmentEvent,
          }}
        />
      )} */}
    </form>
  );
};

export default AddShipmentForm;
