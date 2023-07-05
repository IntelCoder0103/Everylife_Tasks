const BASE_URL = 'https://adam-deleteme.s3.amazonaws.com/tasks.json';

/**
 * Fetch all the tasks from the URL
 * @returns fetched Tasks
 */
const fetchAll = async (): Promise<Task[]> => {
  const resp = await fetch(BASE_URL);
  const data = await resp.json();
  return data;
}

export const tasksApi = {
  fetchAll,
};