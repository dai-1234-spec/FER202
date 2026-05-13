import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Star, MapPin, ChevronLeft, Calendar, Users, 
  BookOpen, CheckCircle2, ShieldCheck, ArrowRight,
  Globe, Camera, Video, Link2, MessageCircle, Phone
} from "lucide-react";
import TopNavigation from "../Home/TopNavigation";
import Footer from "../Home/Footer";

const CenterDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);

  const centerId = searchParams.get("id");

  useEffect(() => {
    const fetchCenter = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/centers/${centerId}`);
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
      <div className="relative w-full h-[450px] overflow-hidden">
        <img src={center.image} alt={center.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#191c1e] via-transparent to-transparent opacity-80"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-12 text-white">
          <div className="max-w-7xl mx-auto flex flex-col gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-all text-sm font-bold uppercase tracking-wider mb-4"
            >
              <ChevronLeft className="w-5 h-5" /> Trở lại tìm kiếm
            </button>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-secondary text-[#684300] text-[10px] font-black rounded-full uppercase tracking-widest">Trung tâm tiêu biểu</span>
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-sm">{center.rating} (120 đánh giá)</span>
              </div>
            </div>
            <h1 className="text-5xl font-black tracking-tight leading-none">{center.name}</h1>
            <div className="flex items-center gap-3 text-white/90">
              <MapPin className="w-5 h-5 text-secondary" />
              <span className="text-xl font-medium">{center.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-8 -mt-16 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10 pb-24">
        
        {/* Left Column: Info */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Học viên", val: "10,000+", icon: <Users className="w-5 h-5" /> },
              { label: "Giáo viên", val: "150+", icon: <ShieldCheck className="w-5 h-5" /> },
              { label: "Khóa học", val: "24", icon: <BookOpen className="w-5 h-5" /> },
              { label: "Thành lập", val: "2005", icon: <Calendar className="w-5 h-5" /> },
            ].map(stat => (
              <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2">
                <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
                  <span className="text-xl font-black text-[#191c1e]">{stat.val}</span>
                </div>
              </div>
            ))}
          </div>

          {/* About Section */}
          <section className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-6">
            <h2 className="text-2xl font-black text-[#191c1e]">Giới thiệu về {center.name}</h2>
            <div className="flex flex-col gap-4 text-gray-500 leading-relaxed text-lg">
              <p>
                Với hơn 15 năm kinh nghiệm trong lĩnh vực đào tạo ngôn ngữ, {center.name} tự hào là đối tác chiến lược 
                của các tổ chức giáo dục hàng đầu thế giới. Chúng tôi mang đến phương pháp học tập tư duy thế kỷ 21, 
                giúp học viên không chỉ giỏi ngoại ngữ mà còn phát triển các kỹ năng mềm quan trọng.
              </p>
              <p>
                Môi trường học tập tại đây được thiết kế hiện đại, tràn đầy cảm hứng với 100% giáo viên bản ngữ có chứng chỉ quốc tế. 
                Hệ thống giáo trình cá nhân hóa đảm bảo mỗi học viên đều có lộ trình phát triển riêng biệt.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {[
                "100% Giáo viên bản ngữ",
                "Chứng chỉ quốc tế NEAS",
                "Lộ trình học cá nhân hóa",
                "Cơ sở vật chất hiện đại",
                "Cam kết đầu ra bằng văn bản",
                "Hỗ trợ học tập 24/7"
              ].map(feature => (
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
              {["IELTS Breakthrough", "Tiếng Anh Giao tiếp Pro", "Business Mastery"].map(course => (
                <div key={course} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-primary transition-all group flex justify-between items-center cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold text-[#191c1e] group-hover:text-primary transition-colors">{course}</h3>
                    <p className="text-gray-400 text-sm">Thời lượng: 12 tuần • Cấp độ: Mọi trình độ</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Học phí</span>
                      <span className="text-xl font-black text-primary">3.500.000đ</span>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 flex flex-col gap-6">
            
            {/* Booking Card */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-primary/10 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Học phí trung bình</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-primary">{center.price}</span>
                  <span className="text-gray-400">/ khóa</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button className="w-full py-4 bg-primary text-white font-black rounded-xl hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20 uppercase tracking-tight">
                  Đăng ký tư vấn miễn phí
                </button>
                <button className="w-full py-4 bg-secondary text-[#684300] font-black rounded-xl hover:bg-opacity-90 transition-all shadow-lg shadow-secondary/20 uppercase tracking-tight">
                  Nhận ưu đãi 20% tháng này
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
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition-all cursor-pointer">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="font-bold text-[#434654]">028 1234 5678</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition-all cursor-pointer">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span className="font-bold text-[#434654]">Chat với tư vấn viên</span>
                </div>
              </div>
              
              <div className="flex justify-center gap-6 pt-2">
                <Globe className="w-6 h-6 text-gray-300 hover:text-primary cursor-pointer transition-all" />
                <Camera className="w-6 h-6 text-gray-300 hover:text-primary cursor-pointer transition-all" />
                <Video className="w-6 h-6 text-gray-300 hover:text-primary cursor-pointer transition-all" />
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
