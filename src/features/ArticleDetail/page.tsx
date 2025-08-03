import React from "react";

import { EditorContent } from "@tiptap/react";
import { ThumbsUp } from "lucide-react";

import { cn } from "@/lib/utils";

import NotFound from "@/components/layouts/not-found";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useArticleDetailStore } from "./hook";
import { CommentSection, DialogComment } from "./section";

const ArticleDetail: React.FC = () => {
  const {
    editor,
    handleLikeArticle,
    handleUnikeArticle,
    isError,
    mutateLiked,
    mutateUnliked,
    queryDetail,
    queryComment,
  } = useArticleDetailStore();

  if (isError) {
    <NotFound />;
  }

  return (
    <main className="container mx-auto px-4">
      <section className="rounded-lg border p-4">
        {queryComment.isLoading ? (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <Skeleton className="h-10 w-60" />
            </div>
            <Skeleton className="h-[60svh] w-full" />
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <p className="text-muted-foreground text-xs">Article</p>
              <h1 className="text-2xl font-semibold">
                {queryDetail.data?.title}
              </h1>
            </div>
            <div className="minimal-tiptap-editor prose prose-lg max-w-none">
              <EditorContent editor={editor} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={
                        queryDetail.data?.isLikedByUser ? "default" : "ghost"
                      }
                      disabled={
                        mutateLiked.isPending || mutateUnliked.isPending
                      }
                      onClick={() => {
                        if (queryDetail.data?.isLikedByUser) {
                          handleUnikeArticle();
                        } else {
                          handleLikeArticle();
                        }
                      }}
                    >
                      <ThumbsUp className={cn("")} />
                      <p>{queryDetail.data?.likesCount}</p>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{queryDetail.data?.isLikedByUser ? "Unlike" : "Like"}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-muted-foreground text-sm">
                {queryDetail.data?.createdAt
                  ? new Date(queryDetail.data?.createdAt).toLocaleDateString(
                      "en-EN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )
                  : queryDetail.data?.createdAt}
              </p>
            </div>
          </div>
        )}

        <Separator className="my-8" />
        {queryComment.isLoading ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        ) : (
          <CommentSection />
        )}
      </section>

      <DialogComment />
    </main>
  );
};

export default ArticleDetail;
