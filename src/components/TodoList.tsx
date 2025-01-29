import { useEffect, useState } from "react";

import List from "./List";
import FilterButtons from "./FilterButtons";
import InputForm from "./InputForm";
import { fetchTodosAPI } from "../api/todo-api";
import { TodoI } from "../types/todo";
import SearchForm from "./SearchForm";

function TodoList() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [todos, setTodos] = useState<TodoI[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<TodoI[]>([]); //displayed

  //will still get called on initial render, then after todos is updated
  useEffect(() => {
    console.log("todos changed")
  }, [todos]);

  useEffect(() => {

    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchTodos = async () => {
      
      try {

        setLoading(true);

        const data = await fetchTodosAPI("", signal);

        if(data && Array.isArray(data)) {

          setTodos(data);
          setFilteredTodos(data);
          setError(false);
          setLoading(false);

        }

      } catch(err) {

        console.error("fetchTodos", err);

        setError(true);
        setLoading(false);

      }

    }

    fetchTodos();

    return () => {
      abortController.abort("Mounted");
    }

  }, []);

  const createNewTodo = (todo: TodoI) => {
    setTodos(state => [todo, ...state]);
    setFilteredTodos(state => [todo, ...state]);
  }

  const deleteTodo = (todo: TodoI) => {
    setTodos(state => {
      return state.filter(value => value.id !== todo.id);
    });

    setFilteredTodos(state => {
      return state.filter(value => value.id !== todo.id);
    });
  };

  // const sortByLikes = () => {
  //   setFilteredTodos(state => {
  //     const arrayCopy = [...state];

  //     return arrayCopy.sort((a, b) => {
  //       if(a.likes > b.likes) { //a will come before b
  //         return -1;
  //       } else if (b.likes > a.likes) {
  //         return 1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //   })
  // }

  const filterAll = () => {
    
    setFilteredTodos(todos);

  };

  const setLoadingTodos = (loading: boolean) => {
    setLoading(loading);
  }

  const setErrorTodos = (error: boolean) => {
    setError(error);
  }

  const setTodosState = (data: TodoI[]) => {
    setTodos(data);
    setFilteredTodos(data);
  }

  return (
    <div className="todolist-app">
      <h1>My Todos</h1>
      <InputForm
        createNewTodo={createNewTodo}
      />
      <div className="search-and-filter">
        <SearchForm
          setLoadingTodos={setLoadingTodos}
          setErrorTodos={setErrorTodos}
          setTodosState={setTodosState}
        />
        <FilterButtons
          filterAll={filterAll}
        />
      </div>
      {
        loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {
              error ? (
                <div>
                  Something Went Wrong.
                </div>
              ) : (
                <div className="container">
                  {
                    filteredTodos.length > 0 && (
                      <List
                        data={filteredTodos}
                        deleteTodo={deleteTodo}
                      />
                    )
                  }
                </div>
              )
            }
          </>
        )
      }
    </div>
  )
}

export default TodoList;
