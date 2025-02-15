import { useEffect, useState } from "react";

import TodoList from "./TodoList";
import FilterButtons from "./FilterButtons";
import SearchForm from "./SearchForm";

import { fetchTodosAPI } from "../api/todo-api";

import { filterStatusType, TodoI } from "../types/todo";

import { css } from "@emotion/react";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Skeleton from "@mui/material/Skeleton";

import AddIcon from "@mui/icons-material/Add";

import { useLocation, Link } from "react-router";

import NoTodos from "./NoTodos";

function TodoListSection() {

  const location = useLocation();

  const [hideContent, setHideContent] = useState(true);
  const [updatedTodoSuccessMessage, setUpdatedTodoSuccessMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [todosError, setTodosError] = useState({ type: "", message: ""});

  const [fetchedTodos, setFetchedTodos] = useState<TodoI[]>([]);
  const [todos, setTodos] = useState<TodoI[]>([]);

  const [activeFilter, setActiveFilter] = useState<filterStatusType>("");
  const [searchTerm, setSearchTerm] = useState("");

  const addLinkStyles = css`
    background-color: #000;
    padding: 0.4em 0.8em;
    font-size: 1em;
    line-height: 1em;
    font-weight: 500;
    border: 1px solid transparent;
    color: #fff;
    border-radius: 5px;
    transition: background-color 0.25s;
    cursor: pointer;
    display: flex;
    align-items: center;
    column-gap: 5px;
    width: max-content;

    & .add-icon {
      width: 24px;
      height: 24px;
    }

    &:hover {
      background-color: rgb(0, 0, 0, 0.7);
      color: #fff;
    }

    &:active {
      outline: 2px solid rgb(0, 0, 0, 0.7);
    }

    &:focus-visible {
      outline: 2px solid #000;
    }

  `;

  //will still get called on initial render, then after todos is updated
  // useEffect(() => {
  //   console.log("todos changed")
  // }, [todos]);

  useEffect(() => {

    setHideContent(false);

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
          console.log("mount", todos);

          //api route not found
          if(todos === undefined) {
            throw new Error();
          }

          // if(todos && todos.error) {
          //   setTodosError(todos.message);
          //   setLoading(false);
          // }

          if(todos && Array.isArray(todos)) {
  
            setFetchedTodos(todos);
            setTodos(todos);
  
            setTodosError({ type: "", message: "" });
            setLoading(false);
   
          }
  
        } catch(err) {
  
          console.error("fetchTodos", err);
  
          if(err instanceof Error) {
            setTodosError({ type: "fetch", message: "Something went wrong. Please try again later." });
            setLoading(false);
          }
  
        }
  
      }

    )();

    return () => {
      abortController.abort("Mounted");
    }

  }, []);

  const deleteTodoState = (todo: TodoI) => {
    setFetchedTodos(state => {
      return state.filter(value => value.id !== todo.id);
    });
    
    setTodos(state => {
      return state.filter(value => value.id !== todo.id);
    });
  };

  const updateTodoState = (updatedTodo: TodoI) => {

    setFetchedTodos(state => {
      return state.map((item) => {
        if(item.id === updatedTodo.id) {
          return updatedTodo;
        } else {
          return item;
        }
      })
    });

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

  const setTodosErrorState = (error: { type: string, message: string }) => {
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
    setTodosErrorState({ type: "", message: "" });
  }

  const handleAlertSuccessClose = () => {
    setUpdatedTodoSuccessMessage("");
  }

  if(hideContent) {
    return null;
  }

  return (
    <div className="todo-list-section">
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
      {
        fetchedTodos.length > 0 && (
          <div className="todo-list-section__actions">
            <div className="todo-list-section__actions-search-filter">
              <FilterButtons
                activeFilter={activeFilter}
                setActiveFilterState={setActiveFilterState}
                setLoadingTodosState={setLoadingTodosState}
                setTodosErrorState={setTodosErrorState}
                setTodosState={setTodosState}
                searchTerm={searchTerm}
              />
              <SearchForm
                activeFilter={activeFilter}
                setLoadingTodosState={setLoadingTodosState}
                setTodosErrorState={setTodosErrorState}
                setTodosState={setTodosState}
                searchTerm={searchTerm}
                setSearchTermState={setSearchTermState}
              />
            </div>
            <Link
              css={addLinkStyles}
              to="/add"
            >
              <AddIcon className="add-icon" />Add Todo
            </Link>
          </div>
        )
      }
      {
        loading ? (
          <Skeleton
            variant="rectangular"
            className="skeleton-loader"
          />
        ) : (
          <>
            {
              todosError && todosError.type ? (
                <Alert severity="error" onClose={todosError.type === "fetch" ? undefined : handleAlertClose}>
                  <AlertTitle>Error</AlertTitle>
                  {
                    todosError.message
                  }
                </Alert>
              ) : (
                <>
                  {
                    fetchedTodos.length === 0 ? (
                      <NoTodos />
                    ) : (
                      <TodoList
                        data={todos}
                        deleteTodoState={deleteTodoState}
                        updateTodoState={updateTodoState}
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
  )
}

export default TodoListSection;
