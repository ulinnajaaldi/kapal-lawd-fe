import React, { createContext, useContext, useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { parseAsInteger, useQueryState } from "nuqs";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ArticlesUseCases } from "@/useCases/Articles";
import { UserUseCases } from "@/useCases/User";

import { useAuthStore } from "@/hooks/use-auth";

import { ROUTES } from "@/constants/routes";

import { formSchema, type ProfileStoreProps } from "../types";

const ProfileStore = createContext<ProfileStoreProps | undefined>(undefined);

export const ProfileFeatureStore: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { data } = useAuthStore();

  const [pageArticles, setPageArticles] = useQueryState("page", parseAsInteger);
  const [limitArticles, _] = useQueryState("limit", parseAsInteger);
  const [pageLikedArticles, setPageLikedArticles] = useQueryState(
    "page",
    parseAsInteger,
  );
  const [limitLikedArticles, __] = useQueryState("limit", parseAsInteger);

  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isDeleteAccount, setIsDeleteAccount] = useState(false);
  const [selectedIdDelete, setSelectedIdDelete] = useState({
    id: "",
    title: "",
  });
  const [isDeleteArticle, setIsDeleteArticle] = useState(false);

  const queryArticles = ArticlesUseCases.useGetMyArticles({
    limit: limitArticles ?? 10,
    page: pageArticles ?? 1,
  });

  const queryLikedArticles = ArticlesUseCases.useGetMyLikedArticles({
    limit: limitLikedArticles ?? 10,
    page: pageLikedArticles ?? 1,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const mutateUpdate = UserUseCases.useUpdateProfile({
    userId: data?.id ?? "",
  });

  const mutateDelete = UserUseCases.useDeleteUser({
    userId: data?.id ?? "",
  });

  const mutateDeleteArticle = ArticlesUseCases.useDeleteArticle({
    id: selectedIdDelete.id,
  });

  useEffect(() => {
    if (data) {
      form.setValue("name", data.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutateUpdate.mutate({ name: values.name });
    setIsEditProfile(false);
  };

  const handleConfirmDelete = () => {
    mutateDelete.mutate(undefined, {
      onSuccess: () => {
        window.location.href = ROUTES.AUTH.LOGIN;
        setIsDeleteAccount(false);
      },
    });
  };

  const handleConfirmDeleteArticle = () => {
    mutateDeleteArticle.mutate(undefined, {
      onSuccess: () => {
        setIsDeleteArticle(false);
        setSelectedIdDelete({ id: "", title: "" });
      },
    });
  };

  return (
    <ProfileStore.Provider
      value={{
        data,
        pageArticles,
        setPageArticles,
        limitArticles,
        pageLikedArticles,
        setPageLikedArticles,
        limitLikedArticles,
        isEditProfile,
        setIsEditProfile,
        isDeleteAccount,
        setIsDeleteAccount,
        queryArticles,
        queryLikedArticles,
        form,
        mutateUpdate,
        mutateDelete,
        onSubmit,
        handleConfirmDelete,
        isDeleteArticle,
        selectedIdDelete,
        setIsDeleteArticle,
        setSelectedIdDelete,
        handleConfirmDeleteArticle,
      }}
    >
      {children}
    </ProfileStore.Provider>
  );
};

export const useProfileStore = () => {
  const context = useContext(ProfileStore);
  if (context === undefined) {
    throw new Error(
      "useProfileStore must be used within a ProfileFeatureStore",
    );
  }

  return context;
};
