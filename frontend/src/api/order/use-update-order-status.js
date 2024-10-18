import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "./api";

// import { toast } from "sonner"

export function useUpdateOrderStatus(id) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateOrderStatus(data, id),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["order", id] });
      }
    },
  });
}
