import { TodoUpdatesBody } from "../components/EditTodoPageBody";
import { TodoAddI, filterStatusType } from "../types/todo";

interface Query {
  search?: string;
  filter?: filterStatusType;
}

export const fetchTodoAPI = async (todoId: string, signal: AbortSignal) => {

  try {
    const url = "/api/todolist/" + todoId;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      },
      signal: signal
    });

    const data = await response.json();

    return data;

  } catch (err) {
console.log(err);
    if(err instanceof Error) {
      console.error("fetchTodoAPI", err);
    }
    
  }

}

export const fetchTodosAPI = async (filterTerm: filterStatusType, searchTerm: string, signal: AbortSignal | null) => {

  try {
    let url = "/api/todolist";

    const query: Query = {};

    if(searchTerm) {
      query.search = searchTerm;
    }

    if(filterTerm) {
      query.filter = filterTerm;
    }

    if(Object.keys(query).length > 0) {
      url = url + "?";

      const entries = Object.entries(query);

      entries.forEach((entry, index) => {
        const [key, value] = entry;

        url = url + `${key}=${value}`

        if(index !== entries.length - 1) {
          url = url + "&";
        }
      });
    }

    const options: RequestInit = {
      method: "GET"
    }

    if(signal !== null) {
      options.signal = signal;
    }

    const response = await fetch(url, options);

    const data = await response.json();

    return data;

  } catch(err) {

    if(err instanceof Error) {
      console.error("fetchTodosAPI", err);
    }

  }

}

export const addTodoAPI = async (newTodo: TodoAddI) => {

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

export const updateTodoAPI = async (todoId: string, updates: TodoUpdatesBody) => {

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
