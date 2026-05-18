import React, { useState, useEffect } from "react";
import { 
  User, CreditCard, Bell, Shield, 
  Calendar, Camera, ChevronRight, 
  BookOpen, Play, Heart, Star, 
  Settings, LogOut 
} from "lucide-react";

// Using existing assets
import userAvatar from "../../assets/teacher_robert.png"; 
import center1Img from "../../assets/ila_center.png";
import center2Img from "../../assets/vus_center.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const profileMenuItems = [
  { label: "Thông tin cá nhân", icon: <User size={18} />, active: true },
  { label: "Phương thức thanh toán", icon: <CreditCard size={18} />, active: false },
  { label: "Cài đặt thông báo", icon: <Bell size={18} />, active: false },
  { label: "Bảo mật tài khoản", icon: <Shield size={18} />, active: false },
];

const recentActivities = [
  {
    prefix: "Đã đánh giá ",
    highlight: "British Council",
    time: "2 ngày trước",
    icon: <Star size={12} className="text-white" />,
    color: "bg-[#003d9b]"
  },
  {
    prefix: "Đăng ký khóa ",
    highlight: "IELTS Intensive 7.5+",
    time: "1 tuần trước",
    icon: <BookOpen size={12} className="text-white" />,
    color: "bg-[#feaa00]"
  },
  {
    prefix: "Đã lưu trung tâm ",
    highlight: "ILA Vietnam",
    time: "2 tuần trước",
    icon: <Heart size={12} className="text-white" />,
    color: "bg-[#737685]"
  },
];




