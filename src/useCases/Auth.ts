import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { AuthService } from "@/services/Auth";

export const AuthUseCases = {
  useGetProfile: () => {
    const query = useQuery({
      queryKey: ["use-get-profile"],
      queryFn: AuthService.getProfile,
    });

    return query;
  },

  useLogin: () => {
    const mutation = useMutation({
      mutationFn: (data: { email: string; password: string }) =>
        AuthService.login(data.email, data.password),
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    return mutation;
  },

  useRegister: () => {
    const mutation = useMutation({
      mutationFn: (data: { email: string; name: string; password: string }) =>
        AuthService.register(data.email, data.name, data.password),
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    return mutation;
  },
};
