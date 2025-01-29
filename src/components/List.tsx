import Item from "./Item";
import { TodoI } from "../types/todo";

interface ListProps {
    data: TodoI[];
    deleteTodoState: (todo: TodoI) => void;
    markTodoCompletedState: (todo: TodoI, value: boolean) => void;
}

function List( { data, deleteTodoState, markTodoCompletedState }: ListProps) {

    return (
        <div className="todolist">
            {
                data.map((todo) => {
                    return (
                        <Item
                            key={todo.id}
                            todo={todo}
                            deleteTodoState={deleteTodoState}
                            markTodoCompletedState={markTodoCompletedState}
                        />
                    )
                })
            }
        </div>
    )
}

export default List;