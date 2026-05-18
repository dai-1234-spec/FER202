import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, User, ChevronDown } from "lucide-react";

const navItems = [
  { label: "Khám phá", href: "/explore" },
  { label: "So sánh", href: "/compare" },
];

const TopNavigation = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <header className="flex w-full items-center justify-between px-8 py-4 bg-white shadow-[0px_4px_12px_rgba(0,82,204,0.1)] sticky top-0 z-50">
      <div className="flex items-center gap-12">
        <Link to="/" className="text-primary text-2xl font-bold tracking-tight">
          EduFinder
        </Link>
        <nav aria-label="Chính" className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`relative py-1 text-sm font-medium transition-colors ${
                location.pathname === item.href ? "text-primary border-b-2 border-primary" : "text-[#434654] hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="p-2 text-[#434654] hover:bg-gray-100 rounded-full transition-colors relative" aria-label="Thông báo">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          {isLoggedIn ? (
            <Link 
              to="/profile" 
              className="flex items-center gap-2 px-3 py-1.5 border-2 border-primary/20 rounded-full hover:bg-primary/5 transition-all"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs font-bold text-[#191c1e]">Hồ sơ</span>
              <ChevronDown size={14} className="text-gray-400" />
            </Link>
          ) : (
            <Link 
              to="/login"
              className="bg-secondary px-6 py-2.5 rounded-full text-[#684300] text-sm font-bold hover:bg-opacity-90 transition-all shadow-sm"
            >
              Đăng ký / Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
