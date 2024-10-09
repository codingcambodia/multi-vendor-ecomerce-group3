import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v2/coupon";
// const BASE_URL = "https://backend.groupthree.shop/api/v2/coupon";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// export const getShop = async () => {
//   return (await axiosInstance.get("getuser")).data;
// };

export const createCoupon = async (data) => {
  await axiosInstance.post("create-coupon-code", data);
};

export const getCoupons = async (seller_id) => {
  return (await axiosInstance.get(`get-coupon/${seller_id}`)).data;
};
export const deleteCoupon = async (id) => {
  await axiosInstance.delete(`delete-coupon/${id}`);
};
