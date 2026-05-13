import React from "react";
import TopNavigation from "../Home/TopNavigation";
import { SearchResultsSection } from "./SearchResultsSection";
import Footer from "../Home/Footer";

export const ListAllCenter = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fb]">
      <TopNavigation />
      <main className="flex-grow pt-20">
        <SearchResultsSection />
      </main>
      <Footer />
    </div>
  );
};

export default ListAllCenter;
