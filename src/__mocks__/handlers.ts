import { http, HttpResponse, delay } from "msw";
import mockedDatabase from "../__mocks__/mock-db";

interface AddTodoRequestBody {
    title: string;
    completed: boolean;
}

interface GetTodoParams {
    todoId: string;
}

interface UpdateTodoParams {
    todoId: string;
}

interface UpdateTodoRequestBody {
    title?: string;
    completed?: boolean;
}

export const handlers = [
    http.get("/api/todolist", async (info) => {

        const params = new URL(info.request.url).searchParams;

        const searchValue = params.get("search");
        const filterValue = params.get("filter");

        let todolist = mockedDatabase.db;

        await delay();

        if(filterValue) {
            if(filterValue === "completed") {
                todolist = todolist.filter((todo) => {
                    return todo.completed === true;
                });
            }

            if(filterValue === "pending") {
                todolist = todolist.filter((todo) => {
                    return todo.completed === false;
                });
            }
        }

        if(searchValue) {
            const query = searchValue.toLowerCase();

            todolist = todolist.filter((todo) => {
                return todo.title.toLowerCase().includes(query);
            });
        }

        return HttpResponse.json(
            todolist,
            { status: 200 }
        )
    }),
    http.get<GetTodoParams>("/api/todolist/:todoId", async (info) => {
        const todoId = info.params.todoId;

        const response = mockedDatabase.db;

        const todo = response.find(value => value.id === todoId);

        await delay();

        if(todo === undefined) {

            return HttpResponse.json(
                {
                    error: true,
                    message: "Item not found."
                },
                { status: 404 }
            )
        }

        return HttpResponse.json(todo, { status: 200 });

    }),
    http.post<object, AddTodoRequestBody>("/api/todolist", async (info) => {
        const todoBody = await info.request.json();

        // add uuid
        const genId = crypto.randomUUID();

        const newTodo = {
            id: genId,
            title: todoBody.title,
            completed: todoBody.completed
        };

        await delay();

        return HttpResponse.json(newTodo, { status: 200 });
    }),
    http.patch<UpdateTodoParams, UpdateTodoRequestBody>("/api/todolist/:todoId", async (info) => {

        const todoId = info.params.todoId;

        const updatedTodo = await info.request.json();

        await delay();

        const response = mockedDatabase.db;

        const index = response.findIndex(value => value.id === todoId);

        if(index === -1) {
            return HttpResponse.json(
                {
                    error: true,
                    message: "Item not found."
                },
                { status: 404 }
            )
        }
        
        const todo = response[index];

        if(updatedTodo.title !== undefined) {
            todo.title = updatedTodo.title;
        }

        if(updatedTodo.completed !== undefined) {
            todo.completed = updatedTodo.completed;
        }

        return HttpResponse.json(todo, { status: 200 });
    }),
    http.delete("/api/todolist/:todoId", async () => {

        await delay();

        return HttpResponse.json({
            "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
            "title": "Complete project report",
            "completed": true
        }, { status: 200 });
    })
];

