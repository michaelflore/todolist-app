import { http, HttpResponse, delay } from "msw";

interface AddTodoRequestBody {
    title: string;
    completed: boolean;
}

export const handlers = [
    http.get("/api/todolist", async (info) => {

        const params = new URL(info.request.url).searchParams;

        const searchValue = params.get("search");
        const filterValue = params.get("filter");

        if(filterValue) {
            if(filterValue === "completed") {
                return HttpResponse.json(
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
            }

            if(filterValue === "pending") {
                return HttpResponse.json(
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
            }
        }

        if(searchValue) {
            return HttpResponse.json(
                [
                    {
                      "id": "6418eab2-161d-4c78-8d68-0c9176ce642c",
                      "title": "Respond to client emails",
                      "completed": false
                    }
                ]
            );
        }

        await delay();

        return HttpResponse.json(
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
        )
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
    http.patch("/api/todolist/:todoId", async () => {
        // const url = new URL(info.request.url);
        // console.log(info.params.todoId)
        // console.log(url)

        // const updates = await info.request.json();

        // console.log(updates);
        await delay();
        
        return HttpResponse.json({
            "id": "2e70d95c-11b4-494b-ad69-026acc309a08",
            "title": "Complete project report",
            "completed": false
        }, { status: 200 });
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

