import React from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ARTICLES_SORT_BY, ARTICLES_SORT_ORDER } from "../config";
import { useHomepageStore } from "../hook";

const ArticleFilter: React.FC<{
  className?: string;
}> = ({ className }) => {
  const {
    query,
    setQuery,
    isSortByOpen,
    setIsSortByOpen,
    sortBy,
    setSortBy,
    isSortOrderOpen,
    setIsSortOrderOpen,
    sortOrder,
    setSortOrder,
  } = useHomepageStore();

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <Input
        type="search"
        value={query || ""}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        placeholder="Search articles..."
        className="w-auto lg:w-64"
      />
      <Popover open={isSortByOpen} onOpenChange={setIsSortByOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isSortByOpen}
            className="w-[128px] justify-between"
          >
            {sortBy
              ? ARTICLES_SORT_BY.find((data) => data.value === sortBy)?.label
              : "Sort By"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[128px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No sort by found.</CommandEmpty>
              <CommandGroup>
                {ARTICLES_SORT_BY.map((data) => (
                  <CommandItem
                    key={data.value}
                    value={data.value}
                    onSelect={(currentValue) => {
                      setSortBy(currentValue === sortBy ? "" : currentValue);
                      setIsSortByOpen(false);
                    }}
                  >
                    {data.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        sortBy === data.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={isSortOrderOpen} onOpenChange={setIsSortOrderOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isSortOrderOpen}
            className="w-[120px] justify-between"
          >
            {sortOrder
              ? ARTICLES_SORT_ORDER.find((data) => data.value === sortOrder)
                  ?.label
              : "Sort Order"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[120px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No sort order found.</CommandEmpty>
              <CommandGroup>
                {ARTICLES_SORT_ORDER.map((data) => (
                  <CommandItem
                    key={data.value}
                    value={data.value}
                    onSelect={(currentValue) => {
                      setSortOrder(currentValue === sortBy ? "" : currentValue);
                      setIsSortOrderOpen(false);
                    }}
                  >
                    {data.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        sortBy === data.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ArticleFilter;
