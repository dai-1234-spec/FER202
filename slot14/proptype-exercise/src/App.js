import React from "react";
import UserProfile from "./components/UserProfile";
import UserProfile2 from "./components/UserProfile2";
import MyForm from "././components/MyForm"; 
import RegistrationForm from "./components/RegistrationForm";
const App = () => {
  const handleFormSubmit = (formData) => {
    console.log("Dữ liệu đã gửi:", formData);
  };

  return (
    //userprofile
    // <div className="App">
    //   <h1>Ứng Dụng React</h1>

    //   {/* Trường hợp hợp lệ */}
    //   <UserProfile name="Nguyễn Văn A" age={25} />

    //   {/* Trường hợp name không hợp lệ */}
    //   <UserProfile name="" age={25} />

    //   {/* Trường hợp tuổi không hợp lệ */}
    //   <UserProfile name="Nguyễn Văn B" age="twenty five" />

    //   {/* Trường hợp không nhập tuổi */}
    //   <UserProfile name="Nguyễn Văn C" age={null} />
    // </div>

    // userprofile2
    // <div className="App">
    //   <h1>Ứng Dụng React</h1>
    //   <UserProfile2 name="Nguyễn Văn A" age={25} onSubmit={handleFormSubmit} />
    //   <UserProfile2
    //     name="Nguyễn Văn B"
    //     age="twenty five"
    //     onSubmit={handleFormSubmit}
    //   />
    //   <UserProfile2 name="" age={30} onSubmit={handleFormSubmit} />
    // </div>
    // <div className="App">
    //   <h1>Ứng Dụng React</h1>
    //   <MyForm title="Đăng Ký Người Dùng" onSubmit={handleFormSubmit} />
    // </div>
    <div className="App">
    <h1>Ứng Dụng React</h1>
      <RegistrationForm 
        title="Đăng Ký Thành Viên" 
        onSubmit={handleFormSubmit} 
      />
    </div>
  );
};

export default App;
