import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router";
import { http, HttpResponse, delay } from "msw";
import { server } from "../../__mocks__/mock-server-node";

import AddTodoPage from "../../pages/AddTodoPage";

test("Go back button to previous page in history.", async () => {
    const user = userEvent.setup();

    render(
        <MemoryRouter initialEntries={["/", "/add"]} initialIndex={1}>
            <Routes>
                <Route path="/add" element={<AddTodoPage />} />
                <Route path="/" element={<div><h1>Home</h1></div>} />
            </Routes>
        </MemoryRouter>
    );

    const backBtn = screen.getByLabelText("Go back");

    await user.click(backBtn);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

});

test("Title on change.", async () => {
    const user = userEvent.setup();

    render(
        <MemoryRouter>
            <AddTodoPage />
        </MemoryRouter>
    );

    const titleInput = screen.getByLabelText("Title");

    await user.type(titleInput, "Buy a new laptop.");

    expect(screen.getByDisplayValue("Buy a new laptop.")).toBeInTheDocument();

});

test("Checkbox on change.", async () => {
    const user = userEvent.setup();

    render(
        <MemoryRouter>
            <AddTodoPage />
        </MemoryRouter>
    );

    const checkboxInput = screen.getByRole("checkbox", { checked: false });

    await user.click(checkboxInput);

    expect(screen.getByRole("checkbox", { checked: true })).toBeInTheDocument();

});

test("Submit a todo with less than 5 characters.", async () => {
    const user = userEvent.setup();

    render(
        <MemoryRouter>
            <AddTodoPage />
        </MemoryRouter>
    );

    const titleInput = screen.getByLabelText("Title");

    await user.type(titleInput, "less");

    const inputSubmit = screen.getByDisplayValue("Add");

    await user.click(inputSubmit);

    expect(screen.getAllByText("Title")[0]).toHaveClass("Mui-error");
    expect(screen.getByRole("paragraph")).toHaveTextContent("Must be at least 5 characters.");

});

test("Submit a valid todo. Success.", async () => {
    const user = userEvent.setup();

    render(
        <MemoryRouter initialEntries={["/add"]}>
            <Routes>
                <Route path="/add" element={<AddTodoPage />} />
                <Route path="/" element={<div><h1>Home</h1></div>} />
            </Routes>
        </MemoryRouter>
    );

    const titleInput = screen.getByLabelText("Title");

    await user.type(titleInput, "Buy a car");

    await user.click(screen.getByDisplayValue("Add"));

    const loadingBtn = await screen.findByDisplayValue("Loading...");
    expect(loadingBtn).toBeDisabled();

    const fieldsetDisabled = screen.getByRole("group");
    expect(fieldsetDisabled).toBeDisabled();

    //need 2 waitFor since it goes too fast
    await waitFor(() => {
        const input = screen.getByDisplayValue("");
        expect(input).toBeInTheDocument();

        const addBtn = screen.getByDisplayValue("Add");
        const fieldset = screen.getByRole("group");

        expect(fieldset).not.toBeDisabled();
        expect(addBtn).not.toBeDisabled();
    });

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

});

test("Submit a valid todo. Failure api is down or not found. Close the alert.", async () => {
    server.use(
        http.post("/api/todolist", async () => {
            await delay();
            
            return HttpResponse.error();
        })
    );

    const user = userEvent.setup();

    render(
        <MemoryRouter>
            <AddTodoPage />
        </MemoryRouter>
    );

    const titleInput = screen.getByLabelText("Title");

    await user.type(titleInput, "Buy a car");

    await user.click(screen.getByDisplayValue("Add"));

    const loadingBtn = screen.getByDisplayValue("Loading...");
    expect(loadingBtn).toBeDisabled();

    const fieldsetDisabled = screen.getByRole("group");
    expect(fieldsetDisabled).toBeDisabled();

    await waitFor(() => {

        const addBtn = screen.getByDisplayValue("Add");
        expect(addBtn).not.toBeDisabled();

        const fieldset = screen.getByRole("group");
        expect(fieldset).not.toBeDisabled();

        const input = screen.getByDisplayValue("Buy a car");
        expect(input).toBeInTheDocument();

    });

    const alert = screen.getByRole("alert");
    const alertText = screen.getByText("Something went wrong. Please try again later.");

    expect(alert).toBeInTheDocument();
    expect(alertText).toBeInTheDocument();

    const alertClose = screen.getByLabelText(/Close/);

    expect(alertClose).toBeInTheDocument();

    await user.click(alertClose);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});
