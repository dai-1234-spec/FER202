import React from "react";
import sarahImg from "../../assets/teacher_sarah.png";
import robertImg from "../../assets/teacher_robert.png";
import elenaImg from "../../assets/teacher_elena.png";
import jamesImg from "../../assets/teacher_james.png";

const teacherProfiles = [
  {
    name: "Dr. Sarah Jenkins",
    role: "ACADEMIC DIRECTOR",
    description: "15+ năm kinh nghiệm đào tạo IELTS tại các tổ chức quốc tế.",
    image: sarahImg,
  },
  {
    name: "Mr. Robert Chen",
    role: "SENIOR LECTURER",
    description: "Chuyên gia luyện phát âm và kỹ năng thuyết trình trước công chúng.",
    image: robertImg,
  },
  {
    name: "Ms. Elena Petrova",
    role: "IELTS SPECIALIST",
    description: "Tác giả của nhiều đầu sách luyện thi chứng chỉ quốc tế nổi tiếng.",
    image: elenaImg,
  },
  {
    name: "Mr. James Wilson",
    role: "LANGUAGE COACH",
    description: "Cố vấn học tập tận tâm với phương pháp giảng dạy tương tác 4.0.",
    image: jamesImg,
  },
];

export const TeacherProfilesSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-[#191c1e]">Đội ngũ giảng viên chuyên nghiệp</h2>
        <div className="mt-2 mx-auto h-1 w-20 bg-[#feaa00] rounded-full" />
      </div>
      
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {teacherProfiles.map((teacher, index) => (
          <article key={index} className="flex flex-col items-center text-center">
            <div className="relative mb-6 h-44 w-44 overflow-hidden rounded-full border-4 border-white shadow-xl ring-2 ring-gray-100 transition-transform hover:scale-105">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="h-full w-full object-cover"
              />
            </div>
            
            <h3 className="text-lg font-bold text-[#191c1e]">{teacher.name}</h3>
            <p className="mt-1 text-[10px] font-bold tracking-widest text-primary uppercase">{teacher.role}</p>
            <p className="mt-4 text-sm text-[#434654] leading-relaxed max-w-[200px]">
              {teacher.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TeacherProfilesSection;
