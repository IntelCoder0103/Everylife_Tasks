import { useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { useLocation } from "react-router";

export default function useTasksSearch(searchStr: string) {
  const { tasks } = useAppSelector((state) => state.tasks);
  
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => task.name.includes(searchStr) || task.description.includes(searchStr));
  }, [tasks, searchStr]);

  return filteredTasks;
}