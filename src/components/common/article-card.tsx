import React from "react";

import { MessageSquareMore, ThumbsUp } from "lucide-react";
import { Link } from "react-router";

import type { ArticlesResponse } from "@/domains/Article";

import { ROUTES } from "@/constants/routes";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IArticleCard {
  article: ArticlesResponse;
}

const ArticleCard: React.FC<IArticleCard> = ({ article }) => {
  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle>
          <Link
            to={ROUTES.ARTICLE_DETAIL(article.id)}
            className="hover:underline"
          >
            {article.title}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center justify-between">
          <p>
            {article.createdAt
              ? new Date(article.createdAt).toLocaleDateString("en-EN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : article.createdAt}
          </p>
          <div className="flex items-center gap-2">
            {article.likesCount && (
              <div className="flex items-center gap-1">
                <ThumbsUp className="size-4" />
                <span className="text-xs">{article.likesCount}</span>
              </div>
            )}
            {article.commentsCount && (
              <div className="flex items-center gap-1">
                <MessageSquareMore className="size-4" />
                <span className="text-xs">{article.commentsCount}</span>
              </div>
            )}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Avatar className="size-7">
            <AvatarImage
              src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${article.author?.name || "Unknown"}`}
            />
            <AvatarFallback>KL</AvatarFallback>
          </Avatar>
          <p className="text-sm">
            {article.author?.name
              ? (article.author?.name || "").length > 100
                ? `${(article.author?.name || "").slice(0, 100)}...`
                : article.author?.name || ""
              : "Deleted User"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
