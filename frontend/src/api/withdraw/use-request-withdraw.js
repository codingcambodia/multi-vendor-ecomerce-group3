import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestWithdraw } from "./api";

// import { toast } from "sonner"

export function useRequestWithdraw() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => requestWithdraw(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["withdraw"] });
      }
    },
  });
}