export const DashboardContentSection = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ fullName: "Nguyễn Văn A" });
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [savedCenters, setSavedCenters] = useState([]);

  useEffect(() => {
    // 1. Get user info
    const currentUser = JSON.parse(localStorage.getItem("user") || localStorage.getItem("currentUser") || "null");
    if (currentUser) {
      setUser(currentUser);
    }

    // 2. Fetch all centers to filter for recently viewed and saved
    const fetchCenters = async () => {
      try {
        const response = await axios.get("/api/centers");
        const allCenters = response.data;
        
        const recentIds = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
        const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]");

        const recent = recentIds.map(id => allCenters.find(c => String(c.id) === String(id))).filter(Boolean);
        const saved = favoriteIds.map(id => allCenters.find(c => String(c.id) === String(id))).filter(Boolean);

        setRecentlyViewed(recent);
        setSavedCenters(saved);
      } catch (err) {
        console.error("Error fetching data for profile:", err);
      }
    };
    fetchCenters();
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Đăng xuất?",
      text: "Bạn có chắc chắn muốn thoát khỏi hệ thống?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#003d9b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, đăng xuất",
      cancelButtonText: "Hủy",
      background: "#ffffff",
      borderRadius: "20px"
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear local storage if any
        localStorage.clear();
        navigate("/");
        Swal.fire({
          title: "Đã đăng xuất",
          text: "Hẹn gặp lại bạn sớm nhất!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Sidebar */}
      <aside className="col-span-12 lg:col-span-4 flex flex-col gap-6">
        {/* User Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="relative mb-6">
            <div className="w-28 h-28 rounded-full border-4 border-[#003d9b1a] overflow-hidden">
              <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-1 right-1 bg-[#feaa00] p-2 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform">
              <Camera size={16} className="text-[#684300]" />
            </button>
          </div>
          
          <h2 className="text-2xl font-bold text-[#191c1e]">{user.fullName || user.username || "Người dùng"}</h2>
          <div className="mt-2 bg-[#feaa0033] px-3 py-1 rounded-full">
            <span className="text-[10px] font-black text-[#825500] tracking-wider">PREMIUM MEMBER</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-gray-400">
            <Calendar size={14} />
            <span className="text-xs">Tham gia từ tháng 05/2023</span>
          </div>

          <nav className="mt-10 w-full flex flex-col gap-2 pt-6 border-t border-gray-100">
            {profileMenuItems.map((item) => (
              <button
                key={item.label}
                className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                  item.active 
                  ? "bg-[#0052cc] text-white shadow-lg shadow-primary/20" 
                  : "text-[#434654] hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={item.active ? "text-white" : "text-primary"}>{item.icon}</span>
                  <span className="text-sm font-semibold">{item.label}</span>
                </div>
                <ChevronRight size={16} className={item.active ? "text-white/50" : "text-gray-300"} />
              </button>
            ))}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 p-4 text-red-500 hover:bg-red-50 rounded-xl transition-all mt-4 w-full"
            >
               <LogOut size={18} />
               <span className="text-sm font-semibold">Đăng xuất</span>
            </button>
          </nav>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#191c1e] mb-6">Hoạt động gần đây</h3>
          <div className="relative flex flex-col gap-8">
            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-100" />
            {recentActivities.map((activity, index) => (
              <div key={index} className="relative flex items-start pl-10">
                <div className={`absolute left-0 top-0 w-8 h-8 ${activity.color} rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10`}>
                  {activity.icon}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm leading-tight">
                    <span className="text-gray-500">{activity.prefix}</span>
                    <span className="font-bold text-[#191c1e]"> {activity.highlight}</span>
                  </p>
                  <span className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-wider">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Dashboard */}
      <main className="col-span-12 lg:col-span-8 flex flex-col gap-8">
        {/* Recently Interested Centers */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#191c1e]">Trung tâm quan tâm gần đây</h2>
            <button className="flex items-center gap-1 text-primary text-sm font-bold hover:underline">
              Xem tất cả <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            {recentlyViewed.length > 0 ? recentlyViewed.map((center) => (
              <div 
                key={center.id}
                onClick={() => navigate(`/center-detail?id=${center.id}`)}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <img src={center.image} alt={center.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-[#191c1e] group-hover:text-primary transition-colors">{center.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{center.district}</span>
                        <span className="text-gray-200">•</span>
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">{center.city}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-lg shrink-0">
                      <Star size={12} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-[10px] font-black text-[#825500]">{center.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-2 bg-gray-50 rounded-full text-gray-300 group-hover:bg-primary group-hover:text-white transition-all">
                  <ChevronRight size={20} />
                </div>
              </div>
            )) : (
              <div className="py-10 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-medium">Bạn chưa xem trung tâm nào gần đây.</p>
              </div>
            )}
          </div>
        </section>

        {/* Saved Centers */}
        <section>
           <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#191c1e]">Trung tâm đã lưu</h2>
            <div className="flex gap-2">
               <button className="p-2 bg-gray-100 rounded-lg text-gray-400"><Settings size={18} /></button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedCenters.length > 0 ? savedCenters.map((center, index) => (
              <article key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
                <div className="relative h-40">
                  <img src={center.image} alt={center.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
                      const updated = favorites.filter(id => String(id) !== String(center.id));
                      localStorage.setItem("favorites", JSON.stringify(updated));
                      setSavedCenters(prev => prev.filter(c => c.id !== center.id));
                    }}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full text-red-500 shadow-sm hover:scale-110 transition-transform"
                  >
                    <Heart size={18} fill="currentColor" />
                  </button>
                </div>
                <div className="p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-[#191c1e] text-lg line-clamp-1">{center.name}</h3>
                    <div className="flex items-center gap-1.5 bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-bold text-[#825500]">{center.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {center.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[9px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100 uppercase">{tag}</span>
                    ))}
                  </div>
                  <button 
                    onClick={() => navigate(`/center-detail?id=${center.id}`)}
                    className="w-full py-2.5 border-2 border-primary text-primary rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </article>
            )) : (
              <div className="col-span-2 py-10 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-medium">Danh sách yêu thích trống.</p>
              </div>
            )}
          </div>
        </section>

        {/* Personalized Banner */}
        <section className="bg-primary rounded-[2rem] p-10 text-white relative overflow-hidden shadow-xl">
           {/* Abstract Gear Icon Background */}
           <div className="absolute -right-10 -bottom-10 opacity-10">
              <Settings size={200} />
           </div>
           
           <div className="relative z-10 max-w-md">
              <h2 className="text-2xl font-bold mb-3 leading-tight">Gợi ý khóa học dành riêng cho bạn</h2>
              <p className="text-white/70 text-sm mb-8 leading-relaxed">
                Dựa trên kết quả IELTS của bạn, chúng tôi đề xuất lộ trình luyện Speaking nâng cao để bứt phá band điểm.
              </p>
              <button className="bg-[#feaa00] text-[#684300] px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform active:scale-95">
                Khám phá ngay
              </button>
           </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardContentSection;
