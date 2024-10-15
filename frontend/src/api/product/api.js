import axios from "axios";
import { server } from "../../server";

const BASE_URL = `${server}/product`;
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

export const createReview = async (data) => {
  await axiosInstance.put(`create-new-review`, data);
};

export const getProductById = async (product_id) => {
  return (await axiosInstance.get(`get-product-by-id/${product_id}`)).data;
};

export const updateProduct = async (data) => {
  await axiosInstance.put(`update-product/${data._id}`, data);
};
