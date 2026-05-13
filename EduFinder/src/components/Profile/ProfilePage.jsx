import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopNavigation from "../Home/TopNavigation";
import Footer from "../Home/Footer";
import DashboardContentSection from "./DashboardContentSection";

export const ProfilePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fb]">
      <TopNavigation />
      
      <main className="flex-grow py-12 px-8">
        <div className="max-w-7xl mx-auto">
           <DashboardContentSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
