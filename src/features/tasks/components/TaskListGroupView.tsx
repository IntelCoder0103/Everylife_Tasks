import { useAppSelector } from "@/app/hooks";
import * as React from "react";
import TaskItem from "./TaskItem";
import TaskListGroupItem from "./TaskListGroupItem";

export interface ITaskListGroupViewProps {
  tasks: Task[];
}
type GroupedTasks = {
  [key: string]: Task[];
};
export default function TaskListGroupView(props: ITaskListGroupViewProps) {
  const { tasks } = props;
  const groupedTask = tasks.reduce<GroupedTasks>((res, task) => {
    if (!res[task.type]) res[task.type] = [task];
    else res[task.type].push(task);
    return res;
  }, {});
  const groupNames = Object.keys(groupedTask);
  return (
    <div className="task-list-group-view" data-testid="task-list-group-view">
      {groupNames.length === 0 && (
        <div className="text-gray-400 my-8">No Items</div>
      )}
      {groupNames.map((name) => (
        <TaskListGroupItem
          key={name}
          groupName={name}
          tasks={groupedTask[name]}
        />
      ))}
    </div>
  );
}
