import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { LikesService } from "@/services/Like";

export const LikesUseCases = {
  useLikedArticle: ({ id }: { id: string }) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: () => LikesService.liked(id),
      onSuccess: () => {
        toast.success("Success like article");
        queryClient.invalidateQueries({ queryKey: ["use-get-articles"] });
      },
      onError: () => {
        toast.error("Error liking article");
      },
    });
    return mutation;
  },

  useUnlikedArticle: ({ id }: { id: string }) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: () => LikesService.unliked(id),
      onSuccess: () => {
        toast.success("Success unlike article");
        queryClient.invalidateQueries({ queryKey: ["use-get-articles"] });
      },
      onError: () => {
        toast.error("Error unliking article");
      },
    });
    return mutation;
  },
};
