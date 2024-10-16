import { useMutation } from "@tanstack/react-query";
import { deleteWithdrawMethod } from "./api";

// import { toast } from "sonner"

export function useDeleteWithdrawMethod() {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteWithdrawMethod(),
    // onSettled: async (_, error) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     await queryClient.invalidateQueries({ queryKey: ["user"] });
    //   }
    // },
  });
}
