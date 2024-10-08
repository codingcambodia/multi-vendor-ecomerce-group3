import { useMutation } from "@tanstack/react-query";

import { loginShop } from "./api";

// import { toast } from "sonner"

export function useLoginShop() {
  return useMutation({
    mutationFn: (data) => loginShop(data),
  });
}
