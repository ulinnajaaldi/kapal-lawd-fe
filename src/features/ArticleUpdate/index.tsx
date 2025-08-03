import React from "react";

import { ArticleUpdateProvider } from "./hook";
import ArticleUpdate from "./page";

const ArticleUpdateFeature: React.FC = () => {
  return (
    <ArticleUpdateProvider>
      <ArticleUpdate />
    </ArticleUpdateProvider>
  );
};

export default ArticleUpdateFeature;
