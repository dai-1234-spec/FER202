import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  answerQuestion,
  nextQuestion,
  prevQuestion,
  jumpToQuestion,
  submitExam,
} from '../store/slices/examSlice';
import Swal from 'sweetalert2';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

const QuizPage = () => {
  const dispatch = useDispatch();
  const { questions, currentIndex, userAnswers, submitted } = useSelector(state => state.exam);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  if (!questions.length) return null;

  const q = questions[currentIndex];
  const userAns = userAnswers[q.id];
  const correctLetter = q.answer.toUpperCase();
  const answeredCount = Object.keys(userAnswers).length;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (letter) => {
    if (submitted) return;
    dispatch(answerQuestion({ questionId: q.id, answer: letter }));
  };

  const handleNext = () => {
    dispatch(nextQuestion());
  };

  const handlePrev = () => {
    dispatch(prevQuestion());
  };

  const handleJump = (idx) => {
    dispatch(jumpToQuestion(idx));
  };

  const handleSubmit = () => {
    const unanswered = questions.length - answeredCount;
    Swal.fire({
      title: 'Nộp bài?',
      html: unanswered > 0
        ? `Bạn còn <b style="color:#ef4444">${unanswered}</b> câu chưa trả lời.<br/>Bạn có chắc muốn nộp bài không?`
        : `Bạn đã trả lời tất cả ${questions.length} câu. Nộp bài?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '✅ Nộp bài',
      cancelButtonText: 'Tiếp tục làm',
      background: '#1e2235',
      color: '#f1f3f9',
      confirmButtonColor: '#6c63ff',
      cancelButtonColor: '#374151',
    }).then(res => {
      if (res.isConfirmed) {
        clearInterval(timerRef.current);
        dispatch(submitExam());
      }
    });
  };

  const getOptionClass = (letter) => {
    if (!userAns && !submitted) return '';
    if (submitted) {
      if (letter === correctLetter) return 'correct';
      if (letter === userAns && letter !== correctLetter) return 'wrong';
      return '';
    }
    // not submitted, just selected
    if (letter === userAns) return 'selected';
    return '';
  };

  const timerClass = seconds > 3600
    ? 'timer-display danger'
    : seconds > 1800
    ? 'timer-display warning'
    : 'timer-display';

  return (
    <div className="quiz-layout">
      {/* Sidebar */}
      <aside className="quiz-sidebar">
        <div className="sidebar-title">Câu hỏi ({questions.length})</div>
        <div className="question-grid">
          {questions.map((qq, idx) => {
            const ans = userAnswers[qq.id];
            let cls = 'q-nav-btn';
            if (idx === currentIndex) cls += ' active';
            else if (submitted) {
              const correct = qq.answer.toUpperCase();
              if (!ans) cls += ' wrong'; // unanswered = wrong
              else if (ans.toUpperCase() === correct) cls += ' correct';
              else cls += ' wrong';
            } else if (ans) {
              cls += ' answered';
            }
            return (
              <button key={qq.id} className={cls} onClick={() => handleJump(idx)}>
                {idx + 1}
              </button>
            );
          })}
        </div>

        <div className="sidebar-legend">
          {!submitted ? (
            <>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: '#6c63ff' }} />
                Đang làm
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: 'var(--success)' }} />
                Đã trả lời
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: 'var(--bg-card)' }} />
                Chưa trả lời
              </div>
            </>
          ) : (
            <>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: 'var(--success)' }} />
                Đúng
              </div>
              <div className="legend-item">
                <div className="legend-dot" style={{ background: 'var(--danger)' }} />
                Sai / Bỏ qua
              </div>
            </>
          )}
        </div>

        <div style={{ marginTop: 20, padding: '12px', background: 'var(--bg-card)', borderRadius: 10, border: '1px solid var(--border)' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Tiến độ</div>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{answeredCount} / {questions.length}</div>
        </div>
      </aside>

      {/* Main content */}
      <main className="quiz-main">
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span className="badge-pill badge-accent">
            Câu {currentIndex + 1} / {questions.length}
          </span>
          <span className={timerClass}>{formatTime(seconds)}</span>
        </div>

        {/* Progress bar */}
        <div className="progress-bar-wrapper">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Question */}
        <div className="fade-in" key={q.id}>
          <div className="question-header">
            <span className="q-number-badge">Q{q.id}</span>
          </div>

          <div className="question-text">{q.question}</div>

          {q.image && (
            <div style={{ marginBottom: 24, textAlign: 'center' }}>
              <img src={q.image} alt={`Question ${q.id}`} style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid var(--border)' }} />
            </div>
          )}



          {/* Options */}
          <div className="options-list">
            {q.options.map((opt, i) => {
              const letter = LETTERS[i];
              const cls = `option-btn ${getOptionClass(letter)}`;
              return (
                <button
                  key={letter}
                  className={cls}
                  onClick={() => handleAnswer(letter)}
                  disabled={submitted}
                >
                  <span className="option-letter">{letter}</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="quiz-actions">
            <button
              className="btn-secondary-custom"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              ← Trước
            </button>

            {!submitted && (
              <>
                {userAns && (
                  <button className="btn-secondary-custom" onClick={() => {
                    dispatch(answerQuestion({ questionId: q.id, answer: null }));
                  }}>
                    🔄 Đặt lại
                  </button>
                )}
              </>
            )}

            <div className="spacer" />

            {!submitted && (
              <button className="btn-danger-custom" onClick={handleSubmit}>
                📤 Nộp bài
              </button>
            )}

            <button
              className="btn-primary-custom"
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
            >
              Tiếp →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
