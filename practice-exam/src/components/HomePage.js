import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startExam, setMode } from '../store/slices/examSlice';

const SIZE_OPTIONS = [
  { label: 'Tất cả (275 câu)', value: 0 },
  { label: '10 câu ngẫu nhiên', value: 10 },
  { label: '20 câu ngẫu nhiên', value: 20 },
  { label: '30 câu ngẫu nhiên', value: 30 },
  { label: '50 câu ngẫu nhiên', value: 50 },
  { label: '60 câu ngẫu nhiên', value: 60 },
  { label: '100 câu ngẫu nhiên', value: 100 },
];

const HomePage = () => {
  const dispatch = useDispatch();
  const { allQuestions, wrongQuestions } = useSelector(state => state.exam);
  const [showConfig, setShowConfig] = useState(false);
  const [size, setSize] = useState(20);
  const [filterMode, setFilterMode] = useState('all');

  const handleStart = () => {
    dispatch(startExam({ size, filterMode }));
  };

  const handleBrowse = () => {
    dispatch(setMode('browse'));
  };

  if (showConfig) {
    return (
      <div className="home-container">
        <div className="config-panel fade-in">
          <h2>⚙️ Cấu hình bài thi</h2>

          <div className="config-option">
            <label>Số câu hỏi</label>
            <select
              className="select-custom"
              value={size}
              onChange={e => setSize(Number(e.target.value))}
            >
              {SIZE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="config-option">
            <label>Bộ câu hỏi</label>
            <select
              className="select-custom"
              value={filterMode}
              onChange={e => setFilterMode(e.target.value)}
            >
              <option value="all">Tất cả câu hỏi ({allQuestions.length})</option>
              <option value="true_false">Chỉ câu hỏi True/False, Yes/No</option>
              {wrongQuestions.length > 0 && (
                <option value="wrong">Câu sai trước đó ({wrongQuestions.length})</option>
              )}
            </select>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button className="btn-secondary-custom" style={{ flex: 1 }} onClick={() => setShowConfig(false)}>
              ← Quay lại
            </button>
            <button className="btn-primary-custom" style={{ flex: 1 }} onClick={handleStart}>
              🚀 Bắt đầu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-hero fade-in">
        <h1>🎓 Luyện Đề</h1>
        <p>Ôn tập {allQuestions.length} câu hỏi về Information Systems, ERP, Cloud, Security và nhiều chủ đề hơn.</p>
      </div>

      <div className="home-grid fade-in">
        <div className="mode-card" onClick={() => setShowConfig(true)}>
          <span className="mode-card-icon">📝</span>
          <h3>Làm bài trắc nghiệm</h3>
          <p>Chọn số lượng câu hỏi ngẫu nhiên, làm bài và xem kết quả chi tiết sau khi nộp.</p>
          <br />
          <span className="badge-pill badge-accent">✨ Phổ biến nhất</span>
        </div>

        <div className="mode-card" onClick={handleBrowse}>
          <span className="mode-card-icon">📖</span>
          <h3>Xem tất cả câu hỏi</h3>
          <p>Duyệt toàn bộ 275 câu hỏi kèm đáp án đúng. Tìm kiếm theo từ khóa.</p>
          <br />
          {wrongQuestions.length > 0 && (
            <span className="badge-pill badge-danger">⚠️ {wrongQuestions.length} câu cần ôn lại</span>
          )}
        </div>

        {wrongQuestions.length > 0 && (
          <div className="mode-card" onClick={() => {
            setFilterMode('wrong');
            setSize(0);
            setShowConfig(true);
          }}>
            <span className="mode-card-icon">🔥</span>
            <h3>Ôn câu sai</h3>
            <p>Tập trung vào {wrongQuestions.length} câu bạn đã trả lời sai trong các lần thi trước.</p>
            <br />
            <span className="badge-pill badge-danger">❌ {wrongQuestions.length} câu sai</span>
          </div>
        )}

        <div className="mode-card" onClick={() => {
          setFilterMode('true_false');
          setSize(0);
          setShowConfig(true);
        }}>
          <span className="mode-card-icon">⚖️</span>
          <h3>Ôn câu True/False, Yes/No</h3>
          <p>Tập trung làm bộ câu hỏi dạng chọn Đúng/Sai hoặc Có/Không.</p>
        </div>
      </div>

      <div style={{ marginTop: 40, textAlign: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 24, justifyContent: 'center' }}>
          {[
            { label: 'Tổng câu hỏi', value: allQuestions.length, color: '#6c63ff' },
            { label: 'Chủ đề', value: '10+', color: '#22c55e' },
            { label: 'Câu sai cần ôn', value: wrongQuestions.length, color: '#ef4444' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
