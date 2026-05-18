# Hướng dẫn xây dựng AI Chatbot cho EduFinder

Tài liệu này hướng dẫn cách tích hợp một trợ lý ảo thông minh vào dự án EduFinder để tư vấn trung tâm ngoại ngữ dựa trên dữ liệu thực tế từ `database.json`.

## 1. Kiến trúc hệ thống
*   **LLM (Large Language Model)**: Sử dụng Google Gemini API (Miễn phí, tốc độ nhanh).
*   **Context Injection**: Truyền dữ liệu từ `database.json` vào prompt của AI để nó có "kiến thức" về các trung tâm.
*   **Backend**: Sử dụng Vercel Serverless Function (`api/chat.js`) để bảo mật API Key.
*   **Frontend**: React Component (`ChatBot.jsx`) với giao diện bong bóng chat.

## 2. Các bước triển khai chi tiết

### Bước 1: Lấy API Key
1.  Truy cập [Google AI Studio](https://aistudio.google.com/).
2.  Tạo một **API Key** mới.
3.  Lưu vào file `.env` (hoặc cấu hình trên Vercel Dashboard):
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

### Bước 2: Xây dựng Backend (api/chat.js)
Tạo file để xử lý logic gọi AI. File này sẽ đọc dữ liệu từ `api/database.json`.

```javascript
const { GoogleGenerativeAI } = require("@google/generative-ai");
const db = require('./database.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { message } = req.body;
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // 1. Chuẩn bị ngữ cảnh từ dữ liệu trung tâm
  const centersInfo = db.centers.map(c => 
    `- ${c.name}: Khu vực ${c.district}, ${c.city}. Giá: ${c.price}. Tags: ${c.tags.join(', ')}`
  ).join('\n');

  // 2. Thiết lập System Prompt (Quy định hành vi AI)
  const systemPrompt = `
    Bạn là "EduFinder AI" - chuyên gia tư vấn trung tâm ngoại ngữ.
    Dưới đây là dữ liệu các trung tâm bạn quản lý:
    ${centersInfo}

    Quy tắc trả lời:
    - Chỉ tư vấn dựa trên dữ liệu trên.
    - Nếu khách hỏi về giá/địa điểm, hãy liệt kê các trung tâm phù hợp kèm lý do.
    - Nếu khách hỏi câu hỏi ngoài lề (thời tiết, nấu ăn...), hãy lịch sự từ chối và yêu cầu khách tập trung vào việc tìm trung tâm.
    - Trả lời thân thiện, chuyên nghiệp bằng tiếng Việt.
  `;

  try {
    const result = await model.generateContent([systemPrompt, message]);
    const response = await result.response;
    res.status(200).json({ reply: response.text() });
  } catch (error) {
    res.status(500).json({ error: "AI đang bận, thử lại sau nhé!" });
  }
}
```

### Bước 3: Xây dựng Giao diện (src/components/ChatBot/ChatBot.jsx)
Tạo một component bong bóng chat ở góc màn hình.
*   Sử dụng `useState` để lưu danh sách tin nhắn.
*   Sử dụng `axios` để gửi câu hỏi lên `/api/chat`.

### Bước 4: Kiểm soát phạm vi (Guardrails)
Để AI không trả lời "linh tinh", hãy chú ý phần `systemPrompt`. Bạn có thể siết chặt hơn bằng cách thêm câu:
> *"Nếu câu hỏi của người dùng không liên quan đến học tập hoặc tìm kiếm trung tâm, hãy trả lời đúng một câu: 'Tôi chỉ có thể giúp bạn tìm kiếm thông tin về các trung tâm ngoại ngữ trên EduFinder thôi nhé!'"*

## 3. Lợi ích của giải pháp này
*   **Dữ liệu thực**: AI không bao giờ gợi ý một trung tâm không tồn tại trong database của bạn.
*   **Cá nhân hóa**: AI có thể so sánh giữa các trung tâm dựa trên yêu cầu của người dùng.
*   **Nâng tầm dự án**: Tính năng AI giúp bài làm FER202 nổi bật hơn hẳn so với các web tìm kiếm thông thường.

---
*Chúc bạn triển khai thành công tính năng này sau khi hoàn thiện phần web chính!*
