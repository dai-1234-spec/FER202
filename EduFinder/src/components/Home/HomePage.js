import React from "react";
import TopNavigation from "./TopNavigation";
import HeroSection from "./HeroSection";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#f4f5f7]">
      <TopNavigation />
      <main className="flex-1 flex flex-col">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
