import type {
  ArticleCreateResponse,
  ArticleResponse,
  ArticlesResponse,
} from "@/domains/Article";

import httpClient from "@/lib/http-client";

import type { ApiResponse, PaginatedResponse } from "@/types/api";

export const ArticleService = {
  getAll: async (params?: {
    query?: string;
    page?: number;
    limit?: number;
    sortBy?: "createdAt" | "updatedAt" | "title" | "";
    sortOrder?: "ASC" | "DESC" | "";
  }): Promise<PaginatedResponse<ArticlesResponse>> => {
    const searchParams = new URLSearchParams();

    if (params?.query)
      searchParams.append("query", params.query.toLocaleLowerCase());
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
    if (params?.sortOrder) searchParams.append("sortOrder", params.sortOrder);

    const queryString = searchParams.toString();

    const response = await httpClient.get<PaginatedResponse<ArticlesResponse>>(
      `/articles${queryString ? `?${queryString}` : ""}`,
    );
    return response;
  },

  getMyArticles: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<ArticlesResponse>> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());

    const queryString = searchParams.toString();

    const response = await httpClient.get<PaginatedResponse<ArticlesResponse>>(
      `/articles/my/articles${queryString ? `?${queryString}` : ""}`,
    );
    return response;
  },

  getMyLikedArticles: async (params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<ArticlesResponse>> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());

    const queryString = searchParams.toString();

    const response = await httpClient.get<PaginatedResponse<ArticlesResponse>>(
      `/articles/my/liked${queryString ? `?${queryString}` : ""}`,
    );
    return response;
  },

  getById: async (id: string): Promise<ApiResponse<ArticleResponse>> => {
    const response = await httpClient.get<ApiResponse<ArticleResponse>>(
      `/articles/${id}`,
    );
    if (response === null) {
      throw new Error(`Article with id ${id} not found`);
    }
    return response;
  },

  create: async (
    title: string,
    content: string,
  ): Promise<ApiResponse<ArticleCreateResponse>> => {
    const response = await httpClient.post<ApiResponse<ArticleCreateResponse>>(
      "/articles",
      {
        title,
        content,
      },
    );
    if (response === null) {
      throw new Error("Failed to create article");
    }
    return response;
  },

  update: async (
    id: string,
    title?: string,
    content?: string,
  ): Promise<ApiResponse<ArticleResponse>> => {
    const response = await httpClient.patch<ApiResponse<ArticleResponse>>(
      `/articles/${id}`,
      {
        title,
        content,
      },
    );
    if (response === null) {
      throw new Error(`Failed to update article with id ${id}`);
    }
    return response;
  },

  delete: async (id: string): Promise<void> => {
    const response = await httpClient.delete<ApiResponse<null>>(
      `/articles/${id}`,
    );
    if (response === null) {
      throw new Error(`Failed to delete article with id ${id}`);
    }
  },
};
