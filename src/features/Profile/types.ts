import type { Options } from "nuqs";
import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import type { IGetProfile } from "@/domains/User";

import type { ArticlesUseCases } from "@/useCases/Articles";
import type { UserUseCases } from "@/useCases/User";

export interface ProfileStoreProps {
  data: IGetProfile | null;
  pageArticles: number | null;
  setPageArticles: (
    value: number | ((old: number | null) => number | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>;
  limitArticles: number | null;
  pageLikedArticles: number | null;
  setPageLikedArticles: (
    value: number | ((old: number | null) => number | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>;
  limitLikedArticles: number | null;
  isEditProfile: boolean;
  setIsEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteAccount: boolean;
  setIsDeleteAccount: React.Dispatch<React.SetStateAction<boolean>>;
  queryArticles: ReturnType<typeof ArticlesUseCases.useGetMyArticles>;
  queryLikedArticles: ReturnType<typeof ArticlesUseCases.useGetMyLikedArticles>;
  form: UseFormReturn<z.infer<typeof formSchema>>;
  mutateUpdate: ReturnType<typeof UserUseCases.useUpdateProfile>;
  mutateDelete: ReturnType<typeof UserUseCases.useDeleteUser>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  handleConfirmDelete: () => void;
  selectedIdDelete: {
    id: string;
    title: string;
  };
  setSelectedIdDelete: React.Dispatch<
    React.SetStateAction<{
      id: string;
      title: string;
    }>
  >;
  isDeleteArticle: boolean;
  setIsDeleteArticle: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirmDeleteArticle: () => void;
}

export const formSchema = z.object({
  name: z.string().min(1).min(1),
});
