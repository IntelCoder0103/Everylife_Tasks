import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchTasks } from "./tasksSlice";
import Tasks from ".";

// Mock the dependencies and custom hooks
jest.mock("@/app/hooks");
jest.mock("./tasksSlice");

describe("Task/index", () => {
  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
    (useAppSelector as jest.Mock).mockReturnValue({ loading: "idle" });
  });
  test("dispatch fetchTasks action when loaded", async () => {
    const mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    const mockAction = "mockAction";
    (fetchTasks as unknown as jest.Mock).mockReturnValue(mockAction);

    render(<Tasks />);

    expect(mockDispatch).toHaveBeenCalledWith(mockAction);
  });

  test("renders loading when the data is not loaded", async () => {
    (useAppSelector as jest.Mock).mockReturnValue({ loading: "pending" });
    const { queryByTestId } = render(<Tasks />);
    expect(queryByTestId("loading")).toBeInTheDocument();
  });
  test("renders error message when loading failed", async () => {
    (useAppSelector as jest.Mock).mockReturnValue({ loading: "failed", error: "fetch failed" });
    const { getByText } = render(<Tasks />);
    expect(getByText(/fetch failed/)).toBeInTheDocument();
  });
});
