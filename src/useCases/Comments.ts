import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { CommentsService } from "@/services/Comments";

export const CommentsUseCases = {
  useGetByArticleId: ({
    articleId,
    page,
    limit,
  }: {
    articleId: string;
    page?: number;
    limit?: number;
  }) => {
    const queries = useQuery({
      queryKey: ["use-get-by-article-id", { articleId, page, limit }],
      queryFn: () =>
        CommentsService.getByArticleId(articleId, {
          page: page ?? 1,
          limit: limit ?? 10,
        }),
      enabled: !!articleId,
      select: (data) => data.data,
    });

    return queries;
  },

  useGetCommentById: ({ id }: { id: string }) => {
    const queries = useQuery({
      queryKey: ["use-get-comment-by-id", { id }],
      queryFn: () => CommentsService.getById(id),
      enabled: !!id,
      select: (data) => data.data,
    });

    return queries;
  },

  useCreateComment: () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: (data: { articleId: string; content: string }) =>
        CommentsService.create(data.articleId, data.content),
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["use-get-articles"],
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
    return mutation;
  },

  useUpdateComment: ({ id }: { id: string }) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: (data: { content: string }) =>
        CommentsService.update(id, data.content),
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["use-get-comments", { articleId: data.data?.articleId }],
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
    return mutation;
  },

  useDeleteComment: ({ id }: { id: string }) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: () => CommentsService.delete(id),
      onSuccess: () => {
        toast.success("Comment successfully deleted");
        queryClient.invalidateQueries({ queryKey: ["use-get-comments"] });
      },
      onError: () => {
        toast.error("Error delete comment");
      },
    });
    return mutation;
  },
};
