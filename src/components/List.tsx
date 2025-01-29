import Item from "./Item";
import { TodoI } from "../types/todo";

interface ListProps {
    data: TodoI[];
    deleteTodo: (todo: TodoI) => void;
}

function List( { data, deleteTodo }: ListProps) {

    const deleteTodoState = (todo: TodoI) => {
        deleteTodo(todo);
    }

    return (
        <div className="todolist">
            {
                data.map((todo) => {
                    return (
                        <Item
                            key={todo.id}
                            todo={todo}
                            deleteTodoProp={deleteTodoState}
                        />
                    )
                })
            }
        </div>
    )
}

export default List;