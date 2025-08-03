import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import type { ArticlesUseCases } from "@/useCases/Articles";

export interface ArticleCreateProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  mutate: ReturnType<typeof ArticlesUseCases.useCreateArticle>;
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
