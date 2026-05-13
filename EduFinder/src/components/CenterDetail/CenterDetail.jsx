import React from "react";
import TopNavigation from "../Home/TopNavigation";
import Footer from "../Home/Footer";
import HeroBannerSection from "./HeroBannerSection";
import ProgramOverviewSection from "./ProgramOverviewSection";
import FeaturedCoursesSection from "./FeaturedCoursesSection";
import TeacherProfilesSection from "./TeacherProfilesSection";
import StudentTestimonialsSection from "./StudentTestimonialsSection";
import EnrollmentCTASection from "./EnrollmentCTASection";

// Reusing some generated images for the gallery
import heroImg from "../../assets/hero_center_detail.png";
import courseIelts from "../../assets/course_ielts.png";
import courseBusiness from "../../assets/course_business.png";

const facilityImages = [
  { id: 1, src: heroImg, alt: "Sảnh đón khách hiện đại" },
  { id: 2, src: courseIelts, alt: "Phòng học chuẩn quốc tế" },
  { id: 3, src: courseBusiness, alt: "Phòng lab hiện đại" },
];

export const CenterDetail = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fb]">
      <TopNavigation />
      
      <main className="flex-grow pt-16">
        <HeroBannerSection />
        
        <div className="bg-white/50 backdrop-blur-sm">
          <ProgramOverviewSection />
        </div>
        
        <FeaturedCoursesSection />
        
        <TeacherProfilesSection />
        
        <StudentTestimonialsSection />
        
        {/* Facility Gallery */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <header className="mb-10 text-left">
            <h2 className="text-3xl font-bold text-[#191c1e]">Cơ sở vật chất chuẩn quốc tế</h2>
            <div className="mt-2 h-1 w-20 bg-[#feaa00] rounded-full" />
          </header>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
             <div className="md:col-span-2">
                <img 
                  src={facilityImages[0].src} 
                  alt={facilityImages[0].alt} 
                  className="h-[400px] w-full rounded-2xl object-cover shadow-lg transition-transform hover:scale-[1.01]"
                />
             </div>
             <div className="flex flex-col gap-6">
                {facilityImages.slice(1).map((img) => (
                  <img 
                    key={img.id}
                    src={img.src} 
                    alt={img.alt} 
                    className="h-[188px] w-full rounded-2xl object-cover shadow-lg transition-transform hover:scale-[1.02]"
                  />
                ))}
             </div>
          </div>
        </section>

        <EnrollmentCTASection />
      </main>

      <Footer />
    </div>
  );
};

export default CenterDetail;
