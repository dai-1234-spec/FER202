import React from "react";

export const EnrollmentCTASection = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="relative overflow-hidden rounded-3xl bg-[#0052cc] p-12 text-center text-white shadow-2xl">
        {/* Abstract background blobs */}
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-[#feaa00]/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold lg:text-4xl leading-tight">
            Bắt đầu hành trình chinh phục ngôn ngữ ngay hôm nay!
          </h2>
          <p className="mb-10 text-lg text-white/80 leading-relaxed">
            Đừng bỏ lỡ cơ hội nhận học bổng lên đến 30% và bộ tài liệu luyện thi độc quyền khi đăng ký tư vấn trong tháng này.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="rounded-full bg-[#feaa00] px-10 py-4 text-lg font-bold text-[#684300] shadow-lg transition-all hover:bg-[#e59900] hover:scale-105 active:scale-95">
              Đăng ký tư vấn miễn phí
            </button>
            <button className="rounded-full border border-white/30 bg-white/10 px-10 py-4 text-lg font-semibold backdrop-blur-md transition-all hover:bg-white/20">
              Tải brochure khóa học
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnrollmentCTASection;
