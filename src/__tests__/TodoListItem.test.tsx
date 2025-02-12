import { render } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

import TodoListItem from "../components/TodoListItem";

describe("Test completed Todo.", () => {
    test("Checkbox is displayed and checked.", async () => {

        const todoMock = {
            "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
            "title": "Complete project report",
            "completed": true
        }
    
        const deleteTodoStateMock = jest.fn();
        const updateTodoStateMock = jest.fn();
    
        const result = render(
            <MemoryRouter>
                <TodoListItem
                    todo={todoMock}
                    updateTodoState={updateTodoStateMock}
                    deleteTodoState={deleteTodoStateMock}
                />
            </MemoryRouter>
        );
    
        // result.debug();
    
        const checkboxInput = result.getByRole("checkbox", { checked: true });
    
        expect(checkboxInput).toBeChecked();
    
    });

});

describe("Test not completed Todo.", () => {
    test("Checkbox is displayed and unchecked.", async () => {

        const todoMock = {
            "id": "6418eab2-161d-4c78-8d68-0c9176ce642c",
            "title": "Respond to client emails",
            "completed": false
        }
    
        const deleteTodoStateMock = jest.fn();
        const updateTodoStateMock = jest.fn();
    
        const result = render(
            <MemoryRouter>
                <TodoListItem
                    todo={todoMock}
                    updateTodoState={updateTodoStateMock}
                    deleteTodoState={deleteTodoStateMock}
                />
            </MemoryRouter>
        );
    
        // result.debug();
    
        const checkboxInput = result.getByRole("checkbox", { checked: false });
    
        expect(checkboxInput).not.toBeChecked();
    
    });

});

test("Title, links, and button are displayed.", async () => {

    const todoMock = {
        "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
        "title": "Complete project report",
        "completed": true
    }

    const deleteTodoStateMock = jest.fn();
    const updateTodoStateMock = jest.fn();

    const result = render(
        <MemoryRouter>
            <TodoListItem
                todo={todoMock}
                updateTodoState={updateTodoStateMock}
                deleteTodoState={deleteTodoStateMock}
            />
        </MemoryRouter>
    );

    // result.debug();

    const todoTitle = result.getByRole("heading", { level: 2 });

    const editLink = result.getByRole("link");
    const editIcon = result.getByTestId("EditIcon");

    const deleteBtn = result.getByRole("button");
    const deleteIcon = result.getByTestId("DeleteIcon");

    expect(todoTitle).toHaveTextContent("Complete project report");

    expect(editLink).toHaveAttribute("href", "/edit/2e70d95c-11b4-494b-ad69-026acc309a08");
    expect(editIcon).toBeInTheDocument();

    expect(deleteBtn).not.toBeDisabled();
    expect(deleteIcon).toBeInTheDocument();

});

test("Modal is not displayed.", async () => {

    const todoMock = {
        "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
        "title": "Complete project report",
        "completed": true
    }

    const deleteTodoStateMock = jest.fn();
    const updateTodoStateMock = jest.fn();

    const result = render(
        <MemoryRouter>
            <TodoListItem
                todo={todoMock}
                updateTodoState={updateTodoStateMock}
                deleteTodoState={deleteTodoStateMock}
            />
        </MemoryRouter>
    );

    // result.debug();

    const modal = result.queryByRole("presentation");

    expect(modal).toBeNull();

});
