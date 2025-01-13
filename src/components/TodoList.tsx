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

  const [todos, setTodos] = useState<TodoI[]>([]);

  const [filteredTodos, setFilteredTodos] = useState<TodoI[]>([]); //displayed

  //will still get called on initial render, then after todos is updated
  useEffect(() => {
    console.log("todos changed")
  }, [todos]);

  useEffect(() => {
    document.title = "Todo List";
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

  return (
    <>
      <InputForm
        createNewTodo={createNewTodo}
      />
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

export default TodoList;
