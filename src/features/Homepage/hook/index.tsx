import React, { createContext, useContext, useState } from "react";

import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";

import { ArticlesUseCases } from "@/useCases/Articles";

import { useMediaQuery } from "@/hooks/use-media-query";

import type { HomepageStoreProps } from "../types";

const HomepageStore = createContext<HomepageStoreProps | undefined>(undefined);

export const HomepageFeatureStore: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [query, setQuery] = useQueryState("query");
  const [valueQuery] = useDebounce(query, 500);
  const [page, setPage] = useQueryState("page", parseAsInteger);
  const [limit, _] = useQueryState("limit", parseAsInteger);
  const [isSortByOpen, setIsSortByOpen] = useState(false);
  const [sortBy, setSortBy] = useQueryState("sortBy");
  const [isSortOrderOpen, setIsSortOrderOpen] = useState(false);
  const [sortOrder, setSortOrder] = useQueryState("sortOrder");

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const queryArticles = ArticlesUseCases.useGetArticles({
    query: valueQuery && valueQuery.length >= 2 ? valueQuery : undefined,
    page: page ?? 1,
    limit: limit ?? 10,
    sortBy:
      sortBy !== ""
        ? (sortBy as "createdAt" | "updatedAt" | "title")
        : undefined,
    sortOrder:
      sortOrder !== "" ? (sortOrder as "ASC" | "DESC" | "") : undefined,
  });

  return (
    <HomepageStore.Provider
      value={{
        query,
        setQuery,
        page,
        setPage,
        limit,
        isSortByOpen,
        setIsSortByOpen,
        sortBy,
        setSortBy,
        isSortOrderOpen,
        setIsSortOrderOpen,
        sortOrder,
        setSortOrder,
        queryArticles,
        isFilterOpen,
        setIsFilterOpen,
        isMobile,
      }}
    >
      {children}
    </HomepageStore.Provider>
  );
};

export const useHomepageStore = () => {
  const context = useContext(HomepageStore);
  if (context === undefined) {
    throw new Error(
      "useHomepageStore must be used within a HomepageFeatureStore",
    );
  }

  return context;
};
