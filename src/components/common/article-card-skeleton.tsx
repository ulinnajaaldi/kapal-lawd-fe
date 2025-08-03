import React from "react";

import { Skeleton } from "../ui/skeleton";

const ArticleCardSkeleton: React.FC = () => {
  return (
    <div className="bg-accent/40 flex h-[120px] w-full animate-pulse flex-col justify-between rounded-xl p-6">
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-5 w-full" />
    </div>
  );
};

export default ArticleCardSkeleton;
