import React from "react";

import { ArticleDetailFeatureStore } from "./hook";
import ArticleDetail from "./page";

const ArticleDetailFeature: React.FC = () => {
  return (
    <ArticleDetailFeatureStore>
      <ArticleDetail />
    </ArticleDetailFeatureStore>
  );
};

export default ArticleDetailFeature;
