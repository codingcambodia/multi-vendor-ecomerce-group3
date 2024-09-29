import { useMutation } from "@tanstack/react-query";
import { activateUser } from "./api";
import { toast } from "react-toastify";

// import { toast } from "sonner"

export function useActivateUser() {
  return useMutation({
    mutationFn: (activation_token) => activateUser(activation_token),
    // onMutate: () => {
    //   console.log("mutate");
    // },
    onError: (error) => {
      // console.log(error.respnse.data);

      toast.error("User not activated");
    },
    onSuccess: () => {
      toast.success("User activated successfully");
    },
  });
}
