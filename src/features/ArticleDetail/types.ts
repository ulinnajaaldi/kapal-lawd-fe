import React from "react";

import { Editor } from "@tiptap/react";
import { type Options } from "nuqs";
import { type UseFormReturn } from "react-hook-form";
import { z } from "zod";

import type { IGetProfile } from "@/domains/User";

import { ArticlesUseCases } from "@/useCases/Articles";
import { CommentsUseCases } from "@/useCases/Comments";
import { LikesUseCases } from "@/useCases/Likes";

export interface ArticleDetailStoreProps {
  data: IGetProfile | null;
  page: number | null;
  setPage: (
    value: number | ((old: number | null) => number | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>;
  limit: number | null;
  isAddComment: boolean;
  setIsAddComment: React.Dispatch<React.SetStateAction<boolean>>;
  isEditComment: boolean;
  setIsEditComment: React.Dispatch<React.SetStateAction<boolean>>;
  selectedComment: string;
  setSelectedComment: React.Dispatch<React.SetStateAction<string>>;
  isDeleteComment: boolean;
  setIsDeleteComment: React.Dispatch<React.SetStateAction<boolean>>;
  queryDetail: ReturnType<typeof ArticlesUseCases.useGetArticleById>;
  queryComment: ReturnType<typeof CommentsUseCases.useGetByArticleId>;
  mutateAddComment: ReturnType<typeof CommentsUseCases.useCreateComment>;
  mutateEditComment: ReturnType<typeof CommentsUseCases.useUpdateComment>;
  mutateDeleteComment: ReturnType<typeof CommentsUseCases.useDeleteComment>;
  mutateLiked: ReturnType<typeof LikesUseCases.useLikedArticle>;
  mutateUnliked: ReturnType<typeof LikesUseCases.useUnlikedArticle>;
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  handleLikeArticle: () => void;
  handleUnikeArticle: () => void;
  handleEditComment: (values: z.infer<typeof formSchema>) => void;
  handleDeleteComment: () => void;
  editor: Editor;
  isError: boolean;
}

export const formSchema = z.object({
  content: z.string().min(1, {
    message: "Content is required",
  }),
});
