import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse, delay } from "msw";
import { server } from "../__mocks__/mock-server";

import FilterButtons from "../components/FilterButtons";

test("Handle click all filter. Active filter and search term start off at ''.", async () => {
    const user = userEvent.setup();

    const setActiveFilterStateMock = jest.fn();
    const setLoadingTodosStateMock = jest.fn();
    const setTodosErrorStateMock = jest.fn();
    const setTodosStateMock = jest.fn();

    render(
        <FilterButtons
            activeFilter=""
            setActiveFilterState={setActiveFilterStateMock}
            setLoadingTodosState={setLoadingTodosStateMock}
            setTodosErrorState={setTodosErrorStateMock}
            setTodosState={setTodosStateMock}
            searchTerm=""
        />
    );

    const allBtn = screen.getByRole("button", { name: "All" });

    await user.click(allBtn);

    expect(setLoadingTodosStateMock).toHaveBeenCalledWith(true);

    await waitFor(() => {
        expect(setTodosStateMock).toHaveBeenCalledWith(
            [
                {
                  "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
                  "title": "Complete project report",
                  "completed": true
                },
                {
                  "id": "63980a8e-5538-4e70-a9bd-c16e6a947129",
                  "title": "Buy groceries",
                  "completed": true
                },
                {
                  "id": "6418eab2-161d-4c78-8d68-0c9176ce642c",
                  "title": "Respond to client emails",
                  "completed": false
                },
                {
                  "id": "3bb4944c-d5d0-4f93-a8c5-93b513bd90cc",
                  "title": "Schedule doctor's appointment",
                  "completed": false
                }
            ]
        );
    });


    expect(setTodosErrorStateMock).toHaveBeenCalledWith(
        { type: "", message: "" }
    );

    expect(setLoadingTodosStateMock).toHaveBeenCalledWith(false);

    expect(setActiveFilterStateMock).toHaveBeenCalledWith("");

});

test("Handle click all filter. Filter all api url is down or not found.", async () => {
    server.use(
        http.get("/api/todolist", async () => {
            await delay();
            
            return HttpResponse.error();
        })
    );

    const user = userEvent.setup();

    const setActiveFilterStateMock = jest.fn();
    const setLoadingTodosStateMock = jest.fn();
    const setTodosErrorStateMock = jest.fn();
    const setTodosStateMock = jest.fn();

    render(
        <FilterButtons
            activeFilter=""
            setActiveFilterState={setActiveFilterStateMock}
            setLoadingTodosState={setLoadingTodosStateMock}
            setTodosErrorState={setTodosErrorStateMock}
            setTodosState={setTodosStateMock}
            searchTerm=""
        />
    );

    const allBtn = screen.getByRole("button", { name: "All" });

    await user.click(allBtn);

    expect(setLoadingTodosStateMock).toHaveBeenCalledWith(true);

    await waitFor(() => {
        expect(setTodosErrorStateMock).toHaveBeenCalledWith(
            { type: "filter", message: "Something went wrong. Please try again later."}
        );
    
        expect(setLoadingTodosStateMock).toHaveBeenCalledWith(false);
    })


});

test("Handle click completed filter. Active filter is completed.", async () => {
    const user = userEvent.setup();

    const setActiveFilterStateMock = jest.fn();
    const setLoadingTodosStateMock = jest.fn();
    const setTodosErrorStateMock = jest.fn();
    const setTodosStateMock = jest.fn();

    render(
        <FilterButtons
            activeFilter="completed"
            setActiveFilterState={setActiveFilterStateMock}
            setLoadingTodosState={setLoadingTodosStateMock}
            setTodosErrorState={setTodosErrorStateMock}
            setTodosState={setTodosStateMock}
            searchTerm=""
        />
    );

    const completedBtn = screen.getByRole("button", { name: "Completed" });

    await user.click(completedBtn);

    expect(setLoadingTodosStateMock).toHaveBeenCalledWith(true);

    await waitFor(() => {
        expect(setTodosStateMock).toHaveBeenCalledWith(
            [
                {
                  "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
                  "title": "Complete project report",
                  "completed": true
                },
                {
                  "id": "63980a8e-5538-4e70-a9bd-c16e6a947129",
                  "title": "Buy groceries",
                  "completed": true
                }
            ]
        );
    });


    expect(setTodosErrorStateMock).toHaveBeenCalledWith(
        { type: "", message: "" }
    );

    expect(setLoadingTodosStateMock).toHaveBeenCalledWith(false);

    expect(setActiveFilterStateMock).toHaveBeenCalledWith("completed");

});

