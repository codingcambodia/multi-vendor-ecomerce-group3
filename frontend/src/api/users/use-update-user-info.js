import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserInfo } from "./api";

export function useUpdateUserInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateUserInfo(data),

    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
  });
}
