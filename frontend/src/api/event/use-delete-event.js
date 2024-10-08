import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent } from "./api";

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteEvent(id),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["shops_events"] });
      }
    },
  });
}
