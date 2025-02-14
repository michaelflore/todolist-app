import { http, HttpResponse } from "msw";

export const handlers = [
    http.patch("/api/todolist/:todoId", async () => {
        // const url = new URL(info.request.url);
        // console.log(info.params.todoId)
        // console.log(url)

        // const updates = await info.request.json();

        // console.log(updates);
        
        return HttpResponse.json({
            "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
            "title": "Complete project report",
            "completed": false
        }, { status: 200 });
    }),
    http.post("/api/todolist", async (info) => {
        const todo = await info.request.json();

        console.log(todo);

        return HttpResponse.json({
            "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
            "title": "Complete project report",
            "completed": false
        }, { status: 200 });
    })
];

