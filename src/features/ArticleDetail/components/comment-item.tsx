import React from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import type { CommentsResponse } from "@/domains/Comment";

import {
  CodeBlockLowlight,
  Color,
  FileHandler,
  HorizontalRule,
  Image,
  ResetMarksOnEnter,
  UnsetAllMarks,
} from "@/components/common/minimal-tiptap/extensions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CommentItem: React.FC<{ comment: CommentsResponse }> = ({ comment }) => {
  const commentEditor = useEditor(
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
      content: comment.content || "",
      editable: false,
      editorProps: {
        attributes: {
          class: "focus:outline-none",
        },
      },
    },
    [comment.content],
  );

  return (
    <Card key={comment.id} className="py-3">
      <CardContent className="flex flex-col gap-3 px-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="size-7">
              <AvatarImage
                src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${comment.author?.name || "Unknown"}`}
              />
              <AvatarFallback>KL</AvatarFallback>
            </Avatar>
            <p className="font-medium">{comment.author.name}</p>
          </div>
          <p className="text-muted-foreground text-sm">
            {comment.createdAt
              ? new Date(comment.createdAt).toLocaleDateString("en-EN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : comment.createdAt}
          </p>
        </div>
        <Separator />
        <div className="minimal-tiptap-editor prose prose-lg max-w-none">
          <EditorContent editor={commentEditor} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentItem;
