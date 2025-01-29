import { useEffect, useState } from "react";

import List from "./List";
import FilterButtons from "./FilterButtons";
import InputForm from "./InputForm";
import SearchForm from "./SearchForm";

import { fetchTodosAPI } from "../api/todo-api";

import { TodoI } from "../types/todo";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Skeleton from "@mui/material/Skeleton";

function TodoList() {

  const [loading, setLoading] = useState(false);
  const [todosError, setTodosError] = useState("");

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
          setTodosError("");
          setLoading(false);
 
        }

      } catch(err) {

        console.error("fetchTodos", err);

        setTodosError("Something went wrong. Please try again.");
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

  const deleteTodoState = (todo: TodoI) => {
    setTodos(state => {
      return state.filter(value => value.id !== todo.id);
    });

    setFilteredTodos(state => {
      return state.filter(value => value.id !== todo.id);
    });
  };

  const markTodoCompletedState = (todo: TodoI, value: boolean) => {
    setTodos(state => {
      return state.map((item) => {
        if(item.id === todo.id) {
          return {
            ...item,
            completed: value
          }
        } else {
          return item;
        }
      })
    });

    setFilteredTodos(state => {
      return state.map((item) => {
        if(item.id === todo.id) {
          return {
            ...item,
            completed: value
          }
        } else {
          return item;
        }
      })
    });
  }

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

  const setTodosErrorState = (error: string) => {
    setTodosError(error);
  }

  const setTodosState = (data: TodoI[]) => {
    setTodos(data);
    setFilteredTodos(data);
  }

  const handleAlertClose = () => {
    setTodosErrorState("");
  }

  return (
    <div className="todolist-app">
      <div className="container">
        <h1>My Todos</h1>

        <InputForm
          createNewTodo={createNewTodo}
        />

        <div className="search-and-filter">
          <SearchForm
            setLoadingTodos={setLoadingTodos}
            setTodosErrorState={setTodosErrorState}
            setTodosState={setTodosState}
          />
          <FilterButtons
            filterAll={filterAll}
          />
        </div>
        {
          loading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
            >
              <List
                data={filteredTodos}
                deleteTodoState={deleteTodoState}
                markTodoCompletedState={markTodoCompletedState}
              />
            </Skeleton>
          ) : (
            <>
              {
                todosError ? (
                  <Alert severity="error" onClose={handleAlertClose}>
                    <AlertTitle>Error</AlertTitle>
                    {
                      todosError
                    }
                  </Alert>
                ) : (
                    <>
                      {
                        filteredTodos.length > 0 && (
                          <List
                            data={filteredTodos}
                            deleteTodoState={deleteTodoState}
                            markTodoCompletedState={markTodoCompletedState}
                          />
                        )
                      }
                    </>
                )
              }
            </>
          )
        }

      </div>
    </div>
  )
}

export default TodoList;
