import { render, waitForElementToBeRemoved, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { http, HttpResponse, delay } from "msw";
import { server } from "../__mocks__/mock-server-node";

import TodoListItem from "../components/TodoListItem";

// Does not take into account scenario when todo prop updates

describe("Test completed Todo.", () => {
   
    test("Checkbox is displayed and checked.", async () => {

        const todoMock = {
            "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
            "title": "Complete project report",
            "completed": true
        }
    
        const deleteTodoStateMock = jest.fn();
        const updateTodoStateMock = jest.fn();
    
        render(
            <MemoryRouter>
                <TodoListItem
                    todo={todoMock}
                    updateTodoState={updateTodoStateMock}
                    deleteTodoState={deleteTodoStateMock}
                />
            </MemoryRouter>
        );
    
        const checkboxInput = screen.getByRole("checkbox", { checked: true });
    
        expect(checkboxInput).toBeChecked();
    
    });

    test("Checkbox api succeeds. Loader shows and disappears.", async () => {
        const user = userEvent.setup();
        
        const todoMock = {
            "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
            "title": "Complete project report",
            "completed": true
        }
    
        const deleteTodoStateMock = jest.fn();
        const updateTodoStateMock = jest.fn();
    
        render(
            <MemoryRouter>
                <TodoListItem
                    todo={todoMock}
                    updateTodoState={updateTodoStateMock}
                    deleteTodoState={deleteTodoStateMock}
                />
            </MemoryRouter>
        );
    
        const checkboxInput = screen.getByRole("checkbox", { checked: true });
    
        expect(checkboxInput).toBeChecked();

        await user.click(checkboxInput);
        
        const circularProgress = screen.getByRole("progressbar");
        expect(circularProgress).toBeInTheDocument();

        const span = screen.getByRole("presentation");
        expect(span).toBeInTheDocument();
        
        const deleteBtn = screen.getByRole("button");
        expect(deleteBtn).toBeDisabled();
        
        await waitForElementToBeRemoved(() => {
            //element has to exist at some point
            return screen.getByRole("progressbar");
        });

        const editLink = screen.getByRole("link");
        expect(editLink).toHaveAttribute("href", "/edit/2e70d95c-11b4-494b-ad69-026acc309a08");

        expect(deleteBtn).not.toBeDisabled();
    
        expect(updateTodoStateMock).toHaveBeenCalledWith(
            {
                "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
                "title": "Complete project report",
                "completed": false
            }
        );
    
    });

    test("Checbox api fails. Shows item error. Close error.", async () => {

        const user = userEvent.setup();
        
        const todoMock = {
            "id": "outdatedid",
            "title": "Complete project report",
            "completed": true
        }
    
        const deleteTodoStateMock = jest.fn();
        const updateTodoStateMock = jest.fn();
    
        render(
            <MemoryRouter>
                <TodoListItem
                    todo={todoMock}
                    updateTodoState={updateTodoStateMock}
                    deleteTodoState={deleteTodoStateMock}
                />
            </MemoryRouter>
        );
    
        const checkboxInput = screen.getByRole("checkbox", { checked: true });
    
        expect(checkboxInput).toBeChecked();

        await user.click(checkboxInput);
        
        const circularProgress = screen.getByRole("progressbar");
        expect(circularProgress).toBeInTheDocument();

        const deleteBtn = screen.getByRole("button");
        const span = screen.getByRole("presentation");
        
        expect(span).toBeInTheDocument();
        expect(deleteBtn).toBeDisabled();
        
        await waitForElementToBeRemoved(() => {
            //element has to exist at some point
            return screen.getByRole("progressbar");
        });

        const alert = screen.getByRole("alert");
        const alertText = screen.getByText("Item not found.");

        expect(alert).toBeInTheDocument();
        expect(alertText).toBeInTheDocument();

        const editLink = screen.getByRole("link");
        expect(editLink).toHaveAttribute("href", "/edit/outdatedid");

        expect(deleteBtn).not.toBeDisabled();

        const alertClose = screen.getByLabelText(/Close item alert/);

        await user.click(alertClose);

        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    
    });

    test("Checbox api fails when server url is down or not found. Shows item error. Close error.", async () => {
        server.use(
            http.patch("/api/todolist/:todoId", async () => {
                await delay();
                
                return HttpResponse.error();
            })
        );

        const user = userEvent.setup();
        
        const todoMock = {
            "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
            "title": "Complete project report",
            "completed": true
        }
    
        const deleteTodoStateMock = jest.fn();
        const updateTodoStateMock = jest.fn();
    
        render(
            <MemoryRouter>
                <TodoListItem
                    todo={todoMock}
                    updateTodoState={updateTodoStateMock}
                    deleteTodoState={deleteTodoStateMock}
                />
            </MemoryRouter>
        );
    
        const checkboxInput = screen.getByRole("checkbox", { checked: true });
    
        expect(checkboxInput).toBeChecked();

        await user.click(checkboxInput);
        
        const circularProgress = screen.getByRole("progressbar");
        expect(circularProgress).toBeInTheDocument();

        const deleteBtn = screen.getByRole("button");
        const span = screen.getByRole("presentation");
        
        expect(span).toBeInTheDocument();
        expect(deleteBtn).toBeDisabled();
        
        await waitForElementToBeRemoved(() => {
            //element has to exist at some point
            return screen.getByRole("progressbar");
        });

        const alert = screen.getByRole("alert");
        const alertText = screen.getByText("Something went wrong. Please try again later.");

        expect(alert).toBeInTheDocument();
        expect(alertText).toBeInTheDocument();

        const editLink = screen.getByRole("link");
        expect(editLink).toHaveAttribute("href", "/edit/2e70d95c-11b4-494b-ad69-026acc309a08");

        expect(deleteBtn).not.toBeDisabled();

        const alertClose = screen.getByLabelText(/Close item alert/);

        expect(alertClose).toBeInTheDocument();

        await user.click(alertClose);

        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    
    });

    test("Show confirm delete modal. Close out modal.", async () => {
        const user = userEvent.setup();
        
        const todoMock = {
            "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
            "title": "Complete project report",
            "completed": true
        }
    
        const deleteTodoStateMock = jest.fn();
        const updateTodoStateMock = jest.fn();
    
        render(
            <MemoryRouter>
                <TodoListItem
                    todo={todoMock}
                    updateTodoState={updateTodoStateMock}
                    deleteTodoState={deleteTodoStateMock}
                />
            </MemoryRouter>
        );

        const deleteBtn = screen.getByRole("button");

        await user.click(deleteBtn);

        const modal = screen.getByRole("presentation");

        expect(modal).toBeInTheDocument();

        const closeModalXBtn = screen.getByLabelText(/close modal/);

        await user.click(closeModalXBtn);

        expect(screen.queryByRole("presentation")).not.toBeInTheDocument();

    });

    test("Show confirm delete modal. Confirm delete todo api succeeds.", async () => {
        const user = userEvent.setup();
        
        const todoMock = {
            "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
            "title": "Complete project report",
            "completed": true
        }
    
        const deleteTodoStateMock = jest.fn();
        const updateTodoStateMock = jest.fn();
    
        render(
            <MemoryRouter>
                <TodoListItem
                    todo={todoMock}
                    updateTodoState={updateTodoStateMock}
                    deleteTodoState={deleteTodoStateMock}
                />
            </MemoryRouter>
        );

        const deleteBtn = screen.getByRole("button");

        await user.click(deleteBtn);

        const modal = screen.getByRole("presentation");

        expect(modal).toBeInTheDocument();

        const confirmBtn = screen.getByRole("button", { name: "Yes" });

        await user.click(confirmBtn);

        expect(screen.queryByRole("presentation")).not.toBeInTheDocument();

        const circularProgress = screen.getByRole("progressbar");
        expect(circularProgress).toBeInTheDocument();

        const checkboxInput = screen.getByRole("checkbox", { checked: true });
        expect(checkboxInput).toBeDisabled();

        await waitForElementToBeRemoved(() => {
            //element has to exist at some point
            return screen.getByRole("progressbar");
        });

        expect(checkboxInput).not.toBeDisabled();

        expect(deleteTodoStateMock).toHaveBeenCalledWith(
            {
                "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
                "title": "Complete project report",
                "completed": true
            }
        );

    });

    test("Show confirm delete modal. Confirm delete todo api fails.", async () => {
        server.use(
            http.delete("/api/todolist/:todoId", async () => {
                await delay();
                
                return HttpResponse.json({ error: true, message: "Item not found." }, { status: 404 });
            })
        );

        const user = userEvent.setup();
        
        const todoMock = {
            "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
            "title": "Complete project report",
            "completed": true
        }
    
        const deleteTodoStateMock = jest.fn();
        const updateTodoStateMock = jest.fn();
    
        render(
            <MemoryRouter>
                <TodoListItem
                    todo={todoMock}
                    updateTodoState={updateTodoStateMock}
                    deleteTodoState={deleteTodoStateMock}
                />
            </MemoryRouter>
        );

        const deleteBtn = screen.getByRole("button");

        await user.click(deleteBtn);

        const modal = screen.getByRole("presentation");

        expect(modal).toBeInTheDocument();

        const confirmBtn = screen.getByRole("button", { name: "Yes" });

        await user.click(confirmBtn);

        expect(screen.queryByRole("presentation")).not.toBeInTheDocument();

        const circularProgress = screen.getByRole("progressbar");
        expect(circularProgress).toBeInTheDocument();

        const checkboxInput = screen.getByRole("checkbox", { checked: true });
        expect(checkboxInput).toBeDisabled();

        await waitForElementToBeRemoved(() => {
            //element has to exist at some point
            return screen.getByRole("progressbar");
        });

        expect(checkboxInput).not.toBeDisabled();

        const alert = screen.getByRole("alert");

        expect(alert).toBeInTheDocument();

        const editLink = screen.getByRole("link");
        expect(editLink).toHaveAttribute("href", "/edit/2e70d95c-11b4-494b-ad69-026acc309a08");

        expect(deleteBtn).not.toBeDisabled();

        const alertClose = screen.getByLabelText(/Close item alert/);

        expect(alertClose).toBeInTheDocument();

        await user.click(alertClose);

        expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    });

    test("Show confirm delete modal. Confirm delete todo api fails when server url is down or not found.", async () => {
        server.use(
            http.delete("/api/todolist/:todoId", async () => {
                await delay();
                
                return HttpResponse.error();
            })
        );

        const user = userEvent.setup();
        
        const todoMock = {
            "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
            "title": "Complete project report",
            "completed": true
        }
    
        const deleteTodoStateMock = jest.fn();
        const updateTodoStateMock = jest.fn();
    
        render(
            <MemoryRouter>
                <TodoListItem
                    todo={todoMock}
                    updateTodoState={updateTodoStateMock}
                    deleteTodoState={deleteTodoStateMock}
                />
            </MemoryRouter>
        );

        const deleteBtn = screen.getByRole("button");

        await user.click(deleteBtn);

        const modal = screen.getByRole("presentation");

        expect(modal).toBeInTheDocument();

        const confirmBtn = screen.getByRole("button", { name: "Yes" });

        await user.click(confirmBtn);

        expect(screen.queryByRole("presentation")).not.toBeInTheDocument();

        const circularProgress = screen.getByRole("progressbar");
        expect(circularProgress).toBeInTheDocument();

        const checkboxInput = screen.getByRole("checkbox", { checked: true });
        expect(checkboxInput).toBeDisabled();

        await waitForElementToBeRemoved(() => {
            //element has to exist at some point
            return screen.getByRole("progressbar");
        });

        expect(checkboxInput).not.toBeDisabled();

        const alert = screen.getByRole("alert");
        const alertText = screen.getByText("Something went wrong. Please try again later.");

        expect(alert).toBeInTheDocument();
        expect(alertText).toBeInTheDocument();

        const editLink = screen.getByRole("link");
        expect(editLink).toHaveAttribute("href", "/edit/2e70d95c-11b4-494b-ad69-026acc309a08");

        expect(deleteBtn).not.toBeDisabled();

        const alertClose = screen.getByLabelText(/Close item alert/);

        expect(alertClose).toBeInTheDocument();

        await user.click(alertClose);

        expect(screen.queryByRole("alert")).not.toBeInTheDocument();

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
    
        render(
            <MemoryRouter>
                <TodoListItem
                    todo={todoMock}
                    updateTodoState={updateTodoStateMock}
                    deleteTodoState={deleteTodoStateMock}
                />
            </MemoryRouter>
        );
    
        const checkboxInput = screen.getByRole("checkbox", { checked: false });
    
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

    render(
        <MemoryRouter>
            <TodoListItem
                todo={todoMock}
                updateTodoState={updateTodoStateMock}
                deleteTodoState={deleteTodoStateMock}
            />
        </MemoryRouter>
    );

    const todoTitle = screen.getByRole("heading", { level: 2 });

    const editLink = screen.getByRole("link");
    const editIcon = screen.getByTestId("EditIcon");

    const deleteBtn = screen.getByRole("button");
    const deleteIcon = screen.getByTestId("DeleteIcon");

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

    render(
        <MemoryRouter>
            <TodoListItem
                todo={todoMock}
                updateTodoState={updateTodoStateMock}
                deleteTodoState={deleteTodoStateMock}
            />
        </MemoryRouter>
    );

    const modal = screen.queryByRole("presentation");

    expect(modal).toBeNull();

});
