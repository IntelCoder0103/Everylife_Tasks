import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type TasksResponse = Task[];

export const tasksApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://adam-deleteme.s3.amazonaws.com/tasks.json",
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<TasksResponse, void>({query: () => ''})
  }),

});
export const { useGetTasksQuery } = tasksApi;