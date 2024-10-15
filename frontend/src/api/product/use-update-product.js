import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "./api";

// import { toast } from "sonner"

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateProduct(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["shops_products"] });
      }
    },
  });
}
