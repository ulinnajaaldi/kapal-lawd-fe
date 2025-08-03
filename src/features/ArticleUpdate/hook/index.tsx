import React, { createContext, useContext, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";

import { ArticlesUseCases } from "@/useCases/Articles";

import { ROUTES } from "@/constants/routes";

import { type ArticleUpdateProps, formSchema } from "../types";

const ArticleUpdate = createContext<ArticleUpdateProps | undefined>(undefined);

export const ArticleUpdateProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const queryDetail = ArticlesUseCases.useGetArticleById({ id: id ?? "" });

  const mutate = ArticlesUseCases.useUpdateArticle({ id: id ?? "" });

  useEffect(() => {
    if (queryDetail.data) {
      form.setValue("title", queryDetail.data.title);
      form.setValue("content", queryDetail.data.content);
    }
  }, [queryDetail, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate.mutate(values, {
      onSuccess: () => {
        navigate(ROUTES.PROFILE, { replace: true });
      },
    });
  };

  return (
    <ArticleUpdate.Provider
      value={{
        form,
        queryDetail,
        mutate,
        onSubmit,
      }}
    >
      {children}
    </ArticleUpdate.Provider>
  );
};

export const useArticleUpdate = () => {
  const context = useContext(ArticleUpdate);
  if (context === undefined) {
    throw new Error(
      "useArticleUpdate must be used within a ArticleUpdateProvider",
    );
  }

  return context;
};
