import type { IGetProfile } from "@/domains/User";

import { httpClient } from "@/lib/http-client";

import type { ApiResponse } from "@/types/api";

export const UserService = {
  update: async (
    userId: string,
    name: string,
  ): Promise<ApiResponse<IGetProfile>> => {
    const response = await httpClient.patch<ApiResponse<IGetProfile>>(
      `/users/${userId}`,
      {
        name,
      },
    );

    if (response === null) {
      throw new Error(`Failed to update profile`);
    }
    return response;
  },

  delete: async (userId: string): Promise<ApiResponse<IGetProfile>> => {
    const response = await httpClient.delete<ApiResponse<IGetProfile>>(
      `/users/${userId}`,
    );

    if (response === null) {
      throw new Error(`Failed to delete profile`);
    }
    return response;
  },
};
