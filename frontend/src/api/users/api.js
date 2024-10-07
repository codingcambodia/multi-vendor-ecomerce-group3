import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v2/user";
// const BASE_URL = "https://backend.groupthree.shop/api/v2/user";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// export const getAccounts = async () => {
//   return (await axiosInstance.get<Account[]>("accounts")).data.map((account) => account);
// };

export const getUser = async () => {
  return (await axiosInstance.get("getuser")).data;
};

export const createUser = async (data) => {
  await axiosInstance.post("create-user", data);
};

export const loginUser = async (data) => {
  await axiosInstance.post("login-user", data);
};
export const activateUser = async (activation_token) => {
  await axiosInstance.post("activation", {
    activation_token: activation_token,
  });
};
// // TODO:
// export const deleteBulkAccount = async (ids: string[]) => {
//   for (let i = 0; i < ids.length; i++) {
//     await axiosInstance.delete(`accounts/${ids[i]}`);
//   }
// };

// export const deleteAccount = async (id: string) => {

//     await axiosInstance.delete(`accounts/${id}`);

// };

// export const updateAccount = async (data: Account) => {
//   await axiosInstance.put(`accounts/${data.id}`, data);
// };

// export const getProjects = async (page = 1) => {
//   return (await axiosInstance.get<Project[]>(`projects?_page=${page}&_limit=3`))
//     .data;
// };

// export const getProducts = async ({ pageParam }: { pageParam: number }) => {
//   return (
//     await axiosInstance.get<Product[]>(
//       `products?_page=${pageParam + 1}&_limit=3`
//     )
//   ).data;
// };

// export const getProduct = async (id: number) => {
//   return (await axiosInstance.get<Product>(`products/${id}`)).data;
// };
