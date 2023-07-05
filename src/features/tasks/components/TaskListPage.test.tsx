import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TaskListPage from "./TaskListPage";
import useTasksSearch from "./useTasksSearch";
import useSearch from "./useSearch";
import { useLocation, useNavigate } from "react-router";

// Mock the dependencies and custom hooks
jest.mock("react-router");
jest.mock("./useTasksSearch");

describe("TaskListPage", () => {
  beforeEach(() => {
    // Reset the mocks before each test
    jest.clearAllMocks();
    (useLocation as jest.Mock).mockReturnValue({
      search: "",
    });
    // Mock the useTasksSearch hook to return an empty array
    (useTasksSearch as jest.Mock).mockReturnValue([]);
  });

  test("renders the search input and switch", () => {
    const { getByLabelText, getByPlaceholderText } = render(<TaskListPage />);

    // Ensure the search input and switch are rendered
    expect(getByPlaceholderText("Search")).toBeInTheDocument();
    expect(getByLabelText("Group")).toBeInTheDocument();
  });

  test("navigates to the correct URL when searching", () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    const { getByPlaceholderText } = render(<TaskListPage />);
    const searchInput = getByPlaceholderText("Search");

    // Type a search term in the input field
    fireEvent.change(searchInput, { target: { value: "example" } });
    fireEvent.keyDown(searchInput, { key: 'Enter', keyCode: 37 });

    // Ensure that the navigate function is called with the correct URL
    expect(mockNavigate).toHaveBeenCalledWith("/?search=example");
  });

  test("renders TaskListGroupView when group is enabled", () => {

    const { getByLabelText, queryByTestId } = render(<TaskListPage />);
    const groupSwitch = getByLabelText("Group");

    // Enable the group switch
    fireEvent.click(groupSwitch);

    // Ensure that TaskListGroupView is rendered and TaskListView is not
    expect(queryByTestId("task-list-group-view")).toBeInTheDocument();
    expect(queryByTestId("task-list-view")).not.toBeInTheDocument();
  });

  test("renders TaskListView when group is disabled", () => {
    // Mock the useTasksSearch hook to return an empty array
    (useTasksSearch as jest.Mock).mockReturnValue([]);

    const { getByLabelText, queryByTestId } = render(<TaskListPage />);
    const groupSwitch = getByLabelText("Group");

    // Disable the group switch
    fireEvent.click(groupSwitch);
    fireEvent.click(groupSwitch);

    // Ensure that TaskListView is rendered and TaskListGroupView is not
    expect(queryByTestId("task-list-view")).toBeInTheDocument();
    expect(queryByTestId("task-list-group-view")).not.toBeInTheDocument();
  });
});
