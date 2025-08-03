import type {
  CommentCreateResponse,
  CommentResponse,
  CommentsResponse,
} from "@/domains/Comment";

import httpClient from "@/lib/http-client";

import type { ApiResponse, PaginatedResponse } from "@/types/api";

export const CommentsService = {
  getByArticleId: async (
    articleId: string,
    params?: {
      page?: number;
      limit?: number;
    },
  ): Promise<PaginatedResponse<CommentsResponse>> => {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());

    const queryString = searchParams.toString();

    const response = await httpClient.get<PaginatedResponse<CommentsResponse>>(
      `/comments/article/${articleId}${queryString ? `?${queryString}` : ""}`,
    );
    return response;
  },

  getById: async (id: string): Promise<ApiResponse<CommentResponse>> => {
    const response = await httpClient.get<ApiResponse<CommentResponse>>(
      `/comments/${id}`,
    );
    if (response === null) {
      throw new Error(`Comment with id ${id} not found`);
    }
    return response;
  },

  create: async (
    articleId: string,
    content: string,
  ): Promise<ApiResponse<CommentCreateResponse>> => {
    const response = await httpClient.post<ApiResponse<CommentCreateResponse>>(
      "/comments",
      {
        articleId,
        content,
      },
    );
    if (response === null) {
      throw new Error("Failed to create comment");
    }
    return response;
  },

  update: async (
    id: string,
    content?: string,
  ): Promise<ApiResponse<CommentResponse>> => {
    const response = await httpClient.patch<ApiResponse<CommentResponse>>(
      `/comments/${id}`,
      {
        content,
      },
    );
    if (response === null) {
      throw new Error(`Failed to update comment with id ${id}`);
    }
    return response;
  },

  delete: async (id: string): Promise<void> => {
    const response = await httpClient.delete<ApiResponse<null>>(
      `/comments/${id}`,
    );
    if (response === null) {
      throw new Error(`Failed to delete article with id ${id}`);
    }
  },
};