test("Handle click completed filter. Filter completed api url is down or not found.", async () => {
    server.use(
        http.get("/api/todolist", async () => {
            await delay();
            
            return HttpResponse.error();
        })
    );

    const user = userEvent.setup();

    const setActiveFilterStateMock = jest.fn();
    const setLoadingTodosStateMock = jest.fn();
    const setTodosErrorStateMock = jest.fn();
    const setTodosStateMock = jest.fn();

    render(
        <FilterButtons
            activeFilter=""
            setActiveFilterState={setActiveFilterStateMock}
            setLoadingTodosState={setLoadingTodosStateMock}
            setTodosErrorState={setTodosErrorStateMock}
            setTodosState={setTodosStateMock}
            searchTerm=""
        />
    );

    const completedBtn = screen.getByRole("button", { name: "Completed" });

    await user.click(completedBtn);

    expect(setLoadingTodosStateMock).toHaveBeenCalledWith(true);

    expect(setTodosErrorStateMock).toHaveBeenCalledWith(
        { type: "filter", message: "Something went wrong. Please try again later." }
    );

    expect(setLoadingTodosStateMock).toHaveBeenCalledWith(false);

});

test("Handle click pending filter. Active filter is pending.", async () => {
    const user = userEvent.setup();

    const setActiveFilterStateMock = jest.fn();
    const setLoadingTodosStateMock = jest.fn();
    const setTodosErrorStateMock = jest.fn();
    const setTodosStateMock = jest.fn();

    render(
        <FilterButtons
            activeFilter="pending"
            setActiveFilterState={setActiveFilterStateMock}
            setLoadingTodosState={setLoadingTodosStateMock}
            setTodosErrorState={setTodosErrorStateMock}
            setTodosState={setTodosStateMock}
            searchTerm=""
        />
    );

    const pendingBtn = screen.getByRole("button", { name: "Pending" });

    await user.click(pendingBtn);

    expect(setLoadingTodosStateMock).toHaveBeenCalledWith(true);

    await waitFor(() => {
        expect(setTodosStateMock).toHaveBeenCalledWith(
            [
                {
                    "id": "6418eab2-161d-4c78-8d68-0c9176ce642c",
                    "title": "Respond to client emails",
                    "completed": false
                },
                {
                    "id": "3bb4944c-d5d0-4f93-a8c5-93b513bd90cc",
                    "title": "Schedule doctor's appointment",
                    "completed": false
                }
            ]
        );
    });


    expect(setTodosErrorStateMock).toHaveBeenCalledWith(
        { type: "", message: "" }
    );

    expect(setLoadingTodosStateMock).toHaveBeenCalledWith(false);

    expect(setActiveFilterStateMock).toHaveBeenCalledWith("pending");

});

test("Handle click pending filter. Filter pending api url is down or not found.", async () => {
    server.use(
        http.get("/api/todolist", async () => {
            await delay();
            
            return HttpResponse.error();
        })
    );

    const user = userEvent.setup();

    const setActiveFilterStateMock = jest.fn();
    const setLoadingTodosStateMock = jest.fn();
    const setTodosErrorStateMock = jest.fn();
    const setTodosStateMock = jest.fn();

    render(
        <FilterButtons
            activeFilter=""
            setActiveFilterState={setActiveFilterStateMock}
            setLoadingTodosState={setLoadingTodosStateMock}
            setTodosErrorState={setTodosErrorStateMock}
            setTodosState={setTodosStateMock}
            searchTerm=""
        />
    );

    const pendingBtn = screen.getByRole("button", { name: "Pending" });

    await user.click(pendingBtn);

    expect(setLoadingTodosStateMock).toHaveBeenCalledWith(true);

    expect(setTodosErrorStateMock).toHaveBeenCalledWith(
        { type: "filter", message: "Something went wrong. Please try again later." }
    );

    expect(setLoadingTodosStateMock).toHaveBeenCalledWith(false);

});
