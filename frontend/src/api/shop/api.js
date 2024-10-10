import axios from "axios";
import { server } from "../../server";

const BASE_URL = `${server}/shop`;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


export const createShop = async (data) => {
  await axiosInstance.post("create-shop", data);
};
export const loginShop = async (data) => {
  await axiosInstance.post("login-shop", data);
};
