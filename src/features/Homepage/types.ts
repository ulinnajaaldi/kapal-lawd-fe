import type { Options } from "nuqs";

import type { ArticlesUseCases } from "@/useCases/Articles";

export interface HomepageStoreProps {
  query: string | null;
  setQuery: (
    value: string | ((old: string | null) => string | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>;
  page: number | null;
  setPage: (
    value: number | ((old: number | null) => number | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>;
  limit: number | null;
  isSortByOpen: boolean;
  setIsSortByOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sortBy: string | null;
  setSortBy: (
    value: string | ((old: string | null) => string | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>;
  isSortOrderOpen: boolean;
  setIsSortOrderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sortOrder: string | null;
  setSortOrder: (
    value: string | ((old: string | null) => string | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>;
  queryArticles: ReturnType<typeof ArticlesUseCases.useGetArticles>;
  isFilterOpen: boolean;
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
}
