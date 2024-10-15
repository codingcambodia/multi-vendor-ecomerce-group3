import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestRefund } from "./api";

// import { toast } from "sonner"

export function useRequestRefund() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => requestRefund(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["orders"] });
      }
    },
  });
}
