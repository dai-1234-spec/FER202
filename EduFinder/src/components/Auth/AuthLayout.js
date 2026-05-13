import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, CheckCircle, Users } from "lucide-react";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <main className="flex min-h-screen items-start relative bg-[#f8f9fb]">
      <div className="flex min-h-screen items-start relative self-stretch w-full">
        {/* Left Section - Hero */}
        <section className="hidden lg:flex w-[768px] items-center justify-center p-6 relative self-stretch bg-primary overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute w-full h-full top-0 left-0 opacity-20 pointer-events-none">
            <div className="absolute top-[-102px] left-[-77px] w-[307px] h-[410px] bg-secondary rounded-full blur-[100px]" />
            <div className="absolute right-[-77px] bottom-[-102px] w-[307px] h-[410px] bg-accent rounded-full blur-[100px]" />
          </div>

          <div className="inline-flex flex-col max-w-lg items-start gap-8 relative z-10">
            {/* Image Container */}
            <div className="flex flex-col items-start relative self-stretch w-full bg-white/5 rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm animate-fade-up">
              <img
                src="/education-hub.png"
                alt="Education Hub"
                className="w-full h-auto aspect-video object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <h1 className="text-white text-4xl font-bold leading-tight">
                Nâng tầm tri thức Việt
              </h1>
              <p className="text-white/80 text-lg leading-relaxed">
                Khám phá hàng ngàn khóa học chất lượng từ các trung tâm ngoại ngữ uy tín nhất. 
                EduFinder đồng hành cùng bạn trên con đường chinh phục đỉnh cao mới.
              </p>
            </div>

            {/* Badges */}
            <div className="flex gap-4 pt-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 rounded-full backdrop-blur-md">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span className="text-white text-sm font-medium">Trung tâm kiểm định</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 rounded-full backdrop-blur-md">
                <Users className="w-5 h-5 text-accent" />
                <span className="text-white text-sm font-medium">10,000+ Học viên</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Section - Form */}
        <section className="flex-1 flex items-center justify-center px-4 py-12 relative self-stretch bg-[#f8f9fb]">
          <div className="w-full max-w-[480px] bg-white p-10 rounded-2xl border border-[#c3c6d64c] shadow-[0px_8px_24px_rgba(0,61,155,0.08)] animate-fade-in">
            <header className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#191c1e] mb-2">{title}</h2>
              <p className="text-[#434654] text-sm">{subtitle}</p>
            </header>
            
            {children}
            
            <footer className="mt-8 text-center">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="w-5 h-5 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] text-secondary font-bold">i</span>
                </div>
                <p className="text-[#737685] text-xs leading-relaxed text-left">
                  Bằng cách đăng nhập, bạn đồng ý với{" "}
                  <span className="text-primary font-semibold cursor-pointer">Điều khoản</span> &{" "}
                  <span className="text-primary font-semibold cursor-pointer">Chính sách bảo mật</span> của EduFinder.
                </p>
              </div>
            </footer>
          </div>
        </section>
      </div>

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center pointer-events-none">
        <button className="flex items-center gap-2 text-[#434654] font-medium text-sm hover:text-primary transition-colors pointer-events-auto">
          <ChevronLeft className="w-4 h-4" />
          <span>Trở lại</span>
        </button>
        <div className="text-primary text-2xl font-bold tracking-tight pointer-events-auto">
          EduFinder
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="absolute bottom-0 left-0 w-full p-6 text-center text-[#737685] text-xs pointer-events-none">
        © 2024 EduFinder. Nâng tầm tri thức Việt.
      </div>
    </main>
  );
};

export default AuthLayout;
