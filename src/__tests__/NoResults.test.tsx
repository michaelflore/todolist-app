import { render, screen } from "@testing-library/react";
import NoResults from "../components/NoResults";

test("Contains text No Results.", () => {
    render(<NoResults />);

    const heading = screen.getByRole("heading", { level: 2, name: /^No Results$/ });

    expect(heading).toHaveTextContent(/^No Results$/);
});
