import axios from "axios";
import { server } from "../../server";

const BASE_URL = `${server}/user`;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Credentials": true,
  },
});

export const updatePassword = async (data) => {
  await axiosInstance.put("update-user-password", data);
};

export const getUser = async () => {
  return (await axiosInstance.get("getuser")).data;
};

export const createUser = async (data) => {
  await axiosInstance.post("create-user", data);
};

export const updateUserInfo = async (data) => {
  await axiosInstance.put("update-user-info", data);
};
export const updateUserAvatar = async (data) => {
  await axiosInstance.put("update-avatar", data);
};

export const loginUser = async (data) => {
  await axiosInstance.post("login-user", data);
};
export const activateUser = async (activation_token) => {
  await axiosInstance.post("activation", {
    activation_token: activation_token,
  });
};
export const addCustomerAddress = async (data) => {
  await axiosInstance.put("update-user-addresses", data);
};

export const deleteCustomerAddress = async (id) => {
  await axiosInstance.delete(`delete-user-address/${id}`);
};

export const logoutCustomer = async (id) => {
  await axiosInstance.get(`logout`);
};

