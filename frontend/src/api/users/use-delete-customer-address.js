import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCustomerAddress } from "./api";

export function useDeleteCustomerAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => deleteCustomerAddress(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
  });
}
