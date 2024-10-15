import { useMutation } from "@tanstack/react-query";
import { createShop } from "./api";

// import { toast } from "sonner"

export function useCreateShop() {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createShop(data),
    // onSettled: async (_, error) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     await queryClient.invalidateQueries({ queryKey: ["user"] });
    //   }
    // },
  });
}
