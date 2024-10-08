import {useMutation, useQueryClient } from "@tanstack/react-query";
import { createCoupon } from "./api";


export function useCreateCoupon() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createCoupon(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["coupons"] });
      }
    },
  });
}
