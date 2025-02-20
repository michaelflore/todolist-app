import { render, screen } from "@testing-library/react";
import NavBar from "../layout/Navbar";

test("Shows title in navbar.", () => {
    render(
        <NavBar />
    );

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toHaveTextContent("To-do List");
    
});