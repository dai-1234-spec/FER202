import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Star, ArrowRight, Languages, BookOpen, GraduationCap, Globe, CheckCircle } from "lucide-react";

const languageCards = [
  {
    title: "Tiếng Anh",
    count: "1,200+ trung tâm",
    icon: <Languages className="w-6 h-6 text-primary" />,
    bgClass: "bg-[#dae2ff]",
  },
  {
    title: "Tiếng Trung",
    count: "450+ trung tâm",
    icon: <Globe className="w-6 h-6 text-[#8a5a00]" />,
    bgClass: "bg-[#ffddb3]",
  },
  {
    title: "Tiếng Nhật",
    count: "380+ trung tâm",
    icon: <BookOpen className="w-6 h-6 text-[#00688a]" />,
    bgClass: "bg-[#afecff]",
  },
  {
    title: "Tiếng Hàn",
    count: "320+ trung tâm",
    icon: <GraduationCap className="w-6 h-6 text-[#8a0026]" />,
    bgClass: "bg-[#ffdad6]",
  },
];

const featuredCenters = [
  {
    name: "British Council",
    rating: "4.9",
    category: "IELTS",
    location: "Quận 1",
    description: "Hội đồng Anh là tổ chức quốc tế về hợp tác văn hóa và cơ hội giáo dục của Vương quốc Anh.",
    image: "/center-placeholder.png",
  },
  {
    name: "VUS - Anh Văn Hội Việt Mỹ",
    rating: "4.8",
    category: "Giao tiếp",
    location: "Hệ thống",
    description: "Hệ thống đào tạo Anh ngữ lâu đời và uy tín nhất Việt Nam với tiêu chuẩn quốc tế NEAS.",
    image: "/center-placeholder.png",
  },
  {
    name: "ILA Vietnam",
    rating: "4.7",
    category: "Trẻ em",
    location: "Toàn quốc",
    description: "Tổ chức giáo dục Anh ngữ hàng đầu Việt Nam với phương pháp học tư duy thế kỷ 21.",
    image: "/center-placeholder.png",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Hồ Chí Minh");

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    navigate(`/explore?q=${searchQuery}&city=${selectedCity}`);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Content */}
      <section className="relative w-full bg-[#003d9b] pt-32 pb-48 px-4 flex flex-col items-center text-center overflow-hidden">
        {/* Background Pattern / Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center gap-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Nâng tầm tương lai với ngôn ngữ mới
          </h1>
          <p className="text-[#dae2ff] text-lg max-w-2xl mx-auto">
            Tìm kiếm và so sánh các trung tâm ngoại ngữ uy tín nhất Việt Nam chỉ trong vài giây.
          </p>

          {/* Hero Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full animate-slide-up">
            <button 
              onClick={() => navigate('/center-list')}
              className="w-full sm:w-auto px-10 py-4 bg-white text-primary font-black rounded-2xl shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 group"
            >
              <BookOpen className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
              <span>Danh sách trung tâm</span>
            </button>
            <button 
              onClick={() => navigate('/explore')}
              className="w-full sm:w-auto px-10 py-4 bg-secondary text-[#684300] font-black rounded-2xl shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 group border border-white/20"
            >
              <MapPin className="w-5 h-5 text-[#684300] group-hover:bounce transition-transform" />
              <span>Khám phá bản đồ</span>
            </button>
          </div>
        </div>
      </section>

      {/* Language Cards */}
      <section className="max-w-7xl mx-auto px-8 -mt-20 relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {languageCards.map((card) => (
          <div 
            key={card.title} 
            onClick={() => navigate(`/explore?q=${card.title}`)}
            className="bg-white p-6 rounded-xl border border-[#c3c6d6] shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center gap-3 group cursor-pointer"
          >
            <div className={`w-14 h-14 ${card.bgClass} rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            <h3 className="text-primary font-bold text-lg">{card.title}</h3>
            <p className="text-[#434654] text-xs font-medium uppercase tracking-wider">{card.count}</p>
          </div>
        ))}
      </section>

      {/* Featured Centers */}
      <section className="max-w-7xl mx-auto px-8 py-24 w-full flex flex-col gap-10">
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-[#191c1e]">Trung tâm tiêu biểu</h2>
            <p className="text-[#434654]">Các đối tác giáo dục hàng đầu với chứng nhận chất lượng quốc tế.</p>
          </div>
          <button 
            onClick={() => navigate('/center-list')}
            className="text-primary font-bold flex items-center gap-2 hover:underline group"
          >
            Xem tất cả <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCenters.map((center) => (
            <div key={center.name} className="bg-white rounded-2xl overflow-hidden border border-[#c3c6d6] shadow-sm hover:shadow-xl transition-all flex flex-col group">
              <div className="relative h-52 overflow-hidden">
                <img src={center.image} alt={center.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-bold text-[#191c1e]">{center.rating}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-[#dae2ff] text-primary text-xs font-bold rounded-full">{center.category}</span>
                  <span className="px-3 py-1 bg-[#edeef0] text-[#434654] text-xs font-bold rounded-full">{center.location}</span>
                </div>
                <h3 className="text-lg font-bold text-[#191c1e] line-clamp-1">{center.name}</h3>
                <p className="text-[#434654] text-sm leading-relaxed line-clamp-2 h-10">{center.description}</p>
                <button 
                  onClick={() => navigate('/center-detail')}
                  className="mt-2 w-full py-2.5 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all"
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guidance Section */}
      <section className="w-full bg-gray-50 py-24 px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl overflow-hidden border border-[#c3c6d6] shadow-xl flex flex-col lg:flex-row items-center relative group">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="flex-1 p-12 flex flex-col gap-8 relative z-10">
            <div className="flex flex-col gap-4">
              <p className="text-primary font-bold text-lg">Bạn chưa biết bắt đầu từ đâu?</p>
              <h2 className="text-3xl font-bold text-[#191c1e] leading-snug">
                Hãy để EduFinder giúp bạn tìm lộ trình học phù hợp nhất.
              </h2>
              <p className="text-[#434654] text-base leading-relaxed max-w-xl">
                Dựa trên mục tiêu, ngân sách và trình độ hiện tại của bạn. Chỉ mất 2 phút để nhận gợi ý cá nhân hóa từ chuyên gia.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                Làm bài Test trình độ <CheckCircle className="w-5 h-5" />
              </button>
              <button className="bg-white text-[#191c1e] px-8 py-4 rounded-xl font-bold border-2 border-[#c3c6d6] hover:border-primary hover:text-primary transition-all">
                Tư vấn 1-1 miễn phí
              </button>
            </div>
          </div>

          <div className="w-full lg:w-[450px] h-[400px] overflow-hidden">
             <img src="/guidance.png" alt="Student studying" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
