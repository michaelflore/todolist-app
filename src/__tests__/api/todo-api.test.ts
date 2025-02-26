import { http, HttpResponse, delay } from "msw";
import { server } from "../../__mocks__/mock-server-node";

import { fetchTodoAPI, fetchTodosAPI } from "../../api/todo-api";

test("Fetch a single todo. Successful call.", async () => {

    const abortFake = new AbortController();

    const response = await fetchTodoAPI("3bb4944c-d5d0-4f93-a8c5-93b513bd90cc", abortFake.signal);

    const mockTodo = {
        "id": "3bb4944c-d5d0-4f93-a8c5-93b513bd90cc",
        "title": "Schedule doctor's appointment",
        "completed": false
    };

    expect(response).toEqual(mockTodo);
});

test("Fetch a single todo. Service is down or not found.", async () => {

    server.use(
        http.get("/api/todolist/:todoId", async () => {
            await delay();
            
            return HttpResponse.error();
        })
    );

    const consoleSpy = jest.spyOn( console, "error" );

    const abortFake = new AbortController();

    const response = await fetchTodoAPI("3bb4944c-d5d0-4f93-a8c5-93b513bd90cc", abortFake.signal);

    expect(response).toBeUndefined();

    // expect(consoleSpy).toHaveBeenCalledWith("fetchTodoAPI", TypeError("Failed to fetch"));
    
    expect(consoleSpy).toHaveBeenCalledWith("fetchTodoAPI", expect.objectContaining({
        name: "TypeError",
        message: "Failed to fetch"
    }));

});

test("Fetch todos. Test filter and search. Successful call.", async () => {

    const abortFake = new AbortController();

    const response = await fetchTodosAPI("pending", "doctor", abortFake.signal);

    const mockTodos = [{
        "id": "3bb4944c-d5d0-4f93-a8c5-93b513bd90cc",
        "title": "Schedule doctor's appointment",
        "completed": false
    }];

    expect(response).toEqual(mockTodos);
});

test("Fetch todos. Test filter and search. Service is down or not found.", async () => {

    server.use(
        http.get("/api/todolist", async () => {
            await delay();
            
            return HttpResponse.error();
        })
    );

    const consoleSpy = jest.spyOn( console, "error" );

    const abortFake = new AbortController();

    const response = await fetchTodosAPI("pending", "doctor", abortFake.signal);

    expect(response).toBeUndefined();

    // expect(consoleSpy).toHaveBeenCalledWith("fetchTodosAPI", TypeError("Failed to fetch"));

    expect(consoleSpy).toHaveBeenCalledWith("fetchTodosAPI", expect.objectContaining({
        name: "TypeError",
        message: "Failed to fetch"
    }));

});