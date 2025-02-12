import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router";

import AppLayout from "../layout/AppLayout";
import NoTodos from "../components/NoTodos";
import AddTodoPage from "../pages/AddTodoPage";

test("Contains messages.", async () => {

    const screen = render(
        <MemoryRouter>
            <NoTodos />
        </MemoryRouter>
    );

    // screen.debug();

    const paragraphs = screen.getAllByRole("paragraph");

    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0]).toHaveTextContent(/^You do not have any todos yet\.$/);
    expect(paragraphs[1]).toHaveTextContent(/^Add some to get started!$/);

});

test("Contains icon and link.", () => {

    const screen = render(
        <MemoryRouter>
            <NoTodos />
        </MemoryRouter>
    );

    // screen.debug();

    const addIcon = screen.getByTestId("AddIcon");

    const addLink = screen.getByRole("link", { name: /^Add Todo$/ });

    expect(addIcon).toBeInTheDocument();
    expect(addLink).toHaveAttribute("href", "/add");

});

test("Changes path when clicking on link.", async () => {

    const user = userEvent.setup();

    const screen = render(
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<NoTodos />} />
                    <Route path="/add" element={<AddTodoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

    // screen.debug();

    const addLink = screen.getByRole("link", { name: /^Add Todo$/ });

    expect(addLink).toHaveAttribute("href", "/add");

    await user.click(addLink);

    screen.debug();

    const addTodoTitle = screen.getByRole("heading", { level: 1, name: /^Add Todo$/ }) 

    expect(window.location.pathname).toBe("/add");
    expect(addTodoTitle).toBeInTheDocument();

});
