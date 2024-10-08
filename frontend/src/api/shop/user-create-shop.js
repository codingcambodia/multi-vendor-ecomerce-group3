import { useMutation } from "@tanstack/react-query";
import { createShop } from "./api";

// import { toast } from "sonner"

export function useCreateShop() {
  return useMutation({
    mutationFn: (data) => createShop(data),
  
  });
}
