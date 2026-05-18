import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Star, MapPin, ChevronLeft, Calendar, Users, 
  BookOpen, CheckCircle2, ShieldCheck, ArrowRight,
  Globe, Camera, Video, Link2, MessageCircle, Phone, Heart
} from "lucide-react";
import TopNavigation from "../Home/TopNavigation";
import Footer from "../Home/Footer";

const CenterDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);

  const centerId = searchParams.get("id");

  // Handle Recently Viewed
  useEffect(() => {
    if (centerId && !loading && center) {
      const recentlyViewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      const updated = [centerId, ...recentlyViewed.filter(id => id !== centerId)].slice(0, 10);
      localStorage.setItem("recentlyViewed", JSON.stringify(updated));
    }
  }, [centerId, loading, center]);

  // Handle Favorites
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(centerId));
  }, [centerId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let updated;
    if (favorites.includes(centerId)) {
      updated = favorites.filter(id => id !== centerId);
      setIsFavorite(false);
    } else {
      updated = [...favorites, centerId];
      setIsFavorite(true);
    }
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  useEffect(() => {
    const fetchCenter = async () => {
      try {
        const response = await axios.get(`/api/centers/${centerId}`);
        setCenter(response.data);
      } catch (err) {
        console.error("Error fetching center:", err);
      } finally {
        setLoading(false);
      }
    };
    if (centerId) fetchCenter();
  }, [centerId]);

  if (loading) return <div className="h-screen flex items-center justify-center">Đang tải...</div>;
  if (!center) return <div className="h-screen flex items-center justify-center">Không tìm thấy trung tâm.</div>;

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <TopNavigation />
      
      {/* Hero Header */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-gray-900">
        <img 
          src={center.image || "https://images.unsplash.com/photo-1523050335392-938511794244?q=80&w=1500&auto=format&fit=crop"} 
          alt={center.name} 
          className="w-full h-full object-cover opacity-80" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#191c1e] via-[#191c1e]/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-12 pb-28 text-white">
          <div className="max-w-7xl mx-auto flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => navigate(-1)}
                  className="w-fit flex items-center gap-2 text-white hover:text-secondary transition-all text-sm font-bold uppercase tracking-wider mb-2 drop-shadow-md"
                >
                  <ChevronLeft className="w-5 h-5" /> Trở lại tìm kiếm
                </button>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-secondary text-[#684300] text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg">Trung tâm tiêu biểu</span>
                  <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-sm text-white">{center.rating}</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">{center.name}</h1>
                <div className="flex items-center gap-3 text-white/90">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <span className="text-lg md:text-xl font-medium">{center.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={toggleFavorite}
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg ${
                    isFavorite 
                    ? "bg-red-500 text-white shadow-red-500/20" 
                    : "bg-white/10 text-white backdrop-blur-md hover:bg-white/20 border border-white/10"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? "fill-white" : ""}`} />
                  <span>{isFavorite ? "Đã lưu" : "Lưu trung tâm"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-8 -mt-20 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10 pb-24">
        
        {/* Left Column: Info */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Học viên", val: center.stats?.students || "Đang cập nhật", icon: <Users className="w-5 h-5" /> },
              { label: "Giáo viên", val: center.stats?.teachers || "Đang cập nhật", icon: <ShieldCheck className="w-5 h-5" /> },
              { label: "Khóa học", val: center.stats?.courses || "Đang cập nhật", icon: <BookOpen className="w-5 h-5" /> },
              { label: "Thành lập", val: center.stats?.established || "Đang cập nhật", icon: <Calendar className="w-5 h-5" /> },
            ].map(stat => (
              <div key={stat.label} className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 flex flex-col gap-2">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
                  <span className="text-xl font-black text-[#191c1e]">{stat.val}</span>
                </div>
              </div>
            ))}
          </div>

          {/* About Section */}
          <section className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6">
            <h2 className="text-2xl font-black text-[#191c1e]">Giới thiệu về {center.name}</h2>
            <div className="flex flex-col gap-4 text-gray-500 leading-relaxed text-lg">
              <p>{center.description || "Đang cập nhật thông tin giới thiệu..."}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {(center.highlights || []).map(feature => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="font-bold text-[#434654]">{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Courses Section */}
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-black text-[#191c1e]">Các khóa học nổi bật</h2>
            <div className="grid grid-cols-1 gap-4">
              {(center.featuredCourses || []).map((course, idx) => (
                <a 
                  key={idx} 
                  href={course.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-primary transition-all group flex justify-between items-center cursor-pointer"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold text-[#191c1e] group-hover:text-primary transition-colors">{course.name}</h3>
                    <p className="text-gray-400 text-sm">Thời lượng: {course.duration} • Cấp độ: {course.level}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 flex flex-col gap-6">
            
            {/* Booking Card */}
            <div className="bg-white/95 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20 flex flex-col gap-6 text-center">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-black text-[#191c1e]">Đăng ký học ngay</h3>
                <p className="text-gray-400 text-sm">Để nhận thông tin lộ trình học tập chi tiết nhất.</p>
              </div>

              <div className="flex flex-col gap-3">
                <button className="w-full py-4 bg-primary text-white font-black rounded-xl hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20 uppercase tracking-tight">
                  Tư vấn miễn phí
                </button>
              </div>

              <p className="text-center text-xs text-gray-400 font-medium">
                * Cam kết bảo mật thông tin và tư vấn trong vòng 24h.
              </p>
            </div>

            {/* Contact Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6">
              <h3 className="text-lg font-black text-[#191c1e] uppercase tracking-wide">Kết nối trực tiếp</h3>
              <div className="flex flex-col gap-4">
                <a 
                  href={`tel:${center.phone}`}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition-all"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="font-bold text-[#434654]">{center.phone || "Đang cập nhật"}</span>
                </a>
                <a 
                  href={center.zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition-all"
                >
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span className="font-bold text-[#434654]">Chat với tư vấn viên</span>
                </a>
                {center.website && (
                  <a 
                    href={center.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition-all"
                  >
                    <Globe className="w-5 h-5 text-primary" />
                    <span className="font-bold text-[#434654]">Ghé thăm website chính thức</span>
                  </a>
                )}
                <a 
                  href={center.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition-all"
                >
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="font-bold text-[#434654]">Đánh giá qua Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CenterDetail;
