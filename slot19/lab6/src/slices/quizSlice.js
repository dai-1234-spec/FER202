import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    questions: [], // Mảng lưu trữ câu hỏi bài kiểm tra
    userAnswers: {}, // Đối tượng lưu trữ câu trả lời của người dùng (key: questionId, value: câu trả lời)
    correctAnswers: {}, // Đối tượng lưu trữ câu trả lời đúng (key: questionId, value: câu trả lời đúng)
  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setCorrectAnswers: (state, action) => {
      state.correctAnswers = action.payload;
    },
    selectAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.userAnswers[questionId] = answer;
    },
  },
});

export const { setQuestions, setCorrectAnswers, selectAnswer } = quizSlice.actions;
export default quizSlice.reducer;