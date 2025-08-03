import React from "react";

import { Edit, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router";

import { ROUTES } from "@/constants/routes";

import ArticleCard from "@/components/common/article-card";
import ArticleCardSkeleton from "@/components/common/article-card-skeleton";
import PaginationDynamic from "@/components/common/pagination-dynamic";
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
import { Separator } from "@/components/ui/separator";

import { useProfileStore } from "./hook";
import { ProfileSection } from "./section";

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const {
    pageArticles,
    setPageArticles,
    pageLikedArticles,
    setPageLikedArticles,
    queryArticles,
    queryLikedArticles,
    selectedIdDelete,
    isDeleteArticle,
    setIsDeleteArticle,
    setSelectedIdDelete,
    handleConfirmDeleteArticle,
  } = useProfileStore();

  return (
    <main className="container mx-auto flex flex-col gap-5 px-4">
      <ProfileSection />

      <Separator />

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h1 className="font-medium">My Articles</h1>
          <Button asChild>
            <Link to={ROUTES.MAKE_ARTICLE}>Create new Article</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {queryArticles.isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <ArticleCardSkeleton key={index} />
            ))
          ) : (queryArticles.data?.meta?.total ?? 0) > 0 ? (
            queryArticles.data?.data.map((article) => (
              <div
                key={article.id}
                className="flex w-full items-start justify-between gap-2"
              >
                <div className="w-full">
                  <ArticleCard article={article} />
                </div>
                <div className="flex w-fit flex-col gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => navigate(ROUTES.UPDATE_ARTICLE(article.id))}
                  >
                    <Edit />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => {
                      setIsDeleteArticle(true);
                      setSelectedIdDelete({
                        id: article.id,
                        title: article.title,
                      });
                    }}
                  >
                    <Trash />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-2 py-20 text-center font-semibold">
              No articles found.
            </p>
          )}
        </div>

        {queryArticles.data && queryArticles.data.data.length > 0 && (
          <PaginationDynamic
            page={pageArticles}
            setPage={setPageArticles}
            data={queryArticles.data}
            className="justify-end"
          />
        )}
      </section>

      <Separator />

      <section className="flex flex-col gap-3">
        <h1>Liked Articles</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {queryLikedArticles.isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <ArticleCardSkeleton key={index} />
            ))
          ) : (queryLikedArticles.data?.meta?.total ?? 0) > 0 ? (
            queryLikedArticles.data?.data.map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))
          ) : (
            <p className="col-span-2 py-20 text-center font-semibold">
              No liked articles found.
            </p>
          )}
        </div>
        {queryLikedArticles.data && queryLikedArticles.data.data.length > 0 && (
          <PaginationDynamic
            page={pageLikedArticles}
            setPage={setPageLikedArticles}
            data={queryLikedArticles.data}
            className="justify-end"
          />
        )}
      </section>

      <AlertDialog open={isDeleteArticle} onOpenChange={setIsDeleteArticle}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {selectedIdDelete.title}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this article? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDeleteArticle}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default Profile;
