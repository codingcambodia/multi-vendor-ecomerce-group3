import { useMutation } from "@tanstack/react-query";
import { updatePaymentMethod } from "./api";

// import { toast } from "sonner"

export function useUpdatePaymentMethod() {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updatePaymentMethod(data),
    // onSettled: async (_, error) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     await queryClient.invalidateQueries({ queryKey: ["user"] });
    //   }
    // },
  });
}
