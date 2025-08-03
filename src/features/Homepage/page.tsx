import React from "react";

import { ArticleSection } from "./section";

const Homepage: React.FC = () => {
  return (
    <main className="container mx-auto px-4">
      <section className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-2xl font-bold md:text-3xl">
          Best Travel Article is here!
        </h1>
        <p className="text-sm font-medium md:text-base">
          Discover the most amazing travel destinations and tips.
        </p>
      </section>
      <ArticleSection />
    </main>
  );
};

export default Homepage;
