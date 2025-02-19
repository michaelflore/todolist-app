import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse, delay } from "msw";
import { server } from "../__mocks__/mock-server";

import SearchForm from "../components/SearchForm";

// Since searchTerm is a prop we'll just pass in a set prop then trigger the onChange with space as if we were typing
test("Search term changes.", async () => {
    const user = userEvent.setup();

    const setLoadingTodosStateMock = jest.fn();
    const setTodosErrorStateMock = jest.fn();
    const setTodosStateMock = jest.fn();
    const setSearchTermStateMock = jest.fn();

    render(
        <SearchForm
            activeFilter=""
            setLoadingTodosState={setLoadingTodosStateMock}
            setTodosErrorState={setTodosErrorStateMock}
            setTodosState={setTodosStateMock}
            searchTerm={"emails"}
            setSearchTermState={setSearchTermStateMock}
        />
    );

    const input = screen.getByPlaceholderText("Search todos...");

    await user.type(input, " ");

    expect(setSearchTermStateMock).toHaveBeenCalled();

    //setTimeout
    await waitFor(() => {
        expect(setLoadingTodosStateMock).toHaveBeenCalledWith(true);
    });

    //success
    await waitFor(() => {
        expect(setTodosStateMock).toHaveBeenCalledWith(
            [
                {
                    "id": "6418eab2-161d-4c78-8d68-0c9176ce642c",
                    "title": "Respond to client emails",
                    "completed": false
                }
            ]
        );
    
        expect(setTodosErrorStateMock).toHaveBeenCalledWith(
            { type: "", message: "" }
        );
    
        expect(setLoadingTodosStateMock).toHaveBeenCalledWith(false);
    });

});

test("Search api fails when server url is down or not found. Calls state loading and error state.", async () => {
    server.use(
        http.get("/api/todolist", async () => {
            await delay();
            
            return HttpResponse.error();
        })
    );

    const user = userEvent.setup();

    const setLoadingTodosStateMock = jest.fn();
    const setTodosErrorStateMock = jest.fn();
    const setTodosStateMock = jest.fn();
    const setSearchTermStateMock = jest.fn();

    render(
        <SearchForm
            activeFilter=""
            setLoadingTodosState={setLoadingTodosStateMock}
            setTodosErrorState={setTodosErrorStateMock}
            setTodosState={setTodosStateMock}
            searchTerm={"emails"}
            setSearchTermState={setSearchTermStateMock}
        />
    );

    const input = screen.getByPlaceholderText("Search todos...");

    await user.type(input, " ");

    expect(setSearchTermStateMock).toHaveBeenCalled();

    //setTimeout
    await waitFor(() => {
        expect(setLoadingTodosStateMock).toHaveBeenCalledWith(true);
    });

    await waitFor(() => {
        expect(setTodosErrorStateMock).toHaveBeenCalledWith(
            { type: "search", message: "Something went wrong. Please try again later."}
        );
    
        expect(setLoadingTodosStateMock).toHaveBeenCalledWith(false);
    });
    

});

test("Aborted once we type, make a call, then type again.", async () => {
    const user = userEvent.setup();

    const setLoadingTodosStateMock = jest.fn();
    const setTodosErrorStateMock = jest.fn();
    const setTodosStateMock = jest.fn();
    const setSearchTermStateMock = jest.fn();

    render(
        <SearchForm
            activeFilter=""
            setLoadingTodosState={setLoadingTodosStateMock}
            setTodosErrorState={setTodosErrorStateMock}
            setTodosState={setTodosStateMock}
            searchTerm={"emails"}
            setSearchTermState={setSearchTermStateMock}
        />
    );

    const input = screen.getByPlaceholderText("Search todos...");

    await user.type(input, "  "); //double space to cancel previous debounce

    expect(setSearchTermStateMock).toHaveBeenCalled();

    //setTimeout
    await waitFor(() => {
        expect(setLoadingTodosStateMock).toHaveBeenCalledWith(true);
    });

    await user.type(input, " "); //trigger abort

    expect(setSearchTermStateMock).toHaveBeenCalled();

    //setTimeout
    await waitFor(() => {
        expect(setLoadingTodosStateMock).toHaveBeenCalledWith(true);
    });

    expect(setTodosStateMock).toHaveBeenCalledWith(
        [
            {
                "id": "6418eab2-161d-4c78-8d68-0c9176ce642c",
                "title": "Respond to client emails",
                "completed": false
            }
        ]
    );

    expect(setTodosErrorStateMock).toHaveBeenCalledWith(
        { type: "", message: "" }
    );

    expect(setLoadingTodosStateMock).toHaveBeenCalledWith(false);

});
