import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "./api";

// import { toast } from "sonner"

export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createEvent(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["shops_events"] });
      }
    },
  });
}
