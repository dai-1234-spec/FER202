import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import questionsData from '../../database.json';

export const fetchQuestions = createAsyncThunk(
  'exam/fetchQuestions',
  async (_, { rejectWithValue }) => {
    try {
      // Use embedded JSON — no backend required
      return questionsData.questions;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const examSlice = createSlice({
  name: 'exam',
  initialState: {
    allQuestions: [],
    questions: [],         // questions used in current session
    currentIndex: 0,
    userAnswers: {},       // { questionId: 'A' | 'B' | ... }
    submitted: false,
    score: 0,
    loading: false,
    error: null,
    mode: 'home',          // 'home' | 'practice' | 'result'
    examSize: 20,
    filterMode: 'all',     // 'all' | 'wrong' | 'random'
    wrongQuestions: [],
    searchQuery: '',
    currentPage: 1,
    questionsPerPage: 10,
  },
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setExamSize: (state, action) => {
      state.examSize = action.payload;
    },
    setFilterMode: (state, action) => {
      state.filterMode = action.payload;
    },
    startExam: (state, action) => {
      const { size, filterMode } = action.payload;
      state.filterMode = filterMode;
      state.userAnswers = {};
      state.submitted = false;
      state.score = 0;
      state.currentIndex = 0;
      state.mode = 'practice';

      let pool = [...state.allQuestions];

      if (filterMode === 'wrong' && state.wrongQuestions.length > 0) {
        pool = state.allQuestions.filter(q => state.wrongQuestions.includes(q.id));
      } else if (filterMode === 'true_false') {
        pool = state.allQuestions.filter(q => 
          q.options.some(opt => {
            const cleanOpt = opt.toLowerCase().replace(/[^a-z]/g, '');
            return ['true', 'false', 'yes', 'no'].includes(cleanOpt);
          })
        );
      }

      // shuffle
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }

      state.questions = size === 0 ? pool : pool.slice(0, size);
    },
    answerQuestion: (state, action) => {
      const { questionId, answer } = action.payload;
      state.userAnswers[questionId] = answer;
    },
    nextQuestion: (state) => {
      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex += 1;
      }
    },
    prevQuestion: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
      }
    },
    jumpToQuestion: (state, action) => {
      state.currentIndex = action.payload;
    },
    submitExam: (state) => {
      state.submitted = true;
      let correct = 0;
      const wrong = [];

      state.questions.forEach(q => {
        const userAns = state.userAnswers[q.id];
        const correctLetter = q.answer.toUpperCase();
        if (userAns && userAns.toUpperCase() === correctLetter) {
          correct++;
        } else {
          wrong.push(q.id);
        }
      });

      state.score = correct;
      // merge wrong questions into persistent list
      const combined = [...new Set([...state.wrongQuestions, ...wrong])];
      // remove from wrong list if answered correctly this time
      const stillWrong = combined.filter(id => {
        const q = state.allQuestions.find(q => q.id === id);
        if (!q) return false;
        const userAns = state.userAnswers[id];
        if (!userAns) return true;
        return userAns.toUpperCase() !== q.answer.toUpperCase();
      });
      state.wrongQuestions = stillWrong;
      state.mode = 'result';
    },
    resetExam: (state) => {
      state.mode = 'home';
      state.questions = [];
      state.currentIndex = 0;
      state.userAnswers = {};
      state.submitted = false;
      state.score = 0;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearWrongQuestions: (state) => {
      state.wrongQuestions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.allQuestions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setMode,
  setExamSize,
  setFilterMode,
  startExam,
  answerQuestion,
  nextQuestion,
  prevQuestion,
  jumpToQuestion,
  submitExam,
  resetExam,
  setSearchQuery,
  setCurrentPage,
  clearWrongQuestions,
} = examSlice.actions;

export default examSlice.reducer;
