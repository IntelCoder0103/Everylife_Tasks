import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from '@/features/tasks/tasksSlice';
import { tasksApi } from "@/services/tasks";
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;