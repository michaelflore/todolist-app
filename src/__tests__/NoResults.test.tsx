import { render } from "@testing-library/react";
import NoResults from "../components/NoResults";

test("Contains text No Results.", () => {
    const screen = render(<NoResults />);

    // screen.debug();

    const heading = screen.getByRole("heading", { level: 2, name: /^No Results$/ });

    expect(heading).toHaveTextContent(/^No Results$/);
});
