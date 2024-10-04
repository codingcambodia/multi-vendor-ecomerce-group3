import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "./api";
import { toast } from "react-toastify";

// import { toast } from "sonner"

export function useLoginUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => loginUser(data),
    // onMutate: () => {
    //   console.log("mutate");
    // },
    onError: (error) => {
      // console.log(error.respnse.data);

      toast.error("Login Failed!");
    },
    onSuccess: () => {
      toast.success("Login Success!");
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
  });
}
