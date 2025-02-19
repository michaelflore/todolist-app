import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { http, HttpResponse, delay } from "msw";
import { server } from "../__mocks__/mock-server";

import TodoListSection from "../components/TodoListSection";

test("Initial call succeeds and renders fetched todos. Alert message shows up.", async () => {
    const user = userEvent.setup();

    const replaceStateMock = jest.fn();
    window.history.replaceState = replaceStateMock;

    render(
        <MemoryRouter initialEntries={[{ pathname: "/", state: "Todo updated successfully." }]}>
            <TodoListSection />
        </MemoryRouter>
    );

    expect(replaceStateMock).toHaveBeenCalledWith(null, "");

    //loading
    const skeleton = screen.getByLabelText("Loading todos");

    expect(skeleton).toBeInTheDocument();

    //success
    await waitFor(() => {
        const skeleton = screen.queryByLabelText("Loading todos");
        expect(skeleton).not.toBeInTheDocument();
    });

    const list = screen.getAllByRole("listitem");

    expect(list).toHaveLength(4);

    //alert
    const alert = screen.getByRole("alert");
    const alertText = screen.getByText("Todo updated successfully.");

    expect(alert).toBeInTheDocument();
    expect(alertText).toBeInTheDocument();

    const alertClose = screen.getByLabelText(/Close/);

    expect(alertClose).toBeInTheDocument();

    await user.click(alertClose);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

});

test("Initial call succeeds and renders fetched todos.", async () => {
    render(
        <MemoryRouter>
            <TodoListSection />
        </MemoryRouter>
    );

    //loading
    const skeleton = screen.getByLabelText("Loading todos");

    expect(skeleton).toBeInTheDocument();

    //success
    await waitFor(() => {
        const skeleton = screen.queryByLabelText("Loading todos");
        expect(skeleton).not.toBeInTheDocument();
    });

    const list = screen.getAllByRole("listitem");

    expect(list).toHaveLength(4);

});

test("Initial call succeeds and renders no fetched todos.", async () => {

    server.use(
        http.get("/api/todolist", async () => {
            await delay();
            
            return HttpResponse.json(
                [],
                { status: 200 }
            )
        })
    );

    render(
        <MemoryRouter>
            <TodoListSection />
        </MemoryRouter>
    );

    //loading
    const skeleton = screen.getByLabelText("Loading todos");

    expect(skeleton).toBeInTheDocument();

    //success
    await waitFor(() => {
        const skeleton = screen.queryByLabelText("Loading todos");
        expect(skeleton).not.toBeInTheDocument();
    });

    const filterIcon = screen.queryByTestId("FilterAltIcon");
    expect(filterIcon).not.toBeInTheDocument();

    const paragraphs = screen.getAllByRole("paragraph");

    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0]).toHaveTextContent(/^You do not have any todos yet\.$/);
    expect(paragraphs[1]).toHaveTextContent(/^Add some to get started!$/);

});

test("Initial call fails and renders the alert message.", async () => {

    server.use(
        http.get("/api/todolist", async () => {
            await delay();
            
            return HttpResponse.error();
        })
    );

    render(
        <MemoryRouter>
            <TodoListSection />
        </MemoryRouter>
    );

    //loading
    const skeleton = screen.getByLabelText("Loading todos");

    expect(skeleton).toBeInTheDocument();

    //error
    await waitFor(() => {
        const skeleton = screen.queryByLabelText("Loading todos");
        expect(skeleton).not.toBeInTheDocument();
    });

    //alert
    const alert = screen.getByRole("alert");
    const alertText = screen.getByText("Something went wrong. Please try again later.");

    expect(alert).toBeInTheDocument();
    expect(alertText).toBeInTheDocument();

    const alertClose = screen.queryByLabelText(/Close/);

    expect(alertClose).not.toBeInTheDocument();

});

//full test
test("Initial call succeeds and renders fetched todos. Delete a todo.", async () => {
    const user = userEvent.setup();

    render(
        <MemoryRouter>
            <TodoListSection />
        </MemoryRouter>
    );

    //loading
    const skeleton = screen.getByLabelText("Loading todos");

    expect(skeleton).toBeInTheDocument();

    //success
    await waitFor(() => {
        const skeleton = screen.queryByLabelText("Loading todos");
        expect(skeleton).not.toBeInTheDocument();
    });

    const list = screen.getAllByRole("listitem");

    expect(list).toHaveLength(4);

    const deleteTodoBtns = screen.getAllByLabelText("Delete todo");

    //delete first item
    await user.click(deleteTodoBtns[0]);

    const modal = screen.getByRole("presentation");

    expect(modal).toBeInTheDocument();

    const confirmBtn = screen.getByRole("button", { name: "Yes" });

    await user.click(confirmBtn);

    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();

    //loading
    const circularProgress = screen.getByRole("progressbar");
    expect(circularProgress).toBeInTheDocument();

    const checkboxInputs = screen.getAllByRole("checkbox");
    expect(checkboxInputs[0]).toBeDisabled();

    //success
    await waitFor(() => {
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
        expect(screen.getAllByRole("checkbox")[0]).not.toBeDisabled();
    });

    expect(screen.getAllByRole("listitem")).toHaveLength(3);

});

