import { AxiosResponse } from "axios";
import { cardRequest, shipmentRequest } from "..";
import {
  APIAllCardsResponse,
  APIAllShipResponse,
  APISingleShipResponse,
  Cards,
  TShipment,
  TShipments,
} from "../../../sdk";

export const getAllShipment = async (): Promise<TShipments> => {
  const data: AxiosResponse<any, any> = await shipmentRequest("/");
  const AllShipmentData: APIAllShipResponse = data.data;

  if (data.status !== 200) throw new Error("An unexpected error occured.");

  return AllShipmentData.shipments;
};

export const getSingleShipment = async (
  trackingId: string
): Promise<TShipment> => {
  const data: AxiosResponse<any, any> = await shipmentRequest(`/${trackingId}`);
  const shipmentData: APISingleShipResponse = data.data;

  if (data.status >= 400) throw new Error("An unexpected error occured.");

  return shipmentData.shipment;
};

// export const deleteSingleShipment = async (
//   trackingId: string | number
// ): Promise<void> => {
//   const data: AxiosResponse<any, any> = await shipmentRequest.delete(
//     `/${trackingId}`
//   );
// };

// CHECKOUT AND CARD DETAILS
export const getAllCardDetails = async (): Promise<Cards> => {
  const data: AxiosResponse<any, any> = await cardRequest.get("/");
  const allCards: APIAllCardsResponse = data.data;

  if (data.status !== 200) throw new Error("An unexpected error occured.");

  return allCards.allCardsDetails;
};

// export const deleteSingleCard = async (cardName: string) => {
//   const data: AxiosResponse<any, any> = await cardRequest.delete(
//     `/search?cardName=${cardName}`
//   );
// };
