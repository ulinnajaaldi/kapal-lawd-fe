import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import type { ArticlesUseCases } from "@/useCases/Articles";

export interface ArticleUpdateProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  queryDetail: ReturnType<typeof ArticlesUseCases.useGetArticleById>;
  mutate: ReturnType<typeof ArticlesUseCases.useUpdateArticle>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  content: z.string().min(1, {
    message: "Content is required",
  }),
});
