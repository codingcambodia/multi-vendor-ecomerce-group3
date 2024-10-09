import { useQuery } from "@tanstack/react-query";
import { getUser } from "./api";

export function useGetUser() {
  return useQuery({
    enabled: true,
    queryKey: ["user"],
    queryFn: () => getUser(),
  });
}



