import { create } from "zustand";

import type { IGetProfile } from "@/domains/User";

interface IAuthStore {
  data: IGetProfile | null;
  setData: (data: IGetProfile | null) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  data: null,
  setData: (data: IGetProfile | null) => set({ data }),
}));
