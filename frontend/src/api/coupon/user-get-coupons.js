import { useQuery } from "@tanstack/react-query";
import { getCoupons } from "./api";

export function useGetCoupons(seller_id) {
  return useQuery({
    enabled: true,
    queryKey: ["coupons"],
    queryFn: () => getCoupons(seller_id),
  });
}
