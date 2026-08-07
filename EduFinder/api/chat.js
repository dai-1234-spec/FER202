const fs = require('fs');
const path = require('path');

// ========== HELPERS ==========

/**
 * Đọc CHỈ dữ liệu centers từ database.json
 * KHÔNG BAO GIỜ đọc users, reviews, registrations
 */
function getCentersData() {
  const dbPath = path.join(__dirname, 'database.json');
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  return db.centers || [];
}

/**
 * Xây dựng context string từ dữ liệu centers
 */
function buildCentersContext(centers) {
  return centers
    .filter(c => c.name && c.id) // Chỉ lấy centers có đầy đủ info
    .map(c => {
      let info = `📍 [ID:${c.id}] ${c.name}`;
      if (c.city) info += ` | Thành phố: ${c.city}`;
      if (c.district) info += `, ${c.district}`;
      if (c.address) info += ` | Địa chỉ: ${c.address}`;
      if (c.rating) info += ` | Đánh giá: ${c.rating}/5`;
      if (c.tags && c.tags.length) info += ` | Chuyên: ${c.tags.join(', ')}`;
      if (c.phone) info += ` | SĐT: ${c.phone}`;
      if (c.website) info += ` | Website: ${c.website}`;
      if (c.description) info += `\n   Mô tả: ${c.description}`;
      if (c.stats) {
        const s = c.stats;
        info += `\n   Thống kê: ${s.students || '?'} học viên, ${s.teachers || '?'} giáo viên, ${s.courses || '?'} khóa học, Thành lập: ${s.established || '?'}`;
      }
      if (c.highlights && c.highlights.length) {
        info += `\n   Điểm nổi bật: ${c.highlights.join(' | ')}`;
      }
      if (c.featuredCourses && c.featuredCourses.length) {
        const courses = c.featuredCourses.map(fc =>
          `${fc.name} (${fc.duration}, ${fc.level})`
        ).join('; ');
        info += `\n   Khóa học: ${courses}`;
      }
      return info;
    }).join('\n\n');
}

/**
 * System prompt cho AI
 */
function getSystemPrompt(centersContext) {
  return `Bạn là "EduFinder AI" — trợ lý tư vấn trung tâm ngoại ngữ thông minh của nền tảng EduFinder.

DỮ LIỆU CÁC TRUNG TÂM BẠN QUẢN LÝ:
${centersContext}

QUY TẮC BẮT BUỘC:
1. CHỈ tư vấn dựa trên dữ liệu các trung tâm ở trên. KHÔNG BAO GIỜ bịa thêm trung tâm hay thông tin không có trong dữ liệu.
2. Khi người dùng hỏi về giá cả/học phí mà dữ liệu không có, hãy gợi ý họ liên hệ trực tiếp trung tâm qua SĐT hoặc website.
3. Nếu người dùng hỏi câu hỏi KHÔNG liên quan đến việc tìm kiếm trung tâm ngoại ngữ, trả lời đúng một câu: "Mình chỉ có thể giúp bạn tìm kiếm và tư vấn về các trung tâm ngoại ngữ trên EduFinder thôi nhé! 😊"
4. Trả lời thân thiện, chuyên nghiệp, LUÔN LUÔN bằng tiếng Việt.
5. Khi gợi ý trung tâm, hãy giải thích LÝ DO tại sao phù hợp với yêu cầu.
6. Nếu có thể, so sánh 2-3 trung tâm phù hợp để người dùng dễ lựa chọn.
7. Sử dụng emoji phù hợp để câu trả lời sinh động hơn.
8. KHÔNG BAO GIỜ tiết lộ thông tin cá nhân của người dùng (username, password, v.v.).
9. Giữ câu trả lời ngắn gọn, dễ đọc. Dùng bullet points khi liệt kê.`;
}

/**
 * Bộ phản hồi dự phòng thông minh (Mock fallback) khi API hết token hoặc quá tải
 */
