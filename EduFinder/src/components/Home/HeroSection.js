import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Star, ArrowRight, Languages, BookOpen, GraduationCap, Globe, CheckCircle, MessageCircle, Briefcase, Smile } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, PresentationControls, Environment, ContactShadows, Float, Stage } from "@react-three/drei";
import { Suspense } from "react";

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={2} />;
};

const languageCards = [
  {
    title: "Luyện thi IELTS",
    count: "HƠN 500 KHÓA HỌC",
    icon: <BookOpen className="w-6 h-6 text-[#1e3a8a]" />,
    bgClass: "bg-[#e0e7ff]",
  },
  {
    title: "Tiếng Anh Giao tiếp",
    count: "HƠN 350 KHÓA HỌC",
    icon: <MessageCircle className="w-6 h-6 text-[#854d0e]" />,
    bgClass: "bg-[#fef3c7]",
  },
  {
    title: "Tiếng Anh Thương mại",
    count: "HƠN 200 KHÓA HỌC",
    icon: <Briefcase className="w-6 h-6 text-[#0e7490]" />,
    bgClass: "bg-[#cffafe]",
  },
  {
    title: "Tiếng Anh Trẻ em",
    count: "HƠN 400 KHÓA HỌC",
    icon: <Smile className="w-6 h-6 text-[#991b1b]" />,
    bgClass: "bg-[#fee2e2]",
  },
];

const featuredCenters = [
  {
    id: 12,
    name: "IELTS Fighter - Chiến binh IELTS",
    rating: "5.0",
    category: "IELTS",
    location: "Quận Hải Châu",
    description: "IELTS Fighter là trung tâm đào tạo IELTS hàng đầu Việt Nam với lộ trình học tinh gọn, dễ hiểu.",
    image: "https://talkclass.edu.vn/wp-content/uploads/2025/08/trung-tam-tieng-anh-IELTS-Fighter.jpg",
  },
  {
    id: 21,
    name: "DOL English - IELTS Đình Lực",
    rating: "5.0",
    category: "Học thuật",
    location: "Quận Hải Châu",
    description: "Học viện Tiếng Anh Tư duy đầu tiên tại Việt Nam với phương pháp Linearthinking độc quyền.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR4W5Z28IRjPuDlXpNVMjySjOGyS-WnnF9pw&s",
  },
  {
    id: 16,
    name: "E-best English - Đà Nẵng",
    rating: "4.9",
    category: "Giao tiếp",
    location: "Quận Thanh Khê",
    description: "E-best English chuyên đào tạo Tiếng Anh Giao tiếp và TOEIC với môi trường học tập năng động.",
    image: "https://ebest.edu.vn/wp-content/uploads/2024/01/banner-1.webp",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Đà Nẵng");

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
      <section className="max-w-7xl mx-auto px-8 -mt-24 relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
        {languageCards.map((card) => (
          <div 
            key={card.title} 
            onClick={() => navigate(`/center-list?q=${card.title}`)}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col items-center text-center gap-4 group cursor-pointer"
          >
            <div className={`w-16 h-16 ${card.bgClass} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-[#111827] font-black text-lg leading-tight">{card.title}</h3>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{card.count}</p>
            </div>
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
            <div key={center.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col group">
              <div className="relative h-60 overflow-hidden">
                <img src={center.image} alt={center.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-black text-[#191c1e]">{center.rating}</span>
                </div>
              </div>
              <div className="p-8 flex flex-col gap-5">
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-black rounded-full uppercase tracking-widest">{center.category}</span>
                  <span className="px-3 py-1 bg-gray-50 text-gray-500 text-[10px] font-black rounded-full uppercase tracking-widest">{center.location}</span>
                </div>
                <h3 className="text-xl font-black text-[#191c1e] line-clamp-1 group-hover:text-primary transition-colors">{center.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 h-10 font-medium">{center.description}</p>
                <button 
                  onClick={() => navigate(`/center-detail?id=${center.id}`)}
                  className="mt-2 w-full py-4 border-2 border-primary text-primary font-black rounded-2xl hover:bg-primary hover:text-white transition-all uppercase text-xs tracking-widest"
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

          <div className="w-full lg:w-[550px] h-[550px] relative group">
            {/* Ultra-Vibrant Neon Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-violet-500/30 to-blue-600/40 rounded-[4rem] blur-[120px] opacity-80 group-hover:opacity-100 transition-all duration-1000 pointer-events-none" />
            
            {/* Deep Glassmorphism Podium */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-white/70 backdrop-blur-3xl rounded-full border-2 border-white/50 shadow-[0_0_100px_rgba(0,102,255,0.25)] pointer-events-none" />
            
            {/* Bold Interactive Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] h-[92%] border-4 border-dashed border-primary/20 rounded-full animate-spin-slow pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[75%] border-2 border-primary/30 rounded-full animate-reverse-spin pointer-events-none" />

            <div className="w-full h-full relative z-20">
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-[2.5rem] border-2 border-dashed border-gray-100">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">Đang tải mô hình...</span>
                  </div>
                </div>
              }>
                <Canvas shadows dpr={[1, 2]}>
                  <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.6} contactShadow={true} adjustCamera={true}>
                      <PresentationControls
                        speed={1.5}
                        global
                        zoom={1.2}
                        polar={[-0.1, Math.PI / 4]}
                      >
                        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                          <Model url="/textures/fpt.glb" />
                        </Float>
                      </PresentationControls>
                    </Stage>
                  </Suspense>
                </Canvas>
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
