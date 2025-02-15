import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import TodoList, { TodoListDataType } from "../components/TodoList";

describe("Test TodoList", () => {
    test("Todolist data renders.", async () => {

        const dataMock = [
            {
              "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
              "title": "Complete project report",
              "completed": true
            },
            {
              "id": "63980a8e-5538-4e70-a9bd-c16e6a947129",
              "title": "Buy groceries",
              "completed": true
            },
            {
              "id": "6418eab2-161d-4c78-8d68-0c9176ce642c",
              "title": "Respond to client emails",
              "completed": false
            },
            {
              "id": "3bb4944c-d5d0-4f93-a8c5-93b513bd90cc",
              "title": "Schedule doctor's appointment",
              "completed": false
            }
        ];
    
        const deleteTodoStateMock = jest.fn();
        const updateTodoStateMock = jest.fn();
    
        render(
            <MemoryRouter>
                <TodoList
                    data={dataMock}
                    updateTodoState={updateTodoStateMock}
                    deleteTodoState={deleteTodoStateMock}
                />
            </MemoryRouter>
        );

        const list = screen.getAllByRole("listitem");
    
        expect(list).toHaveLength(dataMock.length);
    
    });

    test("Shows no results when no data is present.", async () => {

        const dataMock: TodoListDataType = [];
    
        const deleteTodoStateMock = jest.fn();
        const updateTodoStateMock = jest.fn();
    
        render(
            <MemoryRouter>
                <TodoList
                    data={dataMock}
                    updateTodoState={updateTodoStateMock}
                    deleteTodoState={deleteTodoStateMock}
                />
            </MemoryRouter>
        );

        const heading = screen.getByRole("heading", { level: 2 });

        expect(heading).toBeInTheDocument();
    
    });

});