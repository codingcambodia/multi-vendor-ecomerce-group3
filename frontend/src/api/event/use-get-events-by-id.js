import { useQuery } from "@tanstack/react-query";
import { getEventById } from "./api";

export function useGetEventById(event_id) {
  return useQuery({
    enabled: Boolean(event_id),
    queryKey: ["shops_events"],
    queryFn: () => getEventById(event_id),
  });
}
