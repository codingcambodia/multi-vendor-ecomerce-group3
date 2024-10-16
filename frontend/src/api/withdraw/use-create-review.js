import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  createReview } from "./api";

// import { toast } from "sonner"

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createReview(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
  });
}