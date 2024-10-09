import axios from "axios";
import { server } from "../../server";

const BASE_URL = `${server}/order`;
// const BASE_URL = "https://backend.groupthree.shop/api/v2/coupon";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// export const getShop = async () => {
//   return (await axiosInstance.get("getuser")).data;
// };

// export const createCoupon = async (data) => {
//   await axiosInstance.post("create-coupon-code", data);
//

export const getAllOrderByCustomers = async (customer_id) => {
  console.log(customer_id);

  return (await axiosInstance.get(`get-all-orders/${customer_id}`)).data;
};
// export const deleteCoupon = async (id) => {
//   await axiosInstance.delete(`delete-coupon/${id}`);
// };
