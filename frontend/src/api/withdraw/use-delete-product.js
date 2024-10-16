import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "./api";

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["shops_products"] });
      }
    },
  });
}