//full test
test("Initial call succeeds and renders fetched todos. Update a todo. Click on checkbox.", async () => {
    const user = userEvent.setup();

    render(
        <MemoryRouter>
            <TodoListSection />
        </MemoryRouter>
    );

    //loading
    const skeleton = screen.getByLabelText("Loading todos");

    expect(skeleton).toBeInTheDocument();

    //success
    await waitFor(() => {
        const skeleton = screen.queryByLabelText("Loading todos");
        expect(skeleton).not.toBeInTheDocument();
    });

    const list = screen.getAllByRole("listitem");

    expect(list).toHaveLength(4);

    //check the first item make it pending
    const checkboxInputs = screen.getAllByRole("checkbox");

    await user.click(checkboxInputs[0]);

    //loading
    const circularProgress = screen.getByRole("progressbar");
    expect(circularProgress).toBeInTheDocument();

    const span = screen.getByRole("presentation");
    expect(span).toBeInTheDocument();
    
    const deleteBtns = screen.getAllByLabelText("Delete todo");
    expect(deleteBtns[0]).toBeDisabled();

    //success
    await waitFor(() => {
        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

        const editLinks = screen.getAllByLabelText("Edit todo");
        expect(editLinks[0]).toHaveAttribute("href");

        expect(screen.getAllByLabelText("Delete todo")[0]).not.toBeDisabled();
    });

    expect(screen.getAllByRole("checkbox")[0]).not.toBeChecked();

});

//full test
test("Initial call succeeds and renders fetched todos. Filter todos by completed success.", async () => {
    
    const user = userEvent.setup();

    render(
        <MemoryRouter>
            <TodoListSection />
        </MemoryRouter>
    );

    //loading
    const skeleton = screen.getByLabelText("Loading todos");

    expect(skeleton).toBeInTheDocument();

    //success
    await waitFor(() => {
        const skeleton = screen.queryByLabelText("Loading todos");
        expect(skeleton).not.toBeInTheDocument();
    });

    const list = screen.getAllByRole("listitem");

    expect(list).toHaveLength(4);

    const completedBtn = screen.getByRole("button", { name: "Completed" });

    await user.click(completedBtn);

    //loading appears again
    expect(screen.getByLabelText("Loading todos")).toBeInTheDocument();

    //success
    await waitFor(() => {
        const skeleton = screen.queryByLabelText("Loading todos");
        expect(skeleton).not.toBeInTheDocument();
    });

    //rendered
    expect(screen.getAllByRole("listitem")).toHaveLength(2);

    expect(screen.getByRole("button", { name: "Completed" })).toHaveAttribute("aria-current", "true");

    const allCheckboxes = screen.getAllByRole("checkbox");
    
    allCheckboxes.forEach(elem => {
        expect(elem).toBeChecked();
    });

});

//full test
test("Initial call succeeds and renders fetched todos. Filter todos by completed error.", async () => {
    
    const user = userEvent.setup();

    render(
        <MemoryRouter>
            <TodoListSection />
        </MemoryRouter>
    );

    //loading
    const skeleton = screen.getByLabelText("Loading todos");

    expect(skeleton).toBeInTheDocument();

    //success
    await waitFor(() => {
        const skeleton = screen.queryByLabelText("Loading todos");
        expect(skeleton).not.toBeInTheDocument();
    });

    //mock here
    server.use(
        http.get("/api/todolist", async () => {
            await delay();
            
            return HttpResponse.error();
        })
    );

    const list = screen.getAllByRole("listitem");

    expect(list).toHaveLength(4);

    const completedBtn = screen.getByRole("button", { name: "Completed" });

    await user.click(completedBtn);

    //loading appears again
    expect(screen.getByLabelText("Loading todos")).toBeInTheDocument();

    //error
    await waitFor(() => {
        const skeleton = screen.queryByLabelText("Loading todos");
        expect(skeleton).not.toBeInTheDocument();
    });

    //alert
    const alert = screen.getByRole("alert");
    const alertText = screen.getByText("Something went wrong. Please try again later.");

    expect(alert).toBeInTheDocument();
    expect(alertText).toBeInTheDocument();

    const alertClose = screen.getByLabelText(/Close/);

    expect(alertClose).toBeInTheDocument();

    await user.click(alertClose);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

});

//full test
test("Initial call succeeds and renders fetched todos. Search todos by name success.", async () => {
    const user = userEvent.setup();

    render(
        <MemoryRouter>
            <TodoListSection />
        </MemoryRouter>
    );

    //loading
    const skeleton = screen.getByLabelText("Loading todos");

    expect(skeleton).toBeInTheDocument();

    //success
    await waitFor(() => {
        const skeleton = screen.queryByLabelText("Loading todos");
        expect(skeleton).not.toBeInTheDocument();
    });

    const list = screen.getAllByRole("listitem");

    expect(list).toHaveLength(4);

    const input = screen.getByPlaceholderText("Search todos...");

    await user.type(input, "emails");

    //setTimeout
    await waitFor(() => {
        //loading appears again
        expect(screen.getByLabelText("Loading todos")).toBeInTheDocument();
    });

    //success
    await waitFor(() => {
        const skeleton = screen.queryByLabelText("Loading todos");
        expect(skeleton).not.toBeInTheDocument();
    });

    //rendered
    expect(screen.getAllByRole("listitem")).toHaveLength(1);

});
