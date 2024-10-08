import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCoupon } from "./api";

export function useDeleteCoupon() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCoupon(id),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["coupons"] });
      }
    },
  });
}
