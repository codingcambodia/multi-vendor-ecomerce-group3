import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "./api";
import { toast } from "react-toastify";

// import { toast } from "sonner"

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createUser(data),
    // onMutate: () => {
    //   console.log("mutate");
    // },
    onError: (error) => {
      // console.log(error.respnse.data);

      toast.error("Create User Failed!");
    },
    onSuccess: () => {
      toast.success("Create Student Success!");
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
