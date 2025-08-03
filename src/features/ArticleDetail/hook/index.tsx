import React, { createContext, useContext, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { parseAsInteger, useQueryState } from "nuqs";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { z } from "zod";

import { ArticlesUseCases } from "@/useCases/Articles";
import { CommentsUseCases } from "@/useCases/Comments";
import { LikesUseCases } from "@/useCases/Likes";

import { useAuthStore } from "@/hooks/use-auth";

import {
  CodeBlockLowlight,
  Color,
  FileHandler,
  HorizontalRule,
  Image,
  ResetMarksOnEnter,
  UnsetAllMarks,
} from "@/components/common/minimal-tiptap/extensions";

import { type ArticleDetailStoreProps, formSchema } from "../types";

const ArticleDetailStore = createContext<ArticleDetailStoreProps | undefined>(
  undefined,
);

export const ArticleDetailFeatureStore: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { id } = useParams();
  const { data } = useAuthStore();
  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [limit, _] = useQueryState("limit", parseAsInteger);

  const [isAddComment, setIsAddComment] = useState(false);
  const [isEditComment, setIsEditComment] = useState(false);
  const [selectedComment, setSelectedComment] = useState("");
  const [isDeleteComment, setIsDeleteComment] = useState(false);

  const queryDetail = ArticlesUseCases.useGetArticleById({
    id: id ?? "",
  });
  const queryComment = CommentsUseCases.useGetByArticleId({
    articleId: id ?? "",
    page: page ?? 1,
    limit: limit ?? 10,
  });

  const mutateAddComment = CommentsUseCases.useCreateComment();
  const mutateEditComment = CommentsUseCases.useUpdateComment({
    id: selectedComment,
  });
  const mutateDeleteComment = CommentsUseCases.useDeleteComment({
    id: selectedComment,
  });
  const mutateLiked = LikesUseCases.useLikedArticle({
    id: id ?? "",
  });
  const mutateUnliked = LikesUseCases.useUnlikedArticle({
    id: id ?? "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutateAddComment.mutate(
      {
        articleId: id ?? "",
        content: values.content,
      },
      {
        onSuccess: () => {
          queryComment.refetch();
          form.reset({
            content: "",
          });
          setIsAddComment(false);
        },
      },
    );
  };

  const handleLikeArticle = () => {
    mutateLiked.mutate(undefined, {
      onSuccess: () => {
        queryDetail.refetch();
      },
    });
  };

  const handleUnikeArticle = () => {
    mutateUnliked.mutate(undefined, {
      onSuccess: () => {
        queryDetail.refetch();
      },
    });
  };

  const handleEditComment = (values: z.infer<typeof formSchema>) => {
    mutateEditComment.mutate(values, {
      onSuccess: () => {
        queryComment.refetch();
        form.reset({
          content: "",
        });
        setIsEditComment(false);
      },
    });
  };

  const handleDeleteComment = () => {
    mutateDeleteComment.mutate(undefined, {
      onSuccess: () => {
        queryComment.refetch();
      },
    });
  };

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        CodeBlockLowlight,
        Color,
        FileHandler,
        HorizontalRule,
        Image,
        ResetMarksOnEnter,
        UnsetAllMarks,
      ],
      content: queryDetail.data?.content || "",
      editable: false,
      editorProps: {
        attributes: {
          class: "focus:outline-none",
        },
      },
    },
    [queryDetail.data?.content],
  );

  const isError = queryDetail.isError || queryComment.isError;
  return (
    <ArticleDetailStore.Provider
      value={{
        data,
        editor,
        form,
        handleDeleteComment,
        handleEditComment,
        handleLikeArticle,
        handleUnikeArticle,
        isAddComment,
        isDeleteComment,
        isEditComment,
        isError,
        limit,
        mutateAddComment,
        mutateDeleteComment,
        mutateEditComment,
        mutateLiked,
        mutateUnliked,
        onSubmit,
        page,
        queryComment,
        queryDetail,
        selectedComment,
        setIsAddComment,
        setIsDeleteComment,
        setIsEditComment,
        setPage,
        setSelectedComment,
      }}
    >
      {children}
    </ArticleDetailStore.Provider>
  );
};

export const useArticleDetailStore = () => {
  const context = useContext(ArticleDetailStore);
  if (context === undefined) {
    throw new Error(
      "useProfileStore must be used within a ArticleDetailFeatureStore",
    );
  }

  return context;
};
