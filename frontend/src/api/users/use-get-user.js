import { useQuery } from "@tanstack/react-query";
import { getUser } from "./api";

export function useGetUser() {
  return useQuery({
    enabled: true,
    queryKey: ["user"],
    queryFn: () => getUser(),
  });
}


// export function useTodos(ids: (number | undefined)[] | undefined) {
//   return useQueries({
//     queries: (ids ?? []).map((id) => {
//       return {
//         queryKey: ["todo", { id }],
//         queryFn: () => getTodo(id!),
//       };
//     }),
//   });
// }
