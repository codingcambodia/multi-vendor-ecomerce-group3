import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "./api";

// import { toast } from "sonner"

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createProduct(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["shops_products"] });
      }
    },
  });
}
