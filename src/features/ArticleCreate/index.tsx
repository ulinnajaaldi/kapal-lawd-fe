import React from "react";

import { ArticleCreateProvider } from "./hook";
import ArticleCreate from "./page";

const ArticleCreateFeature: React.FC = () => {
  return (
    <ArticleCreateProvider>
      <ArticleCreate />
    </ArticleCreateProvider>
  );
};

export default ArticleCreateFeature;
