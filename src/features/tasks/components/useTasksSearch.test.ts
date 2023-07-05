import { renderHook } from "@testing-library/react";
import { useAppSelector } from "@/app/hooks";
import useTasksSearch from "./useTasksSearch";

jest.mock('@/app/hooks');

// Mock the dependencies and custom hooks
describe("useTaskSearch", () => {
  beforeEach(() => {
    // Reset the mocks before each test
    jest.clearAllMocks(); 

    const mockTasks: Task[] = [
      {
        id: 1,
        name: "TaskA",
        description: "DescA",
        type: "general",
      },
      {
        id: 2,
        name: "TaskB",
        description: "DescB",
        type: "general",
      },
      {
        id: 3,
        name: "C",
        description: "DescC",
        type: "hydration",
      },
    ];
    (useAppSelector as jest.Mock).mockReturnValue({ tasks: mockTasks });
  });
  test("get tasks from the redux store and return the memoized filtered results", async () => {
    const { result, rerender } = renderHook<Task[], string>((search = "" as string) => useTasksSearch(search));
    expect(result.current.length).toBe(3);
    rerender("Task");
    expect(result.current.length).toBe(2);
    rerender("TaskX");
    expect(result.current.length).toBe(0);
  });
});
