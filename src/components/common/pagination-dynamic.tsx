import React from "react";

import type { Options } from "nuqs";

import { cn } from "@/lib/utils";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import type { PaginatedData } from "@/types/api";

interface IPaginationDynamic {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: PaginatedData<any>;
  page: number | null;
  setPage: (
    value: number | ((old: number | null) => number | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>;
  className?: string;
}

const PaginationDynamic: React.FC<IPaginationDynamic> = (props) => {
  const { data, page, setPage, className } = props;

  return (
    <Pagination className={cn(className)}>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (data?.meta?.hasPrev) {
                setPage((page ?? 1) - 1);
              }
            }}
            className={
              !data?.meta?.hasPrev ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {/* Page Numbers */}
        {(() => {
          const currentPage = data?.meta?.page ?? 1;
          const totalPages = data?.meta?.totalPages ?? 0;
          const pages = [];

          if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
              pages.push(
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={i === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(i);
                    }}
                  >
                    {i}
                  </PaginationLink>
                </PaginationItem>,
              );
            }
          } else {
            pages.push(
              <PaginationItem key={1}>
                <PaginationLink
                  href="#"
                  isActive={1 === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(1);
                  }}
                >
                  1
                </PaginationLink>
              </PaginationItem>,
            );

            if (currentPage > 3) {
              pages.push(
                <PaginationItem key="ellipsis-start">
                  <PaginationEllipsis />
                </PaginationItem>,
              );
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
              pages.push(
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={i === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(i);
                    }}
                  >
                    {i}
                  </PaginationLink>
                </PaginationItem>,
              );
            }

            if (currentPage < totalPages - 2) {
              pages.push(
                <PaginationItem key="ellipsis-end">
                  <PaginationEllipsis />
                </PaginationItem>,
              );
            }

            if (totalPages > 1) {
              pages.push(
                <PaginationItem key={totalPages}>
                  <PaginationLink
                    href="#"
                    isActive={totalPages === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(totalPages);
                    }}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>,
              );
            }
          }

          return pages;
        })()}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (data?.meta?.hasNext) {
                setPage((page ?? 1) + 1);
              }
            }}
            className={
              !data?.meta?.hasNext ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationDynamic;
