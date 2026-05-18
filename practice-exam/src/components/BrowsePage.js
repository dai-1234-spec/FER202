import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery, setCurrentPage } from '../store/slices/examSlice';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const PER_PAGE = 15;

const BrowsePage = () => {
  const dispatch = useDispatch();
  const { allQuestions, searchQuery, currentPage, wrongQuestions } = useSelector(state => state.exam);
  const [showAnswers, setShowAnswers] = useState(true);
  const [filterWrong, setFilterWrong] = useState(false);

  const filtered = allQuestions.filter(q => {
    const matchSearch = !searchQuery ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.options.some(o => o.toLowerCase().includes(searchQuery.toLowerCase())) ||
      String(q.id).includes(searchQuery);
    const matchWrong = !filterWrong || wrongQuestions.includes(q.id);
    return matchSearch && matchWrong;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(1, totalPages));
  const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handlePage = (p) => {
    dispatch(setCurrentPage(p));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="browse-container">
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
        <h2 style={{ fontWeight: 800, fontSize: 22 }}>📖 Tất cả câu hỏi</h2>
        <span className="badge-pill badge-accent">{filtered.length} câu</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            className={showAnswers ? 'btn-success-custom btn-sm-custom' : 'btn-secondary-custom btn-sm-custom'}
            onClick={() => setShowAnswers(v => !v)}
          >
            {showAnswers ? '🙈 Ẩn đáp án' : '👁 Hiện đáp án'}
          </button>
          {wrongQuestions.length > 0 && (
            <button
              className={filterWrong ? 'btn-danger-custom btn-sm-custom' : 'btn-secondary-custom btn-sm-custom'}
              onClick={() => { setFilterWrong(v => !v); dispatch(setCurrentPage(1)); }}
            >
              ❌ {filterWrong ? 'Xem tất cả' : `Chỉ câu sai (${wrongQuestions.length})`}
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Tìm kiếm câu hỏi, đáp án hoặc số câu..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Questions */}
      {paginated.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <p>Không tìm thấy câu hỏi phù hợp.</p>
        </div>
      ) : (
        paginated.map(q => {
          const correctIdx = LETTERS.indexOf(q.answer.toUpperCase());
          const isWrong = wrongQuestions.includes(q.id);
          return (
            <div key={q.id} className="browse-question-card" style={isWrong ? { borderColor: 'rgba(239,68,68,0.4)' } : {}}>
              <div className="browse-q-id">
                Câu {q.id}
                {isWrong && <span className="badge-pill badge-danger" style={{ marginLeft: 8 }}>❌ Sai trước đó</span>}
              </div>
              <div className="browse-q-text">{q.question}</div>
              
              {q.image && (
                <div style={{ marginBottom: 16, textAlign: 'center' }}>
                  <img src={q.image} alt={`Question ${q.id}`} style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '8px', border: '1px solid var(--border)' }} />
                </div>
              )}

              <div className="browse-options">
                {q.options.map((opt, i) => {
                  const letter = LETTERS[i];
                  const isCorrect = showAnswers && i === correctIdx;
                  return (
                    <div key={letter} className={`browse-option ${isCorrect ? 'correct-opt' : ''}`}>
                      <span className="browse-option-letter">{letter}</span>
                      <span>{opt}</span>
                      {isCorrect && <span style={{ marginLeft: 6 }}>✓</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination-wrapper">
          <button className="page-btn" onClick={() => handlePage(1)} disabled={safePage === 1}>«</button>
          <button className="page-btn" onClick={() => handlePage(safePage - 1)} disabled={safePage === 1}>‹</button>
          {Array.from({ length: Math.min(totalPages, 9) }, (_, i) => {
            let pageNum;
            if (totalPages <= 9) {
              pageNum = i + 1;
            } else if (safePage <= 5) {
              pageNum = i + 1;
            } else if (safePage >= totalPages - 4) {
              pageNum = totalPages - 8 + i;
            } else {
              pageNum = safePage - 4 + i;
            }
            return (
              <button
                key={pageNum}
                className={`page-btn ${safePage === pageNum ? 'active' : ''}`}
                onClick={() => handlePage(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}
          <button className="page-btn" onClick={() => handlePage(safePage + 1)} disabled={safePage === totalPages}>›</button>
          <button className="page-btn" onClick={() => handlePage(totalPages)} disabled={safePage === totalPages}>»</button>
        </div>
      )}
    </div>
  );
};

export default BrowsePage;
