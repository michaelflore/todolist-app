import { useEffect, useState } from "react";

import List from "./List";
import FilterButtons from "./FilterButtons";
import InputForm from "./InputForm";
import SearchForm from "./SearchForm";

import { fetchTodosAPI } from "../api/todo-api";

import { filterStatusType, TodoI } from "../types/todo";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Skeleton from "@mui/material/Skeleton";

import { useLocation } from "react-router";

function TodoList() {

  const location = useLocation();

  const [updatedTodoSuccessMessage, setUpdatedTodoSuccessMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [todosError, setTodosError] = useState("");

  const [todos, setTodos] = useState<TodoI[]>([]);

  const [activeFilter, setActiveFilter] = useState<filterStatusType>("");
  const [searchTerm, setSearchTerm] = useState("");

  //will still get called on initial render, then after todos is updated
  useEffect(() => {
    console.log("todos changed")
  }, [todos]);

  useEffect(() => {

    const abortController = new AbortController();
    const signal = abortController.signal;

    if(location.state) {
      setUpdatedTodoSuccessMessage(location.state);
      window.history.replaceState({}, "");
    }

    (
      async () => {
      
        try {
  
          setLoading(true);
  
          const todos = await fetchTodosAPI("", "", signal);
  
          if(todos && Array.isArray(todos)) {
  
            setTodos(todos);
  
            setTodosError("");
            setLoading(false);
   
          }
  
        } catch(err) {
  
          console.error("fetchTodos", err);
  
          setTodosError("Something went wrong. Please try again.");
          setLoading(false);
  
        }
  
      }

    )();

    return () => {
      abortController.abort("Mounted");
    }

  }, []);

  const addNewTodoState = (todo: TodoI) => {
    setTodos(state => [todo, ...state]);
  }

  const deleteTodoState = (todo: TodoI) => {
    setTodos(state => {
      return state.filter(value => value.id !== todo.id);
    });
  };

  const updateTodoState = (updatedTodo: TodoI) => {

    setTodos(state => {
      return state.map((item) => {
        if(item.id === updatedTodo.id) {
          return updatedTodo;
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

  const setLoadingTodosState = (loading: boolean) => {
    setLoading(loading);
  }

  const setTodosErrorState = (error: string) => {
    setTodosError(error);
  }

  const setTodosState = (data: TodoI[]) => {
    setTodos(data);
  }

  const setActiveFilterState = (filterTerm: filterStatusType) => {
    setActiveFilter(filterTerm);
  }

  const setSearchTermState = (value: string) => {
    setSearchTerm(value);
  }

  const handleAlertClose = () => {
    setTodosErrorState("");
  }

  const handleAlertSuccessClose = () => {
    setUpdatedTodoSuccessMessage("");
  }

  return (
    <div className="todolist-app">
      <div className="container">
        <h1>My Todos</h1>
        {
          updatedTodoSuccessMessage && (
            <Alert
              severity="success"
              onClose={handleAlertSuccessClose}
              className="todo-success-alert"
            >
              {
                updatedTodoSuccessMessage
              }
            </Alert>
          )
        }

        <InputForm
          addNewTodoState={addNewTodoState}
        />

        <div className="search-and-filter">
          <SearchForm
            activeFilter={activeFilter}
            setLoadingTodosState={setLoadingTodosState}
            setTodosErrorState={setTodosErrorState}
            setTodosState={setTodosState}
            searchTerm={searchTerm}
            setSearchTermState={setSearchTermState}
          />
          <FilterButtons
            activeFilter={activeFilter}
            setActiveFilterState={setActiveFilterState}
            setLoadingTodosState={setLoadingTodosState}
            setTodosErrorState={setTodosErrorState}
            setTodosState={setTodosState}
            searchTerm={searchTerm}
          />
        </div>
        {
          loading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
            >
              <List
                data={todos}
                deleteTodoState={deleteTodoState}
                updateTodoState={updateTodoState}
                setLoadingTodosState={setLoadingTodosState}
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
                      todos.length > 0 && (
                        <List
                          data={todos}
                          deleteTodoState={deleteTodoState}
                          updateTodoState={updateTodoState}
                          setLoadingTodosState={setLoadingTodosState}
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
