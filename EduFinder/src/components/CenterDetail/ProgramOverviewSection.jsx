import React from "react";
import { Users, Globe, Target, Map, Clock, MapPin } from "lucide-react";

const overviewStats = [
  { icon: <Users size={20} />, value: "25k+", label: "Học viên" },
  { icon: <Globe size={20} />, value: "02", label: "Ngôn ngữ" },
  { icon: <Target size={20} />, value: "98%", label: "Đạt mục tiêu" },
  { icon: <Map size={20} />, value: "08", label: "Cơ sở" },
];

const operatingHours = [
  { day: "Thứ 2 - Thứ 6", hours: "08:00 - 21:00" },
  { day: "Thứ 7", hours: "08:00 - 18:00" },
  { day: "Chủ Nhật", hours: "Nghỉ" },
];

export const ProgramOverviewSection = () => {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 py-12 lg:grid-cols-12 px-4">
      {/* Overview Card */}
      <article className="col-span-1 rounded-2xl bg-white p-8 shadow-lg lg:col-span-8">
        <h2 className="text-2xl font-bold text-[#003d9b] mb-6">Tổng quan về học viện</h2>
        <p className="text-[#434654] leading-relaxed mb-10">
          Chào mừng bạn đến với EduFinder Premium, nơi chúng tôi kết hợp phương pháp giảng dạy tiêu 
          chuẩn quốc tế với công nghệ học tập hiện đại nhất. Với đội ngũ 100% giáo viên bản ngữ giàu kinh 
          nghiệm, chúng tôi cam kết lộ trình học tập tối ưu hóa theo nhu cầu riêng của từng học viên. 
          Không chỉ là một trung tâm ngôn ngữ, đây là cộng đồng nơi tri thức được lan tỏa và tiềm năng được đánh thức.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {overviewStats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center rounded-xl bg-[#f8f9fb] p-4 transition-all hover:bg-[#edeef0]">
              <div className="text-[#003d9b] mb-2">{stat.icon}</div>
              <span className="text-xl font-bold text-[#191c1e]">{stat.value}</span>
              <span className="text-[10px] font-medium text-[#434654] tracking-wider uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </article>

      {/* Info Cards Column */}
      <aside className="col-span-1 flex flex-col gap-6 lg:col-span-4">
        {/* Operating Hours */}
        <article className="rounded-2xl bg-[#003d9b] p-6 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={20} />
            <h3 className="font-bold">Thời gian hoạt động</h3>
          </div>
          <div className="space-y-3 opacity-90">
            {operatingHours.map((item, index) => (
              <div key={index} className="flex justify-between text-sm border-b border-white/10 pb-2 last:border-0">
                <span>{item.day}</span>
                <span className="font-medium">{item.hours}</span>
              </div>
            ))}
          </div>
        </article>

        {/* Location Map Placeholder */}
        <article className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={20} className="text-[#003d9b]" />
            <h3 className="font-bold text-[#191c1e]">Vị trí địa lý</h3>
          </div>
          <div className="relative h-32 w-full overflow-hidden rounded-xl bg-gray-200 flex items-center justify-center">
             <div className="absolute inset-0 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i15!2i26442!3i13498!2m3!1e0!2sm!3i627252876!3m8!2svi!3sUS!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!5f2')] bg-center opacity-40 grayscale" />
             <div className="relative z-10 p-2 bg-white rounded-full shadow-lg">
                <MapPin size={24} fill="#003d9b" className="text-white" />
             </div>
          </div>
          <p className="mt-4 text-xs text-[#434654] leading-relaxed italic">
            Khu vực trung tâm, thuận tiện đi lại bằng xe buýt và phương tiện cá nhân. Có bãi đỗ xe rộng rãi.
          </p>
        </article>
      </aside>
    </section>
  );
};

export default ProgramOverviewSection;
