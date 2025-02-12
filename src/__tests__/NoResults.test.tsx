import { render } from "@testing-library/react";
import NoResults from "../components/NoResults";

test("Contains text No Results.", () => {
    const result = render(<NoResults />);

    // result.debug();

    const heading = result.getByRole("heading", { level: 2, name: /^No Results$/ });

    expect(heading).toHaveTextContent(/^No Results$/);
});
