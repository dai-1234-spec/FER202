import React from "react";
import { Quote } from "lucide-react";
import anImg from "../../assets/student_an.png";
import teacherElena from "../../assets/teacher_elena.png"; // Reusing for student Minh as I hit quota

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    role: "Học viên IELTS 8.0",
    quote: "Môi trường học tập tại EduFinder thực sự khác biệt. Cơ sở vật chất hiện đại giúp mình luôn cảm thấy thoải mái và tập trung. Các thầy cô không chỉ dạy kiến thức mà còn truyền cảm hứng học tập rất lớn. Nhờ lộ trình cá nhân hóa, mình đã đạt IELTS 8.0 chỉ sau 4 tháng!",
    image: anImg,
  },
  {
    id: 2,
    name: "Trần Thị Minh",
    role: "Giám đốc Marketing",
    quote: "Tôi đã thử nhiều trung tâm nhưng chỉ ở EduFinder tôi mới thấy sự chuyên nghiệp thực sự. Khóa Business English đã giúp tôi tự tin đàm phán với các đối tác nước ngoài. Một sự đầu tư hoàn toàn xứng đáng cho sự nghiệp.",
    image: teacherElena, 
  },
];

export const StudentTestimonialsSection = () => {
  return (
    <section className="bg-[#e1e2e4] py-20">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <header className="mb-16">
          <h2 className="mb-4 text-3xl font-bold text-[#191c1e]">Cảm nhận từ học viên</h2>
          <p className="mx-auto max-w-2xl text-[#434654] leading-relaxed">
            Hơn 10.000 học viên đã thay đổi tương lai cùng EduFinder. Hãy nghe câu chuyện của họ.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="relative rounded-2xl bg-white p-8 text-left shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <Quote size={40} className="absolute right-8 top-8 text-[#feaa00]/20" />
              
              <div className="mb-6 flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-14 w-14 rounded-full object-cover shadow-inner"
                />
                <div>
                  <h3 className="text-lg font-bold text-[#191c1e]">{testimonial.name}</h3>
                  <p className="text-xs font-medium text-[#434654] uppercase tracking-wide">{testimonial.role}</p>
                </div>
              </div>
              
              <blockquote className="text-[#434654] leading-relaxed italic">
                "{testimonial.quote}"
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentTestimonialsSection;
