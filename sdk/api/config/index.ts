import axios from "axios";

export const shipmentRequest = axios.create({
  baseURL: "https://dhlimited-1y7i.onrender.com/api/v1/shipment",
});
export const cardRequest = axios.create({
  baseURL: "https://dhlimited-1y7i.onrender.com/api/v1/checkout",
});

export default axios.create({
  baseURL: "http://localhost:8000/api/v1",
});
