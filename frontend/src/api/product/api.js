import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v2/product";
// const BASE_URL = "https://backend.groupthree.shop/api/v2/product";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getProductsByShops = async (shop_id) => {
  return (await axiosInstance.get(`get-all-products-shop/${shop_id}`)).data;
};
export const createProduct = async (data) => {
  await axiosInstance.post("create-product", data);
};
export const deleteProduct = async (id) => {
  console.log(id, "id");

  await axiosInstance.delete(`delete-shop-product/${id}`);
};
