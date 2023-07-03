interface Task{
  id: number;
  name: string;
  description: string;
  type: TaskType;
}

type TaskType = 'general' | 'hydration' | 'medication' | 'nutrition';