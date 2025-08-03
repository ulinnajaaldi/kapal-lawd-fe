import React from "react";

import { Edit, Loader2, Trash } from "lucide-react";

import { MinimalTiptapEditor } from "@/components/common/minimal-tiptap";
import PaginationDynamic from "@/components/common/pagination-dynamic";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { CommentItem } from "../components";
import { useArticleDetailStore } from "../hook";

const CommentSection: React.FC = () => {
  const {
    data,
    form,
    isAddComment,
    mutateAddComment,
    onSubmit,
    page,
    queryComment,
    setIsAddComment,
    setIsDeleteComment,
    setIsEditComment,
    setPage,
    setSelectedComment,
  } = useArticleDetailStore();

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Comments ({queryComment.data?.meta.total})
          </h2>
          {!isAddComment && (
            <Button variant="outline" onClick={() => setIsAddComment(true)}>
              Add Comment
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {queryComment.data?.data && queryComment.data.data.length > 0 ? (
            queryComment.data.data.map((comment) => (
              <div className="relative" key={comment.id}>
                <CommentItem comment={comment} />
                {data?.id === comment.authorId && (
                  <div className="absolute right-0 bottom-0 m-2 flex items-center gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="iconSm"
                          variant="outline"
                          onClick={() => {
                            form.setValue("content", comment.content);
                            setIsEditComment(true);
                            setSelectedComment(comment.id);
                          }}
                        >
                          <Edit />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          size="iconSm"
                          variant="outline"
                          onClick={() => {
                            setSelectedComment(comment.id);
                            setIsDeleteComment(true);
                          }}
                        >
                          <Trash />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No comments yet.</p>
          )}
        </div>
        {queryComment.data && queryComment.data.data.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground shrink-0 text-sm">
              Comment Pagination
            </p>
            <PaginationDynamic
              page={page}
              setPage={setPage}
              data={queryComment.data}
              className="justify-end"
            />
          </div>
        )}
      </div>

      {isAddComment && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto mt-5 flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
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

            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAddComment(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={mutateAddComment.isPending}
                className="w-fit self-end"
              >
                {mutateAddComment.isPending && (
                  <Loader2 className="animate-spin" />
                )}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

export default CommentSection;
