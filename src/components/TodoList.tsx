import TodoListItem from "./TodoListItem";
import { TodoI } from "../types/todo";

interface TodoListProps {
    data: TodoI[];
    deleteTodoState: (todo: TodoI) => void;
    updateTodoState: (updatedTodo: TodoI) => void;
}

function TodoList( { data, deleteTodoState, updateTodoState }: TodoListProps) {

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
                        />
                    )
                })
            }
        </div>
    )
}

export default TodoList;