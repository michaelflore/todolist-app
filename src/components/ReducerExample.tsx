import { useState, useReducer } from "react";
import { TodoI } from "../types/todo";

function ReducerExample() {

    const myData = [
        {
          id: window.crypto.randomUUID(),
          title: "title 1",
          completed: false
        }
      ];

    interface State {
        todos: TodoI[];
        filteredTodos: TodoI[];
    }

    type ActionType = 
        | { type: "create_todo", value: TodoI }

    const initialState = {
        todos: myData,
        filteredTodos: myData
    }

    function todosReducer(state: State, action: ActionType): State {
        switch(action.type) {
            case "create_todo":

                return {
                    ...state,
                    todos: [action.value, ...state.todos],
                    filteredTodos: [action.value, ...state.filteredTodos]
                };

            default:
                throw new Error("Unknown Action");
        }
    }

    const [state, dispatch] = useReducer(todosReducer, initialState);

    const [value, setValue] = useState("");
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newTodo = {
            id: window.crypto.randomUUID(),
            title: "value",
            completed: false
        };

        dispatch({ type: "create_todo", value: newTodo });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="Enter new todo" onChange={handleChange} value={value}/>

                <input type="submit" />
            </form>
            <div>
                {
                    state.filteredTodos.map((value) => {
                        return (
                            <div>
                                {value.title}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ReducerExample;
