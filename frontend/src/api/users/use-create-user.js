import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "./api";
import { toast } from "react-toastify";

// import { toast } from "sonner"

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createUser(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
  });
}
