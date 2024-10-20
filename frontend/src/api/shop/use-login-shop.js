import { useMutation, useQueryClient } from "@tanstack/react-query";

import { loginShop } from "./api";

// import { toast } from "sonner"

export function useLoginShop() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => loginShop(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
  });
}
