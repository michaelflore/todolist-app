import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router";

import AppLayout from "../layout/AppLayout";
import NoTodos from "../components/NoTodos";
import AddTodoPage from "../pages/AddTodoPage";

test("Contains messages.", async () => {

    const result = render(
        <MemoryRouter>
            <NoTodos />
        </MemoryRouter>
    );

    // result.debug();

    const paragraphs = result.getAllByRole("paragraph");

    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0]).toHaveTextContent(/^You do not have any todos yet\.$/);
    expect(paragraphs[1]).toHaveTextContent(/^Add some to get started!$/);

});

test("Contains icon and link.", () => {

    const result = render(
        <MemoryRouter>
            <NoTodos />
        </MemoryRouter>
    );

    // result.debug();

    const addIcon = result.getByTestId("AddIcon");

    const addLink = result.getByRole("link", { name: /^Add Todo$/ });

    expect(addIcon).toBeInTheDocument();
    expect(addLink).toHaveAttribute("href", "/add");

});

test("Changes path when clicking on link.", async () => {

    const user = userEvent.setup();

    const result = render(
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<NoTodos />} />
                    <Route path="/add" element={<AddTodoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

    // result.debug();

    const addLink = result.getByRole("link", { name: /^Add Todo$/ });

    expect(addLink).toHaveAttribute("href", "/add");

    await user.click(addLink);

    result.debug();

    const addTodoTitle = result.getByRole("heading", { level: 1, name: /^Add Todo$/ }) 

    expect(window.location.pathname).toBe("/add");
    expect(addTodoTitle).toBeInTheDocument();

});
