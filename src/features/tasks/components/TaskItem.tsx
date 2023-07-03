import * as React from "react";
import { Link } from "react-router-dom";

export interface ITaskItemProps {
  task: Task;
}

export default function TaskItem(props: ITaskItemProps) {
  const { task } = props;
  const { id, name, description, type } = task;
  return (
    <>
      <div className="task-item">
        <img src={`icons/${type}.png`} />
        <div>
          <Link to={`${id}`}><h3 className="task-item__name text-lg mb-1 hover:text-teal-300">{name}</h3></Link>
          <p className="task-item__desc">{description}</p>
        </div>
      </div>
    </>
  );
}
