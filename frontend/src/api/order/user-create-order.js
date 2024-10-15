import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "./api";

// import { toast } from "sonner"

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createOrder(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["orders"] });
      }
    },
  });
}
