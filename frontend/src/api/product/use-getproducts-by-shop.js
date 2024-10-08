import { useQuery } from "@tanstack/react-query";
import { getProductsByShops } from "./api";

export function useGetProductsByShop(shop_id) {
  return useQuery({
    enabled: true,
    queryKey: ["shops_products"],
    queryFn: () => getProductsByShops(shop_id),
  });
}
