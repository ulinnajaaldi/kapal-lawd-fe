import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { UserService } from "@/services/User";

export const UserUseCases = {
  useUpdateProfile: ({ userId }: { userId: string }) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: (data: { name: string }) =>
        UserService.update(userId, data.name),
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["use-get-profile"] });
        queryClient.invalidateQueries({ queryKey: ["use-get-my-articles"] });
        queryClient.invalidateQueries({
          queryKey: ["use-get-my-liked-articles"],
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

    return mutation;
  },

  useDeleteUser: ({ userId }: { userId: string }) => {
    const mutation = useMutation({
      mutationFn: () => UserService.delete(userId),
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
