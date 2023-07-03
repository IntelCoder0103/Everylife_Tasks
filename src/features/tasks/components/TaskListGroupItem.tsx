import * as React from "react";
import TaskListView from "./TaskListView";

export interface ITaskListGroupItemProps {
  groupName: string;
  tasks: Task[];
}

export default function TaskListGroupItem(props: ITaskListGroupItemProps) {
  const { groupName: name, tasks } = props;
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen((open) => !open);
  return (
    <div className="group-item">
      <div className="group-item__header" onClick={toggle}>
        <img src={`icons/${name}.png`} />
        <div className="font-bold">{name.toUpperCase()}</div>
        <span className="badge group-item__count bg-blue-500 text-white">{tasks.length}</span>
      </div>
      {open && (
        <div className="px-8 py-2">
          <TaskListView tasks={tasks} />
        </div>
      )}
    </div>
  );
}
