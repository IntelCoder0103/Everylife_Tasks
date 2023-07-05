import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TaskListGroupItem from "./TaskListGroupItem";
import TaskListGroupView from "./TaskListGroupView";
import { BrowserRouter } from "react-router-dom";

// Mock the dependencies and custom hooks
describe("TaskListGroupView", () => {
  beforeEach(() => {
    // Reset the mocks before each test
    jest.clearAllMocks();
  });

  test("renders Tasks group by type", async () => {
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
        name: "TaskC",
        description: "DescC",
        type: "hydration",
      },
    ];
    const { getByText } = render(
      <BrowserRouter>
        <TaskListGroupView tasks={mockTasks} />
      </BrowserRouter>
    );

    const generalGroup = getByText("GENERAL");
    const hydrationGroup = getByText("HYDRATION");
    expect(generalGroup).toBeInTheDocument();
    expect(hydrationGroup).toBeInTheDocument();

    fireEvent.click(generalGroup);
    expect(getByText("TaskA")).toBeInTheDocument();
    expect(getByText("TaskB")).toBeInTheDocument();

    expect(getByText("DescA")).toBeInTheDocument();
    expect(getByText("DescB")).toBeInTheDocument();

    fireEvent.click(hydrationGroup);
    expect(getByText("TaskC")).toBeInTheDocument();
    expect(getByText("DescC")).toBeInTheDocument();
  });

  test("renders No Items when there is no task", async () => {
    const { getByText } = render(
      <BrowserRouter>
        <TaskListGroupView tasks={[]} />
      </BrowserRouter>
    );
    expect(getByText(/No Items/)).toBeInTheDocument();
  });
});
