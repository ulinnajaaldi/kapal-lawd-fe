import React from "react";

import { Filter, FilterX } from "lucide-react";

import ArticleCard from "@/components/common/article-card";
import ArticleCardSkeleton from "@/components/common/article-card-skeleton";
import PaginationDynamic from "@/components/common/pagination-dynamic";
import { Button } from "@/components/ui/button";

import { ArticleFilter } from "../components";
import { useHomepageStore } from "../hook";

const ArticleSection: React.FC = () => {
  const {
    queryArticles,
    page,
    setPage,
    isFilterOpen,
    setIsFilterOpen,
    isMobile,
  } = useHomepageStore();

  return (
    <section className="flex flex-col gap-5">
      <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
        <div className="flex w-full items-center justify-between md:flex-row">
          <p className="font-semibold">Articles</p>
          {isMobile ? (
            <Button
              size="icon"
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              {isFilterOpen ? <FilterX /> : <Filter />}
              <span className="sr-only">
                {isFilterOpen ? "Close Filter" : "Open Filter"}
              </span>
            </Button>
          ) : null}
        </div>
        {isMobile ? (
          <ArticleFilter
            className={`${isFilterOpen ? "flex w-full flex-wrap" : "hidden"}`}
          />
        ) : (
          <ArticleFilter className="w-full" />
        )}
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {queryArticles.isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <ArticleCardSkeleton key={index} />
          ))
        ) : (queryArticles.data?.meta?.total ?? 0) > 0 ? (
          queryArticles.data?.data.map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))
        ) : (
          <p className="col-span-2 py-20 text-center font-semibold">
            No articles found.
          </p>
        )}
      </div>
      {queryArticles.data && queryArticles.data.data.length > 0 && (
        <PaginationDynamic
          page={page}
          setPage={setPage}
          data={queryArticles.data}
          className="justify-end"
        />
      )}
    </section>
  );
};

export default ArticleSection;
