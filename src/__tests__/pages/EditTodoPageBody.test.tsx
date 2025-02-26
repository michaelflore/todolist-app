import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router";
import { http, HttpResponse, delay } from "msw";
import { server } from "../../__mocks__/mock-server-node";

import EditTodoPageBody from "../../components/EditTodoPageBody";
import EditTodoPage from "../../pages/EditTodoPage";

test("Todo error shows and is in the document.", async () => {

    const previousTodoMock = {
        title: "Complete project report",
        completed: false
    };

    const todoMock = {
        title: "Complete project report",
        completed: false
    };

    const clearFormMock = jest.fn();
    const setTodoTitleStateMock = jest.fn();
    const setTodoCompletedStateMock = jest.fn();

    render(
        <MemoryRouter>
            <EditTodoPageBody
                todoError="Something went wrong. Please try again later."
                previousTodo={previousTodoMock}
                todo={todoMock}
                clearForm={clearFormMock}
                setTodoTitleState={setTodoTitleStateMock}
                setTodoCompletedState={setTodoCompletedStateMock}
            />
        </MemoryRouter>
    );

    const alert = screen.getByRole("alert");
    const alertText = screen.getByText("Something went wrong. Please try again later.");

    expect(alert).toBeInTheDocument();
    expect(alertText).toBeInTheDocument();

});

// full test
test("Title change and checkbox change.", async () => {
    const user = userEvent.setup();

    render(
        <MemoryRouter initialEntries={["/", "/edit/2e70d95c-11b4-494b-ad69-026acc309a08"]} initialIndex={1}>
            <Routes>
                <Route
                    path="/edit/:todoId"
                    element={
                        <EditTodoPage />
                    }
                />
                <Route
                    path="/"
                    element={
                        <div>
                            <h1>Home</h1>
                        </div>
                    }
                />
            </Routes>
        </MemoryRouter>
    );

    //loading
    const skeleton = screen.getByLabelText("Loading todo information");

    expect(skeleton).toBeInTheDocument();

    //success
    await waitFor(() => {
        const skeleton = screen.queryByLabelText("Loading todo information");
        expect(skeleton).not.toBeInTheDocument();

        const titleInput = screen.getByLabelText("Title");
        expect(titleInput).toBeInTheDocument();
    });

    const titleInput = screen.getByLabelText("Title");

    //clear and change input
    await user.clear(titleInput);
    await user.type(titleInput, "Changing the title"); 

    const checkboxInput = screen.getByRole("checkbox", { checked: true });

    await user.click(checkboxInput);

    expect(screen.getByDisplayValue("Changing the title")).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { checked: false })).toBeInTheDocument();

});

test("Edit a todo but its less than 5 characters.", async () => {
    const user = userEvent.setup();

    const previousTodoMock = {
        title: "Complete project report",
        completed: false
    };

    const todoMock = {
        title: "less",
        completed: true
    };

    const clearFormMock = jest.fn();
    const setTodoTitleStateMock = jest.fn();
    const setTodoCompletedStateMock = jest.fn();

    render(
        <MemoryRouter>
            <EditTodoPageBody
                todoError=""
                previousTodo={previousTodoMock}
                todo={todoMock}
                clearForm={clearFormMock}
                setTodoTitleState={setTodoTitleStateMock}
                setTodoCompletedState={setTodoCompletedStateMock}
            />
        </MemoryRouter>
    );

    //props
    expect(screen.getByDisplayValue("less")).toBeInTheDocument();

    //props
    expect(screen.getByRole("checkbox", { checked: true })).toBeInTheDocument();

    const inputSubmit = screen.getByDisplayValue("Update");

    await user.click(inputSubmit);

    expect(screen.getAllByText("Title")[0]).toHaveClass("Mui-error");
    expect(screen.getByRole("paragraph")).toHaveTextContent("Must be at least 5 characters.");

});

// full test
test("Edit a todo successful api call.", async () => {
    const user = userEvent.setup();

    render(
        <MemoryRouter initialEntries={["/", "/edit/6418eab2-161d-4c78-8d68-0c9176ce642c"]} initialIndex={1}>
            <Routes>
                <Route
                    path="/edit/:todoId"
                    element={
                        <EditTodoPage />
                    }
                />
                <Route
                    path="/"
                    element={
                        <div>
                            <h1>Home</h1>
                        </div>
                    }
                />
            </Routes>
        </MemoryRouter>
    );

    //loading
    const skeleton = screen.getByLabelText("Loading todo information");

    expect(skeleton).toBeInTheDocument();

    //success
    await waitFor(() => {
        const skeleton = screen.queryByLabelText("Loading todo information");
        expect(skeleton).not.toBeInTheDocument();

        const titleInput = screen.getByLabelText("Title");
        expect(titleInput).toBeInTheDocument();
    });

    const titleInput = screen.getByLabelText("Title");

    //clear and change input
    await user.clear(titleInput);
    await user.type(titleInput, "Changing the title"); 

    const checkboxInput = screen.getByRole("checkbox", { checked: false });

    await user.click(checkboxInput);

    const inputSubmit = screen.getByDisplayValue("Update");

    //submit form
    await user.click(inputSubmit);

    //loading
    const loadingBtn = screen.getByDisplayValue("Loading...");

    expect(loadingBtn).toBeInTheDocument();
    expect(loadingBtn).toBeDisabled();

    expect(screen.getByRole("group")).toBeDisabled();

    //success
    await waitFor(() => {
        expect(screen.getByLabelText("Title")).toHaveValue("");
        expect(screen.getByRole("checkbox", { checked: false })).toBeInTheDocument();

        expect(screen.getByDisplayValue("Update")).toBeInTheDocument();
        expect(screen.getByRole("group")).not.toBeDisabled();
        expect(screen.getByDisplayValue("Update")).not.toBeDisabled();
    });

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

});

