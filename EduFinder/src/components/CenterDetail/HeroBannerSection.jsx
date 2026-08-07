import React from "react";
import { MapPin, Award, ShieldCheck } from "lucide-react";
import heroImg from "../../assets/hero_center_detail.png";

const featureItems = [
  {
    icon: <MapPin size={18} className="text-[#feaa00]" />,
    text: "123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
  },
  {
    icon: <Award size={18} className="text-[#feaa00]" />,
    text: "15+ Năm kinh nghiệm",
  },
  {
    icon: <ShieldCheck size={18} className="text-[#feaa00]" />,
    text: "Chứng chỉ quốc tế British Council",
  },
];

export const HeroBannerSection = () => {
  return (
    <section className="relative h-[500px] w-full overflow-hidden" aria-label="Hero Banner">
      <img
        src={heroImg}
        alt="EduFind Premium Academy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#feaa00] px-3 py-1 text-[10px] font-bold text-[#684300]">
                ĐỐI TÁC KIM CƯƠNG
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-[#feaa00]">★</span>
                ))}
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-white lg:text-5xl leading-tight">
              Học viện Anh ngữ Toàn cầu <br />
              <span className="text-[#feaa00]">EduFinder Premium</span>
            </h1>
            
            <ul className="flex flex-wrap items-center gap-6">
              {featureItems.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-white/90">
                  {item.icon}
                  <span className="text-sm font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="w-full lg:w-80">
            <div className="rounded-xl border border-white/30 bg-white/10 p-6 backdrop-blur-md">
              <p className="text-[10px] font-bold tracking-widest text-white/70">GIÁ KHÓA HỌC CHỈ TỪ</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">4.500.000 VNĐ</span>
                <span className="text-sm text-white/60">/ tháng</span>
              </div>
              <button className="mt-4 w-full rounded-lg bg-primary py-3 text-sm font-bold text-white shadow-lg transition-all hover:opacity-90">
                Nhận tư vấn ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBannerSection;
