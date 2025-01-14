import { useEffect, useState } from "react";

import List from "./List";
import FilterButtons from "./FilterButtons";
import InputForm from "./InputForm";

export interface TodoI {
  id: string;
  title: string;
  rating: number;
  likes: number;
}

function TodoList() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [todos, setTodos] = useState<TodoI[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<TodoI[]>([]); //displayed

  const [searchTerm, setSearchTerm] = useState("");

  //will still get called on initial render, then after todos is updated
  useEffect(() => {
    console.log("todos changed")
  }, [todos]);

  useEffect(() => {

    const abortController = new AbortController();
    const signal = abortController.signal;

    (
      async () => {

        setLoading(true);

        try {
          const searchQuery = searchTerm ? `?search=${searchTerm}` : "";

          const response = await fetch("http://localhost:5000/todolist" + searchQuery, {
            method: "GET",
            signal: signal
          });
  
          const data = await response.json();
  
          setError(false);
          setTodos(data);
          setFilteredTodos(data);

          setLoading(false);

        } catch(err) {

          if(err instanceof Error && err.name == "AbortError") {
            console.error(err);
          } else {
            setError(true);
            setLoading(false);
          }

        }
      }
    )();

    return () => {
      abortController.abort();
    }

  }, [searchTerm]);

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

  const likeTodo = (todo: TodoI) => {
    setTodos(state => {
      return state.map((value => {
        if(value.id === todo.id) {
          return {
            ...value,
            likes: value.likes + 1
          };
        } else {
          return value;
        }
      }))
    });

    setFilteredTodos(state => {
      return state.map((value => {
        if(value.id === todo.id) {
          return {
            ...value,
            likes: value.likes + 1
          };
        } else {
          return value;
        }
      }))
    });
  }

  const sortByLikes = () => {
    setFilteredTodos(state => {
      const arrayCopy = [...state];

      return arrayCopy.sort((a, b) => {
        if(a.likes > b.likes) { //a will come before b
          return -1;
        } else if (b.likes > a.likes) {
          return 1;
        } else {
          return 0;
        }
      });
    })
  }

  const filterAll = () => {
    
    setFilteredTodos(todos);

  };

  const moreThanThree = () => {

    setFilteredTodos((state) => {

      const newArr = state.filter((todo) => todo.rating > 3);

      return newArr;
    });

  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <h1>TodoList</h1>
      <input
        type="text"
        placeholder="Search todo..."
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
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
                <>
                  <InputForm
                    createNewTodo={createNewTodo}
                  />
                  {
                    filteredTodos.length > 0 && (
                      <>
                        <FilterButtons
                          filterAll={filterAll}
                          moreThanThree={moreThanThree}
                          sortByLikes={sortByLikes}
                        />
                        <List
                          data={filteredTodos}
                          deleteTodo={deleteTodo}
                          likeTodo={likeTodo}
                        />
                      </>
                    )
                  }
                </>
              )
            }
          </>
        )
      }
    </>
  )
}

export default TodoList;
