import React from "react";
import { Star, MapPin, CheckCircle } from "lucide-react";

export const ComparisonGridDisplaySection = ({ providers }) => {
  if (!providers || providers.length === 0) return null;

  return (
    <section className="relative w-full overflow-x-auto rounded-[2rem] border border-gray-100 bg-white shadow-2xl">
      <div className="min-w-[900px]">
        {/* Header Row */}
        <div className="flex border-b border-gray-100">
          <div className="w-[200px] bg-gray-50/50 p-8 flex items-end">
            <span className="font-black text-primary text-xs uppercase tracking-[0.2em]">Tiêu chí</span>
          </div>
          {providers.map((provider) => (
            <div 
              key={provider.id} 
              className={`flex-1 p-8 flex flex-col gap-5 ${provider.isFeatured ? "bg-primary/[0.02]" : ""}`}
            >
              <div className="relative h-40 rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
                <img src={provider.image} alt={provider.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                {provider.isFeatured && (
                  <span className="absolute top-4 left-4 bg-secondary px-2.5 py-1 rounded-md text-[10px] font-black text-[#684300] uppercase shadow-lg">Nổi bật</span>
                )}
              </div>
              <div className="min-h-[3.5rem] flex flex-col justify-center">
                <h3 className="font-black text-[#191c1e] text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">{provider.name}</h3>
              </div>

            </div>
          ))}
        </div>



        {/* Location Row */}
        <div className="flex border-b border-gray-50">
          <div className="w-[200px] bg-gray-50/50 p-8 flex items-center">
            <span className="font-bold text-gray-400 text-xs uppercase tracking-widest">Địa điểm</span>
          </div>
          {providers.map((provider) => (
            <div key={provider.id} className={`flex-1 p-8 flex flex-col gap-1 ${provider.isFeatured ? "bg-primary/[0.02]" : ""}`}>
              <div className="flex items-center gap-2 text-[#191c1e] font-black text-sm">
                <MapPin size={16} className="text-primary" />
                <span>{provider.district}</span>
              </div>
              <span className="text-xs text-gray-400 font-medium ml-6">{provider.city}</span>
            </div>
          ))}
        </div>

        {/* Tags / Categories Row */}
        <div className="flex border-b border-gray-50">
          <div className="w-[200px] bg-gray-50/50 p-8 flex items-center">
            <span className="font-bold text-gray-400 text-xs uppercase tracking-widest">Chuyên môn</span>
          </div>
          {providers.map((provider) => (
            <div key={provider.id} className={`flex-1 p-8 flex flex-wrap gap-2 ${provider.isFeatured ? "bg-primary/[0.02]" : ""}`}>
              {provider.tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-gray-50 rounded-lg text-[10px] font-black text-gray-500 uppercase tracking-widest border border-gray-100">
                  {tag}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Strengths Row */}
        <div className="flex border-b border-gray-100">
          <div className="w-[200px] bg-gray-50/50 p-8 flex items-center">
            <span className="font-bold text-gray-400 text-xs uppercase tracking-widest">Cam kết & Ưu điểm</span>
          </div>
          {providers.map((provider) => (
            <div key={provider.id} className={`flex-1 p-8 flex flex-col gap-4 ${provider.isFeatured ? "bg-primary/[0.02]" : ""}`}>
              {(provider.highlights && provider.highlights.length > 0) ? provider.highlights.map((highlight, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-600 font-medium leading-relaxed">{highlight}</span>
                </div>
              )) : (
                <div className="flex items-start gap-3 opacity-50">
                   <CheckCircle size={16} className="text-gray-300 shrink-0 mt-0.5" />
                   <span className="text-xs text-gray-400 font-medium italic">Đang cập nhật ưu điểm...</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Row */}
        <div className="flex">
          <div className="w-[200px] bg-gray-50/50 p-8" />
          {providers.map((provider) => (
            <div key={provider.id} className={`flex-1 p-8 ${provider.isFeatured ? "bg-primary/[0.02]" : ""}`}>
              <button 
                onClick={() => window.location.href = `/center-detail?id=${provider.id}`}
                className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-[#0041a3] transition-all uppercase text-xs tracking-widest"
              >
                Xem chi tiết
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonGridDisplaySection;