function getMockFallbackReply(message, centers) {
  const query = message.toLowerCase().trim();

  // 1. Kiểm tra hỏi về IELTS
  if (query.includes('ielts')) {
    const matching = centers.filter(c => c.tags && c.tags.some(t => t.toLowerCase().includes('ielts')));
    if (matching.length > 0) {
      let reply = `Dưới đây là một số trung tâm đào tạo **IELTS** nổi bật trên EduFinder dành cho bạn:\n\n`;
      matching.slice(0, 3).forEach(c => {
        reply += `📍 **${c.name}**\n`;
        if (c.address) reply += `- Địa chỉ: ${c.address}\n`;
        if (c.rating) reply += `- Đánh giá: ${c.rating}/5 ⭐\n`;
        if (c.phone) reply += `- SĐT: ${c.phone}\n`;
        if (c.website) reply += `- Website: [Ghé thăm](${c.website})\n`;
        reply += `\n`;
      });
      reply += `Bạn có thể bấm vào phần **Khám phá** trên thanh menu để so sánh học phí nhé! 😊`;
      return reply;
    }
  }

  // 2. Kiểm tra hỏi về Giao tiếp
  if (query.includes('giao tiếp') || query.includes('speaking') || query.includes('nói') || query.includes('nghe')) {
    const matching = centers.filter(c => c.tags && c.tags.some(t => t.toLowerCase().includes('giao tiếp') || t.toLowerCase().includes('giao tiếp cơ bản')));
    if (matching.length > 0) {
      let reply = `Dưới đây là các trung tâm học **Tiếng Anh Giao tiếp** hàng đầu được đánh giá rất cao trên EduFinder:\n\n`;
      matching.slice(0, 3).forEach(c => {
        reply += `📍 **${c.name}**\n`;
        if (c.address) reply += `- Địa chỉ: ${c.address}\n`;
        if (c.rating) reply += `- Đánh giá: ${c.rating}/5 ⭐\n`;
        if (c.website) reply += `- Website: [Ghé thăm](${c.website})\n`;
        reply += `\n`;
      });
      reply += `Chúc bạn mau chóng cải thiện được kỹ năng phản xạ tự nhiên của mình! 💪`;
      return reply;
    }
  }

  // 3. Tìm kiếm theo thành phố / khu vực
  if (query.includes('đà nẵng') || query.includes('da nang') || query.includes('hải châu') || query.includes('thanh khê')) {
    const matching = centers.filter(c => c.city && c.city.toLowerCase().includes('đà nẵng'));
    if (matching.length > 0) {
      let reply = `Các trung tâm ngoại ngữ hàng đầu tại khu vực **Đà Nẵng**:\n\n`;
      matching.slice(0, 3).forEach(c => {
        reply += `📍 **${c.name}** (${c.district || 'Hải Châu'})\n`;
        if (c.address) reply += `- Địa chỉ: ${c.address}\n`;
        if (c.rating) reply += `- Đánh giá: ${c.rating}/5 ⭐\n`;
        reply += `\n`;
      });
      return reply;
    }
  }

  // 4. Tìm kiếm theo tên trung tâm cụ thể
  for (const c of centers) {
    if (query.includes(c.name.toLowerCase()) || (c.tags && c.tags.some(t => query.includes(t.toLowerCase())))) {
      let reply = `Dưới đây là thông tin về trung tâm **${c.name}** mà bạn đang tìm kiếm:\n\n`;
      if (c.address) reply += `- 📍 Địa chỉ: ${c.address}\n`;
      if (c.phone) reply += `- 📞 Hotline: ${c.phone}\n`;
      if (c.rating) reply += `- ⭐ Đánh giá: ${c.rating}/5\n`;
      if (c.website) reply += `- 🌐 Website: [Ghé thăm](${c.website})\n`;
      if (c.description) reply += `- 📝 Mô tả: ${c.description}\n`;
      return reply;
    }
  }

  // 5. Phản hồi chung chung thông minh
  return `Chào bạn! Cảm ơn bạn đã hỏi EduFinder AI. Hiện tại lượng truy cập chatbot đang rất lớn (hoặc API đang được bảo trì cho buổi demo).\n\nTuy nhiên, bạn hoàn toàn có thể sử dụng các tính năng tuyệt vời sau:\n- 🔍 Tìm và lọc trung tâm tại trang **Khám phá**\n- 📊 So sánh trực tiếp học phí, đánh giá tại trang **So sánh**\n- Thử nhập các câu hỏi cụ thể như **"IELTS"**, **"Giao tiếp"**, **"Đà Nẵng"** để mình tìm nhanh thông tin nhé! ❤️`;
}

// ========== API PROVIDERS ==========

/**
 * Gọi Google Gemini API (Primary)
 */
async function callGemini(systemPrompt, messages) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  // Build conversation contents cho Gemini format
  const contents = [];

  // Thêm history messages
  for (const msg of messages) {
    contents.push({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    });
  }

  const body = {
    system_instruction: {
      parts: [{ text: systemPrompt }]
    },
    contents: contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('Gemini error:', response.status, errText);
    return null;
  }

  const data = await response.json();
  if (data.candidates && data.candidates[0] && data.candidates[0].content) {
    return data.candidates[0].content.parts[0].text;
  }
  return null;
}

/**
 * Gọi Groq API (Fallback)
 */
async function callGroq(systemPrompt, messages) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  const url = 'https://api.groq.com/openai/v1/chat/completions';

  const groqMessages = [
    { role: 'system', content: systemPrompt },
    ...messages
  ];

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: groqMessages,
      temperature: 0.7,
      max_tokens: 1024,
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('Groq error:', response.status, errText);
    return null;
  }

  const data = await response.json();
  if (data.choices && data.choices[0] && data.choices[0].message) {
    return data.choices[0].message.content;
  }
  return null;
}

// ========== MAIN HANDLER ==========

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Vui lòng nhập câu hỏi.' });
    }

    // Giới hạn độ dài tin nhắn đầu vào tránh lạm dụng và bảo vệ token
    if (message.trim().length > 200) {
      return res.status(400).json({
        error: 'Câu hỏi của bạn quá dài. Vui lòng nhập ngắn gọn dưới 200 ký tự nhé! 😊'
      });
    }

    // 1. Load center data (KHÔNG load user data)
    const centers = getCentersData();
    const centersContext = buildCentersContext(centers);
    const systemPrompt = getSystemPrompt(centersContext);

    // 2. Build messages array
    const messages = [
      ...history.slice(-10), // Giữ tối đa 10 tin nhắn gần nhất
      { role: 'user', content: message.trim() }
    ];

    // 3. Try Gemini first, then Groq fallback
    let reply = await callGemini(systemPrompt, messages);

    if (!reply) {
      console.log('Gemini failed, falling back to Groq...');
      reply = await callGroq(systemPrompt, messages);
    }

    // 4. Nếu cả hai API đều thất bại, kích hoạt bộ Phản hồi dự phòng thông minh (Mock Fallback)
    if (!reply) {
      console.log('Both Gemini and Groq failed, activating smart local fallback...');
      reply = getMockFallbackReply(message, centers);
    }

    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({
      error: 'Có lỗi xảy ra, vui lòng thử lại sau nhé! 😅'
    });
  }
};
