import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Check if user already exists
      const checkResponse = await axios.get(`http://localhost:3001/users`);
      const users = checkResponse.data;
      const userExists = users.some(u => u.username.toLowerCase() === formData.username.toLowerCase());

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

      await axios.post("http://localhost:3001/users", newUser);
      Swal.fire({
        icon: 'success',
        title: 'Đăng ký thành công',
        text: 'Vui lòng đăng nhập để tiếp tục.',
        confirmButtonColor: '#003d9b'
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
