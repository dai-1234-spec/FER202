import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMode } from '../store/slices/examSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { allQuestions, wrongQuestions, mode } = useSelector(state => state.exam);

  const handleHome = () => dispatch(setMode('home'));
  const handleBrowse = () => dispatch(setMode('browse'));


  return (
    <nav className="exam-navbar">
      <div>
        <div
          className="navbar-brand-text"
          style={{ cursor: 'pointer' }}
          onClick={handleHome}
        >
          📚 FER202 Exam Prep
        </div>
        <div className="navbar-subtitle">MIS Practice Quiz — 275 Questions</div>
      </div>

      <div className="navbar-stats">
        <div className="stat-chip" onClick={handleBrowse} style={{ cursor: 'pointer' }}>
          <span className="dot" style={{ background: '#6c63ff' }} />
          {allQuestions.length} Câu hỏi
        </div>
        {wrongQuestions.length > 0 && (
          <div className="stat-chip">
            <span className="dot" style={{ background: '#ef4444' }} />
            {wrongQuestions.length} Sai
          </div>
        )}
        {mode !== 'home' && mode !== 'browse' && (
          <button className="btn-secondary-custom btn-sm-custom" onClick={handleHome}>
            🏠 Trang chủ
          </button>
        )}
        {mode === 'browse' && (
          <button className="btn-secondary-custom btn-sm-custom" onClick={handleHome}>
            🏠 Trang chủ
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
