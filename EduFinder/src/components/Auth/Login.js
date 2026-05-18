import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import AuthLayout from "./AuthLayout";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isSubmitDisabled = useMemo(() => {
    return !formData.username.trim() || !formData.password.trim();
  }, [formData.username, formData.password]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`/api/users`);
      const users = response.data;
      
      const user = users.find(u => 
        u.username.toLowerCase() === formData.username.toLowerCase() && 
        u.password === formData.password
      );

      if (user) {
        // Success
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");
        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công',
          text: `Chào mừng ${user.fullName}!`,
          timer: 2000,
          showConfirmButton: false
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError("Tài khoản hoặc mật khẩu không chính xác.");
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Chào mừng trở lại" 
      subtitle="Vui lòng đăng nhập để tiếp tục hành trình học tập của bạn."
    >
      <div className="flex flex-col gap-6">
        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-2.5 border border-[#c3c6d6] rounded-lg hover:bg-gray-50 transition-colors">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            <span className="text-sm font-medium">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-2.5 border border-[#c3c6d6] rounded-lg hover:bg-gray-50 transition-colors">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="Facebook" />
            <span className="text-sm font-medium">Facebook</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-[#c3c6d6]" />
          <span className="text-[#737685] text-xs font-medium uppercase tracking-wider">Hoặc đăng nhập với</span>
          <div className="flex-1 h-px bg-[#c3c6d6]" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#434654] px-1">Tài khoản</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#737685]" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Ví dụ: DS190161"
                className="input-field"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-semibold text-[#434654]">Mật khẩu</label>
              <button type="button" className="text-xs font-semibold text-primary hover:underline">Quên mật khẩu?</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#737685]" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="input-field"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737685] hover:text-primary"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-xs px-1">{error}</p>}

          <div className="flex items-center gap-2 px-1">
            <input
              id="remember"
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleInputChange}
              className="w-4 h-4 border-[#c3c6d6] rounded text-primary focus:ring-primary"
            />
            <label htmlFor="remember" className="text-sm text-[#434654] cursor-pointer select-none">
              Ghi nhớ đăng nhập
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitDisabled || loading}
            className="btn-primary"
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        <p className="text-center text-sm text-[#434654]">
          Chưa có tài khoản?{" "}
          <Link to="/signup" className="text-primary font-bold hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
