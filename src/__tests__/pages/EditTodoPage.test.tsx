import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router";
import { http, HttpResponse, delay } from "msw";
import { server } from "../../__mocks__/mock-server";

import EditTodoPage from "../../pages/EditTodoPage";

interface EditTodoPageBodyProps {
    todo: { title: string, completed: boolean }
    todoError: string
}

jest.mock("../../components/EditTodoPageBody", () => {

    const EditTodoPageBody = ({ todo, todoError }: EditTodoPageBodyProps) => {
        return (
            <div>
                {
                    todoError ? (
                        <div role="alert">{todoError}</div>
                    ) : (
                        <h1>{todo.title}</h1>
                    )
                }
            </div>
        )
    }

    return EditTodoPageBody;
});

test("Go back button", async () => {
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

    const backBtn = screen.getByLabelText("go back");

    await user.click(backBtn);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

});

test("Component calls api and its successful.", async () => {

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

        const heading = screen.getByRole("heading", { name: "Complete project report" });
        expect(heading).toBeInTheDocument();
    });

});

test("Component calls api and its an error.", async () => {

    render(
        <MemoryRouter initialEntries={["/", "/edit/random-id"]} initialIndex={1}>
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

    //error
    await waitFor(() => {
        const skeleton = screen.queryByLabelText("Loading todo information");
        expect(skeleton).not.toBeInTheDocument();

        const alert = screen.getByRole("alert");
        expect(alert).toHaveTextContent("Item not found.");
    });

});

test("Component calls api and service is down or not found.", async () => {

    server.use(
        http.get("/api/todolist/:todoId", async () => {
            await delay();
            
            return HttpResponse.error();
        })
    );

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

    //error
    await waitFor(() => {
        const skeleton = screen.queryByLabelText("Loading todo information");
        expect(skeleton).not.toBeInTheDocument();

        const alert = screen.getByRole("alert");
        expect(alert).toHaveTextContent("Something went wrong. Please try again later.");
    });

});
