import React, { useEffect, useState } from "react";
import useSearch from "./useSearch";
import { useLocation, useNavigate, useNavigation } from "react-router";
import TaskListGroupView from "./TaskListGroupView";
import TaskListView from "./TaskListView";
import Switch from "@/app/components/Switch";
import useTasksSearch from "./useTasksSearch";

export default function TaskListPage() {
  
  const navigate = useNavigate();
  const searchFn = (search: string) => {
    navigate(`/?search=${search}`);
  };

  // extract search params from the query
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchStr = searchParams.get("search") ?? "";
  const { inputProps } = useSearch(searchStr, searchFn);

  const [groupEnabled, setGroupEnabled] = useState(false);

  const tasks = useTasksSearch(searchStr);


  return (
    <div className="task-list">
      <div className="flex gap-4 mb-4">
        <input
          className="task-list__search form-control"
          {...inputProps}
          placeholder="Search"
          autoFocus
        />
        <Switch
          enabled={groupEnabled}
          onChange={setGroupEnabled}
          label="Group"
        />
      </div>
      {groupEnabled ? (
        <TaskListGroupView tasks={tasks} />
      ) : (
        <TaskListView tasks={tasks}/>
      )}
    </div>
  );
}
