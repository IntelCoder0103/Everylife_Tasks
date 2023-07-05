import { useMemo } from "react";
import { useAppSelector } from "@/app/hooks";

/**
 * @param searchStr the search string used for filtering
 * @returns the filtered tasks from all tasks
 */
export default function useTasksSearch(searchStr: string) {
  const { tasks } = useAppSelector((state) => state.tasks);
  
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => task.name.includes(searchStr) || task.description.includes(searchStr));
  }, [tasks, searchStr]);

  return filteredTasks;
}