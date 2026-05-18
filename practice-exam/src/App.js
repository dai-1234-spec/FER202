import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions } from './store/slices/examSlice';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';
import BrowsePage from './components/BrowsePage';

function App() {
  const dispatch = useDispatch();
  const { mode, loading, error } = useSelector(state => state.exam);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-screen">
          <div className="spinner" />
          <p style={{ color: 'var(--text-secondary)' }}>Loading questions...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="loading-screen">
          <p style={{ color: 'var(--danger)' }}>⚠️ Error: {error}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
            Make sure json-server is running: <code>npm run server</code>
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      {mode === 'home' && <HomePage />}
      {mode === 'practice' && <QuizPage />}
      {mode === 'result' && <ResultPage />}
      {mode === 'browse' && <BrowsePage />}
    </>
  );
}

export default App;
