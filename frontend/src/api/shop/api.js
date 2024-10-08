import axios from "axios";

// const BASE_URL = "http://localhost:8000/api/v2/shop";
const BASE_URL = "https://backend.groupthree.shop/api/v2/shop";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// export const getShop = async () => {
//   return (await axiosInstance.get("getuser")).data;
// };

export const createShop = async (data) => {
  await axiosInstance.post("create-shop", data);
};
export const loginShop = async (data) => {
  await axiosInstance.post("login-shop", data);
};
