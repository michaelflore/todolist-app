import TodoListItem from "./TodoListItem";
import { TodoI } from "../types/todo";

interface TodoListProps {
    data: TodoI[];
    deleteTodoState: (todo: TodoI) => void;
    updateTodoState: (updatedTodo: TodoI) => void;
    setLoadingTodosState: (loading: boolean) => void;
}

function TodoList( { data, deleteTodoState, updateTodoState, setLoadingTodosState }: TodoListProps) {

    return (
        <div className="todolist">
            {
                data.map((todo) => {
                    return (
                        <TodoListItem
                            key={todo.id}
                            todo={todo}
                            deleteTodoState={deleteTodoState}
                            updateTodoState={updateTodoState}
                            setLoadingTodosState={setLoadingTodosState}
                        />
                    )
                })
            }
        </div>
    )
}

export default TodoList;