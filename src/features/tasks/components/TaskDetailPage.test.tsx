import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, useNavigate, useParams } from "react-router-dom";
import TaskDetailPage from "./TaskDetailPage";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { update, remove } from "../tasksSlice";

jest.mock('@/app/hooks');
jest.mock('react-router');
jest.mock("../tasksSlice");

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

describe("TaskDetailPage", () => {
  const mockTask: Task = {
    id: 1,
    name: 'mockName',
    description: 'mockDesc',
    type: 'nutrition'
  };
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockReturnValue({ currentTask: mockTask });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useParams as jest.Mock).mockReturnValue({ id: mockTask.id });
  })
  test("renders form fields with prefilled value", async () => {
    render(<TaskDetailPage />);

    expect((screen.getByPlaceholderText(/Name/) as HTMLInputElement).value).toBe(mockTask.name);
    expect(
      (screen.getByPlaceholderText(/Description/) as HTMLInputElement).value
    ).toBe(mockTask.description);
  });

  test("navigate to back when click back button", async () => {
    render(<TaskDetailPage />);
    const backBtn = screen.getByText(/Back/);
    fireEvent.click(backBtn);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("dispatch save action with changed data when save button is clicked", async () => {
    const mockChangedTask: Task = {
      ...mockTask,
      name: 'mockChangedName',
      description: 'mockChangedDesc'
    };

    (update as unknown as jest.Mock).mockReturnValue("mockUpdateAction");

    render(<TaskDetailPage />);
    fireEvent.change(screen.getByPlaceholderText(/Name/), { target: { value: mockChangedTask.name } });
    fireEvent.change(screen.getByPlaceholderText(/Description/), {
      target: { value: mockChangedTask.description },
    });
    const saveBtn = screen.getByText(/Save/);
    act(() => { fireEvent.click(saveBtn); });

    waitFor(() => {
      expect(update).toHaveBeenCalledWith(mockChangedTask);
      expect(mockDispatch).toHaveBeenCalledWith('mockUpdateAction');
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  
  test("dispatch delete action with id when delete button is clicked", async () => {
    
    (remove as unknown as jest.Mock).mockReturnValue("mockDeleteAction");

    render(<TaskDetailPage />);
    const deleteBtn = screen.getByText(/Delete/);

    jest.spyOn(window, "confirm").mockReturnValue(false);
    act(() => {
      fireEvent.click(deleteBtn);
    });

    waitFor(() => {
      expect(remove).not.toHaveBeenCalled();
    });


    jest.spyOn(window, 'confirm').mockReturnValue(true);
    act(() => {
      fireEvent.click(deleteBtn);
    });

    waitFor(() => {
      expect(remove).toHaveBeenCalledWith(mockTask.id);
      expect(mockDispatch).toHaveBeenCalledWith("mockDeleteAction");
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
})