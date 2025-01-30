import Item from "./Item";
import { TodoI } from "../types/todo";

interface ListProps {
    data: TodoI[];
    deleteTodoState: (todo: TodoI) => void;
    updateTodoState: (updatedTodo: TodoI) => void;
    setLoadingTodosState: (loading: boolean) => void;
}

function List( { data, deleteTodoState, updateTodoState, setLoadingTodosState }: ListProps) {

    return (
        <div className="todolist">
            {
                data.map((todo) => {
                    return (
                        <Item
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

export default List;