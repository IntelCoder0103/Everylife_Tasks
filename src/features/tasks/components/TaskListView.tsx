import * as React from 'react';
import TaskItem from './TaskItem';

export interface ITaskListViewProps {
  tasks: Task[];
}

export default function TaskListView(props: ITaskListViewProps) {
  const { tasks } = props;
  return (
    <>
      {
        tasks.length === 0 && <div className='text-gray-400 my-8'>No Items</div>
      }
      {tasks.map((task, index) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </>
  );
}
