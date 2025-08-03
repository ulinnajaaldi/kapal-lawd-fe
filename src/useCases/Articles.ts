import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { ArticleService } from "@/services/Articles";

export const ArticlesUseCases = {
  useGetArticles: ({
    query,
    page,
    limit,
    sortBy,
    sortOrder,
  }: {
    query?: string;
    page?: number;
    limit?: number;
    sortBy?: "createdAt" | "updatedAt" | "title" | "";
    sortOrder?: "ASC" | "DESC" | "";
  }) => {
    const queries = useQuery({
      queryKey: ["use-get-articles", { query, page, limit, sortBy, sortOrder }],
      queryFn: () =>
        ArticleService.getAll({
          query: query !== "" ? query : undefined,
          page: page ?? 1,
          limit: limit ?? 10,
          sortBy: sortBy !== "" ? sortBy : undefined,
          sortOrder: sortOrder !== "" ? sortOrder : undefined,
        }),
      select: (data) => data.data,
    });

    return queries;
  },

  useGetMyArticles: ({ page, limit }: { page?: number; limit?: number }) => {
    const queries = useQuery({
      queryKey: ["use-get-my-articles", { page, limit }],
      queryFn: () =>
        ArticleService.getMyArticles({
          page: page ?? 1,
          limit: limit ?? 10,
        }),
      select: (data) => data.data,
    });

    return queries;
  },

  useGetMyLikedArticles: ({
    page,
    limit,
  }: {
    page?: number;
    limit?: number;
  }) => {
    const queries = useQuery({
      queryKey: ["use-get-my-liked-articles", { page, limit }],
      queryFn: () =>
        ArticleService.getMyLikedArticles({
          page: page ?? 1,
          limit: limit ?? 10,
        }),
      select: (data) => data.data,
    });

    return queries;
  },

  useGetArticleById: ({ id }: { id: string }) => {
    const queries = useQuery({
      queryKey: ["use-get-article-by-id", { id }],
      queryFn: () => ArticleService.getById(id),
      enabled: !!id,
      select: (data) => data.data,
    });

    return queries;
  },

  useCreateArticle: () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: (data: { title: string; content: string }) =>
        ArticleService.create(data.title, data.content),
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["use-get-articles"] });
        queryClient.invalidateQueries({ queryKey: ["use-get-my-articles"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
    return mutation;
  },

  useUpdateArticle: ({ id }: { id: string }) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: (data: { title: string; content: string }) =>
        ArticleService.update(id, data.title, data.content),
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["use-get-articles"] });
        queryClient.invalidateQueries({ queryKey: ["use-get-my-articles"] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
    return mutation;
  },

  useDeleteArticle: ({ id }: { id: string }) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: () => ArticleService.delete(id),
      onSuccess: () => {
        toast.success("Article successfully deleted");
        queryClient.invalidateQueries({ queryKey: ["use-get-articles"] });
        queryClient.invalidateQueries({ queryKey: ["use-get-my-articles"] });
      },
      onError: () => {
        toast.error("Error delete article");
      },
    });
    return mutation;
  },
};
