import { useQuery } from "@tanstack/react-query";
import { getAllOrderByCustomers } from "./api";

export function useGetAllCustomerOrders(customer_id) {
  return useQuery({
    enabled: true,
    queryKey: ["customer-orders"],
    queryFn: () => getAllOrderByCustomers(customer_id),
  });
}
