import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetExam, startExam } from '../store/slices/examSlice';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

const ResultPage = () => {
  const dispatch = useDispatch();
  const { questions, userAnswers, score, wrongQuestions } = useSelector(state => state.exam);
  const [filter, setFilter] = useState('all'); // 'all' | 'wrong' | 'correct'

  const total = questions.length;
  const percentage = Math.round((score / total) * 100);
  const pctVar = `${percentage * 3.6}deg`;

  const passed = percentage >= 60;

  const filtered = filter === 'all'
    ? questions
    : filter === 'correct'
    ? questions.filter(q => {
        const ua = userAnswers[q.id];
        return ua && ua.toUpperCase() === q.answer.toUpperCase();
      })
    : questions.filter(q => {
        const ua = userAnswers[q.id];
        return !ua || ua.toUpperCase() !== q.answer.toUpperCase();
      });



  const handleRetryWrong = () => {
    dispatch(startExam({ size: 0, filterMode: 'wrong' }));
  };

  return (
    <div className="result-container fade-in">
      {/* Score Circle */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div
          className="score-circle"
          style={{ '--pct': pctVar }}
        >
          <div className="score-number">
            <span className="big" style={{ color: passed ? 'var(--success)' : 'var(--danger)' }}>
              {percentage}%
            </span>
            <span className="small">{score}/{total}</span>
          </div>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
          {percentage >= 90 ? '🏆 Xuất sắc!' :
           percentage >= 75 ? '🎉 Rất tốt!' :
           percentage >= 60 ? '✅ Đạt!' :
           '📚 Cần cố gắng hơn!'}
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          {passed ? 'Bạn đã vượt qua ngưỡng đậu (60%)!' : 'Hãy ôn luyện thêm nhé!'}
        </p>
      </div>

      {/* Stats */}
      <div className="result-stats" style={{ marginBottom: 32 }}>
        <div className="result-stat">
          <div className="value" style={{ color: 'var(--success)' }}>{score}</div>
          <div className="label">✅ Đúng</div>
        </div>
        <div className="result-stat">
          <div className="value" style={{ color: 'var(--danger)' }}>{total - score}</div>
          <div className="label">❌ Sai</div>
        </div>
        <div className="result-stat">
          <div className="value" style={{ color: 'var(--accent)' }}>{total}</div>
          <div className="label">📝 Tổng câu</div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
        <button className="btn-primary-custom" onClick={() => dispatch(resetExam())}>
          🏠 Trang chủ
        </button>
        {wrongQuestions.length > 0 && (
          <button className="btn-danger-custom" onClick={handleRetryWrong}>
            🔄 Ôn câu sai ({wrongQuestions.length})
          </button>
        )}
      </div>

      {/* Review */}
      <div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <h3 style={{ fontWeight: 700, fontSize: 17 }}>📋 Xem lại đáp án</h3>
          <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
            {['all', 'correct', 'wrong'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={filter === f ? 'btn-primary-custom btn-sm-custom' : 'btn-secondary-custom btn-sm-custom'}
              >
                {f === 'all' ? `Tất cả (${total})` : f === 'correct' ? `Đúng (${score})` : `Sai (${total - score})`}
              </button>
            ))}
          </div>
        </div>

        <div className="review-list">
          {filtered.map((q, idx) => {
            const ua = userAnswers[q.id];
            const correctL = q.answer.toUpperCase();
            const isRight = ua && ua.toUpperCase() === correctL;
            const correctIdx = LETTERS.indexOf(correctL);
            const userIdx = ua ? LETTERS.indexOf(ua.toUpperCase()) : -1;

            return (
              <div key={q.id} className={`review-item ${isRight ? 'correct' : 'wrong'}`}>
                <div className="review-q-header">
                  <span className="q-number-badge" style={{ fontSize: 11, padding: '3px 8px' }}>Q{q.id}</span>
                  <div className="review-q-text">{q.question}</div>
                  <span style={{ marginLeft: 'auto', flexShrink: 0 }}>
                    {isRight ? '✅' : '❌'}
                  </span>
                </div>

                {q.image && (
                  <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center' }}>
                    <img src={q.image} alt={`Question ${q.id}`} style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                  </div>
                )}

                <div className="review-answers">
                  <div className="review-answer-row">
                    <span className="answer-tag correct-tag">Đáp án đúng</span>
                    <span style={{ color: 'var(--text-primary)', fontSize: 13 }}>
                      <strong>{correctL}.</strong> {correctIdx >= 0 ? q.options[correctIdx] : '—'}
                    </span>
                  </div>
                  {ua && !isRight && (
                    <div className="review-answer-row">
                      <span className="answer-tag wrong-tag">Bạn chọn</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
                        <strong>{ua.toUpperCase()}.</strong> {userIdx >= 0 ? q.options[userIdx] : '—'}
                      </span>
                    </div>
                  )}
                  {!ua && (
                    <div className="review-answer-row">
                      <span className="answer-tag wrong-tag">Bỏ qua</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>Không trả lời</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
