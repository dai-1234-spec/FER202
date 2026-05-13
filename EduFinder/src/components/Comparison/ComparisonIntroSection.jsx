import React from "react";

export const ComparisonIntroSection = () => {
  return (
    <section className="flex flex-col items-start gap-4 relative self-stretch w-full">
      <header className="flex flex-col items-start relative self-stretch w-full">
        <h2 className="relative flex items-center self-stretch font-bold text-[#003d9b] text-[28px] tracking-tight leading-9">
          So sánh trung tâm Anh ngữ
        </h2>
      </header>
      <div className="flex flex-col max-w-2xl items-start pb-2 relative">
        <p className="relative font-normal text-[#434654] text-base leading-6">
          Lựa chọn các trung tâm bạn quan tâm để đưa ra quyết định chính xác nhất cho lộ trình học tập của mình.
        </p>
      </div>
    </section>
  );
};

export default ComparisonIntroSection;
