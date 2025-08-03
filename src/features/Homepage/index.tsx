import React from "react";

import { HomepageFeatureStore } from "./hook";
import Homepage from "./page";

const HomepageFeature: React.FC = () => {
  return (
    <HomepageFeatureStore>
      <Homepage />
    </HomepageFeatureStore>
  );
};

export default HomepageFeature;
