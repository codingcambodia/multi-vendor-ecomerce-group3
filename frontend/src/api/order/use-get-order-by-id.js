import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "./api";

export function useGetOrderById(order_id) {
  return useQuery({
    enabled: Boolean(order_id),
    queryKey: ["order", order_id],
    queryFn: () => getOrderById(order_id),
  });
}
