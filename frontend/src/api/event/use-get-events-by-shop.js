import { useQuery } from "@tanstack/react-query";
import { getEventsByShops } from "./api";

export function useGetEventsByShop(shop_id) {
  return useQuery({
    enabled: true,
    queryKey: ["shops_events"],
    queryFn: () => getEventsByShops(shop_id),
  });
}
