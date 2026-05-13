import React from "react";
import { Download, HelpCircle } from "lucide-react";

export const GuidanceCalloutSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Help Banner */}
      <div className="bg-[#afecff] rounded-[2rem] p-8 flex items-center gap-6 shadow-sm">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner shrink-0">
          <HelpCircle size={32} className="text-[#001f27]" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-[#001f27]">Bạn vẫn còn phân vân?</h3>
          <p className="text-sm text-[#001f27]/80 leading-relaxed">
            Để chuyên gia của EduFinder giúp bạn phân tích lộ trình phù hợp nhất dựa trên mục tiêu cá nhân của bạn.
          </p>
        </div>
      </div>

      {/* Download Banner */}
      <div className="bg-[#e1e2e4] rounded-[2rem] p-8 flex items-center justify-between gap-6 shadow-sm group cursor-pointer hover:bg-[#d5d6d8] transition-colors">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-[#191c1e]">Tải bảng so sánh</h3>
          <p className="text-sm text-[#434654] leading-relaxed">
            Lưu lại kết quả so sánh này dưới dạng PDF để xem lại sau.
          </p>
        </div>
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform shrink-0">
          <Download size={20} className="text-[#191c1e]" />
        </div>
      </div>
    </section>
  );
};

export default GuidanceCalloutSection;
