import { configureStore } from '@reduxjs/toolkit';
import examReducer from './slices/examSlice';

export const store = configureStore({
  reducer: {
    exam: examReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