test("Edit a todo error api call scenario.", async () => {
    const user = userEvent.setup();

    const previousTodoMock = {
        "title": "Respond to client emails",
        "completed": false
    };

    const todoMock = {
        "title": "Clean the Garage",
        "completed": true
    };

    const clearFormMock = jest.fn();
    const setTodoTitleStateMock = jest.fn();
    const setTodoCompletedStateMock = jest.fn();

    render(
        <MemoryRouter initialEntries={["/edit/random-id"]}>
            <Routes>
                <Route
                    path="/edit/:todoId"
                    element={
                        <EditTodoPageBody
                            todoError=""
                            previousTodo={previousTodoMock}
                            todo={todoMock}
                            clearForm={clearFormMock}
                            setTodoTitleState={setTodoTitleStateMock}
                            setTodoCompletedState={setTodoCompletedStateMock}
                        />
                    }
                />
                <Route
                    path="/"
                    element={
                        <div>
                            <h1>Home</h1>
                        </div>
                    }
                />
            </Routes>
        </MemoryRouter>
    );

    //props
    expect(screen.getByDisplayValue("Clean the Garage")).toBeInTheDocument();

    //props
    expect(screen.getByRole("checkbox", { checked: true })).toBeInTheDocument();

    const inputSubmit = screen.getByDisplayValue("Update");

    await user.click(inputSubmit);

    //loading
    const loadingBtn = screen.getByDisplayValue("Loading...");

    expect(loadingBtn).toBeInTheDocument();
    expect(loadingBtn).toBeDisabled();
    expect(screen.getByRole("group")).toBeDisabled();

    //error
    await waitFor(() => {
        expect(screen.getByDisplayValue("Update")).toBeInTheDocument();
        expect(screen.getByRole("group")).not.toBeDisabled();
        expect(screen.getByDisplayValue("Update")).not.toBeDisabled();
    });

    //alert
    const alert = screen.getByRole("alert");
    const alertText = screen.getByText("Item not found.");

    expect(alert).toBeInTheDocument();
    expect(alertText).toBeInTheDocument();

    const alertClose = screen.getByLabelText(/Close/);

    expect(alertClose).toBeInTheDocument();

    await user.click(alertClose);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

});

test("Edit a todo api call is down or not found.", async () => {

    server.use(
        http.patch("/api/todolist/:todoId", async () => {
            await delay();
            
            return HttpResponse.error();
        })
    );

    const user = userEvent.setup();

    const previousTodoMock = {
        "title": "Respond to client emails",
        "completed": false
    };

    const todoMock = {
        "title": "Clean the Garage",
        "completed": true
    };

    const clearFormMock = jest.fn();
    const setTodoTitleStateMock = jest.fn();
    const setTodoCompletedStateMock = jest.fn();

    render(
        <MemoryRouter initialEntries={["/edit/6418eab2-161d-4c78-8d68-0c9176ce642c"]}>
            <Routes>
                <Route
                    path="/edit/:todoId"
                    element={
                        <EditTodoPageBody
                            todoError=""
                            previousTodo={previousTodoMock}
                            todo={todoMock}
                            clearForm={clearFormMock}
                            setTodoTitleState={setTodoTitleStateMock}
                            setTodoCompletedState={setTodoCompletedStateMock}
                        />
                    }
                />
                <Route
                    path="/"
                    element={
                        <div>
                            <h1>Home</h1>
                        </div>
                    }
                />
            </Routes>
        </MemoryRouter>
    );

    //props
    expect(screen.getByDisplayValue("Clean the Garage")).toBeInTheDocument();

    //props
    expect(screen.getByRole("checkbox", { checked: true })).toBeInTheDocument();

    const inputSubmit = screen.getByDisplayValue("Update");

    await user.click(inputSubmit);

    //loading
    const loadingBtn = screen.getByDisplayValue("Loading...");

    expect(loadingBtn).toBeInTheDocument();
    expect(loadingBtn).toBeDisabled();
    expect(screen.getByRole("group")).toBeDisabled();

    //error
    await waitFor(() => {
        expect(screen.getByDisplayValue("Update")).toBeInTheDocument();
        expect(screen.getByRole("group")).not.toBeDisabled();
        expect(screen.getByDisplayValue("Update")).not.toBeDisabled();
    });

    //alert
    const alert = screen.getByRole("alert");
    const alertText = screen.getByText("Something went wrong. Please try again later.");

    expect(alert).toBeInTheDocument();
    expect(alertText).toBeInTheDocument();

    const alertClose = screen.getByLabelText(/Close/);

    expect(alertClose).toBeInTheDocument();

    await user.click(alertClose);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

});
