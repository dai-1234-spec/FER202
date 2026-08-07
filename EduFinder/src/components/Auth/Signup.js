import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import { useGoogleLogin } from "@react-oauth/google";
import AuthLayout from "./AuthLayout";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isSubmitDisabled = useMemo(() => {
    return (
      !formData.username.trim() ||
      !formData.fullName.trim() ||
      !formData.password.trim() ||
      formData.password !== formData.confirmPassword
    );
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        const googleUser = {
          id: userInfo.data.sub || Date.now().toString(),
          username: userInfo.data.email,
          email: userInfo.data.email,
          fullName: userInfo.data.name,
          avatar: userInfo.data.picture,
          role: "user",
          password: "OAuthUser_Google", // placeholder password
        };

        const localUsers = JSON.parse(localStorage.getItem('local_users') || '[]');
        if (!localUsers.some(u => u.email === googleUser.email)) {
          localUsers.push(googleUser);
          localStorage.setItem('local_users', JSON.stringify(localUsers));

          try {
            await axios.post('/api/users', googleUser);
          } catch (e) {
            console.error("Failed to sync Google user to database.json", e);
          }
        } else {
          // If already exists, grab details
          const found = localUsers.find(u => u.email === googleUser.email);
          googleUser.fullName = found.fullName || googleUser.fullName;
          googleUser.id = found.id || googleUser.id;
        }

        localStorage.setItem("user", JSON.stringify(googleUser));
        localStorage.setItem("isLoggedIn", "true");

        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công',
          text: `Chào mừng ${googleUser.fullName}!`,
          timer: 2000,
          showConfirmButton: false
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Không thể đăng nhập bằng Google. Vui lòng thử lại!',
        });
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => {
      console.error('Google signup failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Thất bại',
        text: 'Đăng ký bằng Google thất bại!',
      });
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Check if user already exists
      const checkResponse = await axios.get(`/api/users`);
      const dbUsers = checkResponse.data;
      const localUsers = JSON.parse(localStorage.getItem('local_users') || '[]');
      const allUsers = [...dbUsers, ...localUsers];

      const userExists = allUsers.some(u => u.username.toLowerCase() === formData.username.toLowerCase());

      if (userExists) {
        setError("Tài khoản này đã được đăng ký.");
        setLoading(false);
        return;
      }

      // Register new user
      const newUser = {
        id: formData.username,
        username: formData.username,
        password: formData.password,
        fullName: formData.fullName,
      };

      localUsers.push(newUser);
      localStorage.setItem('local_users', JSON.stringify(localUsers));
      Swal.fire({
        icon: 'success',
        title: 'Đăng ký thành công',
        text: 'Vui lòng đăng nhập để tiếp tục.',
        confirmButtonColor: '#6355f6'
      });
      navigate("/login");
    } catch (err) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Tạo tài khoản mới" 
      subtitle="Tham gia cùng hàng ngàn học viên tại EduFinder ngay hôm nay."
    >
      <div className="flex flex-col gap-6 mb-6">
        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            type="button"
            onClick={() => loginWithGoogle()}
            className="flex items-center justify-center gap-2 py-2.5 border border-[#c3c6d6] rounded-lg hover:bg-gray-50 transition-colors"
          >
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
          <span className="text-[#737685] text-xs font-medium uppercase tracking-wider">Hoặc đăng ký với</span>
          <div className="flex-1 h-px bg-[#c3c6d6]" />
        </div>
      </div>

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
          <label className="text-xs font-semibold text-[#434654] px-1">Họ và tên</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#737685]" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Nguyễn Văn A"
              className="input-field"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#434654] px-1">Mật khẩu</label>
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
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#434654] px-1">Xác nhận mật khẩu</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#737685]" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="input-field"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-xs px-1">{error}</p>}
        {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
          <p className="text-red-500 text-xs px-1">Mật khẩu xác nhận không khớp.</p>
        )}

        <button
          type="submit"
          disabled={isSubmitDisabled || loading}
          className="btn-primary mt-2"
        >
          {loading ? "Đang xử lý..." : "Đăng ký"}
        </button>
      </form>

      <p className="text-center text-sm text-[#434654] mt-6">
        Đã có tài khoản?{" "}
        <Link to="/login" className="text-primary font-bold hover:underline">
          Đăng nhập ngay
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;
