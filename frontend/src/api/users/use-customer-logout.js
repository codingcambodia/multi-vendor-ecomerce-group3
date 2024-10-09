import { useQuery } from "@tanstack/react-query";
import { logoutCustomer } from "./api";

export function useCustomerLogout() {
  return useQuery({
    enabled: false,
    queryKey: ["user"],
    queryFn: () => logoutCustomer(),
  });
}
