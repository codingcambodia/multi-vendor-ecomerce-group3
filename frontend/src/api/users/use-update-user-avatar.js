import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserAvatar } from "./api";

export function useUpdateUserAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateUserAvatar(data),

    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
  });
}
