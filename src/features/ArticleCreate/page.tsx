import React from "react";

import { Loader2 } from "lucide-react";

import { MinimalTiptapEditor } from "@/components/common/minimal-tiptap";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useArticleCreate } from "./hook";

const ArticleCreate: React.FC = () => {
  const { form, mutate, onSubmit } = useArticleCreate();

  return (
    <main className="container mx-auto px-4">
      <h1 className="mb-5 text-2xl font-bold">Create New Article</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Input here" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <MinimalTiptapEditor
                    value={field.value}
                    onChange={field.onChange}
                    className="w-full"
                    editorContentClassName="p-5"
                    output="html"
                    placeholder="Enter your content..."
                    autofocus={false}
                    editable={true}
                    editorClassName="focus:outline-hidden"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={mutate.isPending}
            className="w-fit self-end"
          >
            {mutate.isPending && <Loader2 className="animate-spin" />}
            Publish
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default ArticleCreate;
