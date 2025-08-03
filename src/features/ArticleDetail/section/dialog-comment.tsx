import React from "react";

import { Loader2 } from "lucide-react";

import { MinimalTiptapEditor } from "@/components/common/minimal-tiptap";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useArticleDetailStore } from "../hook";

const DialogComment: React.FC = () => {
  const {
    form,
    handleDeleteComment,
    handleEditComment,
    isDeleteComment,
    isEditComment,
    mutateDeleteComment,
    mutateEditComment,
    setIsDeleteComment,
    setIsEditComment,
  } = useArticleDetailStore();

  return (
    <>
      <AlertDialog open={isDeleteComment} onOpenChange={setIsDeleteComment}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              comment and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={mutateDeleteComment.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={mutateDeleteComment.isPending}
              onClick={handleDeleteComment}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isEditComment} onOpenChange={setIsEditComment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Comment</DialogTitle>
            <DialogDescription>Edit your comment below:</DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleEditComment)}
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
                    onClick={() => setIsEditComment(false)}
                    disabled={mutateEditComment.isPending}
                    type="button"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={mutateEditComment.isPending}
                    className="w-fit self-end"
                  >
                    {mutateEditComment.isPending && (
                      <Loader2 className="animate-spin" />
                    )}
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogComment;
