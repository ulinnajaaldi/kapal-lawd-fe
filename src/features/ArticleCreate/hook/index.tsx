import React, { createContext, useContext } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

import { ArticlesUseCases } from "@/useCases/Articles";

import { ROUTES } from "@/constants/routes";

import { type ArticleCreateProps, formSchema } from "../types";

const ArticleCreate = createContext<ArticleCreateProps | undefined>(undefined);

export const ArticleCreateProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const mutate = ArticlesUseCases.useCreateArticle();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate.mutate(values, {
      onSuccess: () => {
        navigate(ROUTES.PROFILE, { replace: true });
      },
    });
  };

  return (
    <ArticleCreate.Provider
      value={{
        form,
        mutate,
        onSubmit,
      }}
    >
      {children}
    </ArticleCreate.Provider>
  );
};

export const useArticleCreate = () => {
  const context = useContext(ArticleCreate);
  if (context === undefined) {
    throw new Error(
      "useArticleCreate must be used within a ArticleCreateProvider",
    );
  }

  return context;
};
