import React, { useEffect } from 'react';
import { fetchTasks, selectTasks } from './tasksSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import TaskListPage from './components/TaskListPage';
import Loading from '@/app/components/Loading';
import { Route, Routes } from 'react-router';
import TaskDetailPage from './components/TaskDetailPage';


export default function Tasks() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.tasks);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const router = <Routes>
    <Route path='/' Component={TaskListPage} />
    <Route path='/:id' Component={TaskDetailPage} />
  </Routes>
  return (
    <div>
      {loading == "pending" && <Loading />}
      {loading == "failed" && <div className="error">{error}</div>}
      {loading == "succeeded" && router}
    </div>
  );
}
