import httpClient from "@/lib/http-client";

export const LikesService = {
  liked: async (id: string): Promise<void> => {
    const response = await httpClient.post<void>(`/articles/${id}/like`);
    if (response === null) {
      throw new Error("Failed to like article");
    }
  },

  unliked: async (id: string): Promise<void> => {
    const response = await httpClient.delete<void>(`/articles/${id}/like`);
    if (response === null) {
      throw new Error("Failed to unlike article");
    }
  },
};
