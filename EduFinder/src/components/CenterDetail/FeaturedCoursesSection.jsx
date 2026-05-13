import React from "react";
import { Clock, Tag, ChevronRight } from "lucide-react";
import ieltsImg from "../../assets/course_ielts.png";
import businessImg from "../../assets/course_business.png";
import kiddoImg from "../../assets/course_kiddo.png";

const courses = [
  {
    id: 1,
    title: "Luyện thi IELTS Cấp tốc 7.5+",
    description: "Lộ trình tinh gọn dành cho học viên cần bằng gấp trong 3 tháng. Tập trung kỹ thuật làm bài và tư duy.",
    price: "6.800k",
    duration: "12 Tuần",
    badge: "IELTS INTENSIVE",
    badgeClass: "bg-[#003d9b]",
    image: ieltsImg,
  },
  {
    id: 2,
    title: "Tiếng Anh Giao tiếp Công sở",
    description: "Nâng tầm kỹ năng đàm phán, thuyết trình và viết email chuyên nghiệp cho người đi làm.",
    price: "4.200k",
    duration: "8 Tuần",
    badge: "BUSINESS ENGLISH",
    badgeClass: "bg-[#825500]",
    image: businessImg,
  },
  {
    id: 3,
    title: "Tiếng Anh Thiếu nhi (KIDDO)",
    description: "Học mà chơi, chơi mà học thông qua dự án và hoạt động ngoại khóa sinh động.",
    price: "3.500k",
    duration: "16 Tuần",
    badge: "YOUNG LEARNERS",
    badgeClass: "bg-[#004b59]",
    image: kiddoImg,
  },
];

export const FeaturedCoursesSection = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-10 flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold tracking-[2px] text-[#003d9b] uppercase">CHƯƠNG TRÌNH ĐÀO TẠO</span>
            <h2 className="text-3xl font-bold text-[#191c1e]">Khóa học nổi bật</h2>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-[#003d9b] hover:underline">
            Xem tất cả <ChevronRight size={16} />
          </button>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <article key={course.id} className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48">
                <img src={course.image} alt={course.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                <div className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold text-white ${course.badgeClass}`}>
                  {course.badge}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="mb-2 text-lg font-bold text-[#191c1e] line-clamp-1">{course.title}</h3>
                <p className="mb-6 text-sm text-[#434654] line-clamp-2 leading-relaxed">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between border-t border-[#c3c6d6] pt-4">
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-[#003d9b]">{course.price}</span>
                    <span className="text-[10px] text-[#434654]">/khóa</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#434654]">
                    <Clock size={14} />
                    <span className="text-xs font-medium">{course.duration}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;
