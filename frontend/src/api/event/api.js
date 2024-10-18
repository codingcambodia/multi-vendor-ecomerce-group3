import axios from "axios";
import { server } from "../../server";

const BASE_URL = `${server}/event`;
// const BASE_URL = "https://backend.groupthree.shop/api/v2/event";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getEventsByShops = async (shop_id) => {
  return (await axiosInstance.get(`get-all-events/${shop_id}`)).data;
};
export const getEventById = async (event_id) => {
  return (await axiosInstance.get(`get-event-by-id/${event_id}`)).data;
};
export const createEvent = async (data) => {
  await axiosInstance.post("create-event", data);
};
export const deleteEvent = async (id) => {
  await axiosInstance.delete(`delete-shop-event/${id}`);
};
