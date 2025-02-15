import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Header from "../components/Header";

test("Renders the images.", () => {

    render(<Header />);

    const viteImg = screen.getByAltText("Vite logo");
    const reactImg = screen.getByAltText("React logo");

    expect(viteImg).toBeInTheDocument();
    expect(reactImg).toBeInTheDocument();

});

test("Clicking on links.", async () => {

    const user = userEvent.setup();
    
    render(<Header />);

    const links = screen.getAllByRole("link");

    await user.click(links[0]);
    
    expect(links[0]).toHaveAttribute("href", "https://vite.dev");

    await user.click(links[1]);
    
    expect(links[1]).toHaveAttribute("href", "https://react.dev");

});
