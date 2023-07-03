import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import { tasksApi } from "./tasksApi";

interface TasksState{
  tasks: Task[];
  currentTask?: Task;
  error?: string;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: TasksState = {
  tasks: [],
  loading: "idle",
};

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async () => { return tasksApi.fetchAll(); });

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    getById: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.currentTask = state.tasks.find(task => task.id === id);
    },
    update: (state, action: PayloadAction<Task>) => {
      const value = action.payload;
      state.tasks = state.tasks.map(t => t.id === value.id ? value : t);
    },
    remove: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((t) => (t.id !== id));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(fetchTasks.pending, (state) => { state.loading = "pending"; });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message;
    });
  }
});

export const { update, remove, getById } = tasksSlice.actions;
export const selectTasks = (state: TasksState) => state.tasks;

export default tasksSlice.reducer;