import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useNavigate, useParams } from 'react-router';
import { getById as getTaskById, update as updateTask, remove as deleteTask } from '../tasksSlice';
import TaskForm from './TaskForm';

export interface ITaskDetailPageProps {
}

export default function TaskDetailPage(props: ITaskDetailPageProps) {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {currentTask } = useAppSelector(state => state.tasks);
  const navigate = useNavigate();
  
  const onSave = (value: Task) => {
    dispatch(updateTask(value));
    navigate('/');
  };
  const onDelete = (id: number) => {
    dispatch(deleteTask(id));
    navigate("/");
  };

  useEffect(() => {
    dispatch(getTaskById(Number(id)));
  }, [id]);

  return (
    <div>
      <TaskForm task={currentTask} onSave={onSave} onDelete={onDelete} />
    </div>
  );
}
