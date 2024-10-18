import { useQuery } from "@tanstack/react-query";
import { getProductById } from "./api";

export function useGetProductById(product_id) {
  return useQuery({
    enabled: Boolean(product_id),
    queryKey: ["get-product-by-id"],
    queryFn: () => getProductById(product_id),
  });
}
