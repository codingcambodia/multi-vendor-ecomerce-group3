import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCustomerAddress } from "./api";

export function useAddCustomerAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => addCustomerAddress(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
  });
}
