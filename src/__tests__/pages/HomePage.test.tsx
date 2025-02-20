import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import HomePage from "../../pages/HomePage";

test("Shows the page title.", () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
            <HomePage />
        </MemoryRouter>
    );

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toHaveTextContent("My Todos");

});