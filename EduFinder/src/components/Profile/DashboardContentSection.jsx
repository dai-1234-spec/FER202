import React, { useState, useEffect, useRef } from "react";
import { 
  User, Shield, Calendar, Camera, 
  ChevronRight, BookOpen, Heart, 
  Star, Settings, LogOut, Check
} from "lucide-react";

// Using existing assets
import defaultAvatar from "../../assets/teacher_robert.png"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const profileMenuItems = [
  { label: "Thông tin cá nhân", id: "profile", icon: <User size={18} /> },
  { label: "Đổi mật khẩu", id: "password", icon: <Shield size={18} /> },
  { label: "Hoạt động của tôi", id: "activity", icon: <BookOpen size={18} /> },
];

export const DashboardContentSection = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ fullName: "Nguyễn Văn A", email: "", phone: "", avatar: defaultAvatar });
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [savedCenters, setSavedCenters] = useState([]);
  
  const [activeTab, setActiveTab] = useState("profile");
  
  // Profile form state
  const [profileData, setProfileData] = useState({ fullName: "", email: "", phone: "" });
  const fileInputRef = useRef(null);

  // Password form state
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

  useEffect(() => {
    // 1. Get user info
    const currentUser = JSON.parse(localStorage.getItem("user") || localStorage.getItem("currentUser") || "null");
    if (currentUser) {
      setUser({ ...currentUser, avatar: currentUser.avatar || defaultAvatar });
      setProfileData({
        fullName: currentUser.fullName || currentUser.username || "",
        email: currentUser.email || "",
        phone: currentUser.phone || ""
      });
      // Prevent Google users from accessing change password tab
      if (currentUser.isGoogle || currentUser.password === "OAuthUser_Google") {
        setActiveTab("profile");
      }
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
      confirmButtonColor: "#6355f6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, đăng xuất",
      cancelButtonText: "Hủy",
      background: "#ffffff",
      borderRadius: "20px"
    }).then((result) => {
      if (result.isConfirmed) {
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        const updatedUser = { ...user, avatar: base64String };
        setUser(updatedUser);
        if (localStorage.getItem("user")) localStorage.setItem("user", JSON.stringify(updatedUser));
        if (localStorage.getItem("currentUser")) localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        Swal.fire({
          title: "Thành công!",
          text: "Đã cập nhật ảnh đại diện.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    if (localStorage.getItem("user")) localStorage.setItem("user", JSON.stringify(updatedUser));
    if (localStorage.getItem("currentUser")) localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    Swal.fire({
      title: "Thành công!",
      text: "Đã cập nhật thông tin cá nhân.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Swal.fire({
        title: "Lỗi!",
        text: "Mật khẩu xác nhận không khớp.",
        icon: "error"
      });
      return;
    }
    // Mock password update
    Swal.fire({
      title: "Thành công!",
      text: "Đã thay đổi mật khẩu.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    });
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Sidebar */}
      <aside className="col-span-12 lg:col-span-4 flex flex-col gap-6">
        {/* User Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="relative mb-6">
            <div className="w-28 h-28 rounded-full border-4 border-[#6355f6]/10 overflow-hidden bg-gray-100">
              <img src={user.avatar || defaultAvatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleAvatarChange} 
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 bg-[#feaa00] p-2 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"
            >
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
            {profileMenuItems
              .filter(item => !(item.id === "password" && (user.isGoogle || user.password === "OAuthUser_Google")))
              .map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                  activeTab === item.id 
                  ? "bg-[#0052cc] text-white shadow-lg shadow-primary/20" 
                  : "text-[#434654] hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={activeTab === item.id ? "text-white" : "text-primary"}>{item.icon}</span>
                  <span className="text-sm font-semibold">{item.label}</span>
                </div>
                <ChevronRight size={16} className={activeTab === item.id ? "text-white/50" : "text-gray-300"} />
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
      </aside>

      {/* Main Dashboard */}
      <main className="col-span-12 lg:col-span-8 flex flex-col gap-8">
        
        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-[#191c1e] mb-6">Thông tin cá nhân</h2>
            <form onSubmit={handleUpdateProfile} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Họ và tên</label>
                  <input 
                    type="text" 
                    value={profileData.fullName}
                    onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                    className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Nhập họ và tên"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Số điện thoại</label>
                  <input 
                    type="tel" 
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Email</label>
                  <input 
                    type="email" 
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Nhập địa chỉ email"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-md shadow-primary/20 flex items-center gap-2">
                  <Check size={18} /> Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "password" && (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-[#191c1e] mb-6">Đổi mật khẩu</h2>
            <form onSubmit={handleUpdatePassword} className="flex flex-col gap-6 max-w-lg">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Mật khẩu hiện tại</label>
                <input 
                  type="password" 
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                  className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Nhập mật khẩu hiện tại"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Mật khẩu mới</label>
                <input 
                  type="password" 
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Nhập mật khẩu mới"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Xác nhận mật khẩu mới</label>
                <input 
                  type="password" 
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Nhập lại mật khẩu mới"
                  required
                />
              </div>
              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-md shadow-primary/20 flex items-center gap-2">
                  <Check size={18} /> Cập nhật mật khẩu
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                        <div></div>
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
                        <div></div>
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
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardContentSection;
