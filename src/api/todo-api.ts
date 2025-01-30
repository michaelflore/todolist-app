import { TodoI, TodoUpdatesI } from "../types/todo";

export const fetchTodosAPI = async (searchTerm: string, signal: AbortSignal) => {

  try {
    let url = "/api/todolist";

    const searchQuery = searchTerm ? `?search=${searchTerm}` : "";

    if(searchQuery) {
      url = url + searchQuery;
    }

    const response = await fetch(url, {
      method: "GET",
      signal: signal
    });

    const data = await response.json();

    return data;

  } catch(err) {

    if(err instanceof Error) {
      console.error("fetchTodosAPI", err);
    }

  }

}

export const addTodoAPI = async (newTodo: TodoI) => {

  try {
    const url = "/api/todolist";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodo)
    });

    const data = await response.json();

    return data;

  } catch(err) {

    if(err instanceof Error) {
      console.error("addTodoAPI", err);
    }

  }

}

export const updateTodoAPI = async (todoId: string, updates: TodoUpdatesI) => {

  try {
      const url = "/api/todolist/" + todoId;

      const response = await fetch(url, {
          method: "PATCH",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updates)
      });

      const data = await response.json();

      return data;

  } catch(err) {

    if(err instanceof Error) {
      console.error("updateTodoAPI", err);
    }

  }

}

export const deleteTodoAPI = async (todoId: string) => {

  try {
      const url = "/api/todolist/" + todoId;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Accept": "application/json"
        }
      });

      const data = await response.json();

      return data;

  } catch(err) {

    if(err instanceof Error) {
      console.error("deleteTodoAPI", err);
    }

  }

}