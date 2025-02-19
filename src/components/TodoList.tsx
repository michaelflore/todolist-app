import { TodoI } from "../types/todo";
import TodoListItem from "./TodoListItem";
import NoResults from "./NoResults";

export type TodoListDataType = TodoI[] | [];

interface TodoListProps {
    data: TodoListDataType;
    updateTodoState: (updatedTodo: TodoI) => void;
    deleteTodoState: (todo: TodoI) => void;
}

// Component also acts as a result of the search or filtering
function TodoList( { data, deleteTodoState, updateTodoState }: TodoListProps) {

    return (
        <>
            {
                data.length > 0 ? (
                    <div className="todolist" role="list">
                        {
                            data.map((todo) => {
                                return (
                                    <TodoListItem
                                        key={todo.id}
                                        todo={todo}
                                        updateTodoState={updateTodoState}
                                        deleteTodoState={deleteTodoState}
                                    />
                                )
                            })
                        }
                    </div>
                ) : (
                    <NoResults />
                )
            }
        </>
    )
}

export default TodoList;
