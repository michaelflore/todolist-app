import { useState } from "react";
import Item from "./Item";
import { TodoI } from "./TodoList";

interface ListProps {
    data: TodoI[];
    deleteTodo: (todo: TodoI) => void;
    likeTodo: (todo: TodoI) => void;
}

function List( { data, deleteTodo, likeTodo }: ListProps) {
    const [favorite, setFavorite] = useState<TodoI | null>(null);

    const setFavoriteState = (todo: TodoI | null) => {
        setFavorite(todo);
    }

    const deleteTodoState = (todo: TodoI) => {
        deleteTodo(todo);
    }

    const likeTodoState = (todo: TodoI) => {
        likeTodo(todo);
    }

    return (
        <div className="list">
            {
                data.map((todo) => {
                    return (
                        <Item
                            key={todo.id}
                            todo={todo}
                            favorite={favorite && favorite.id === todo.id}
                            setFavoriteProp={setFavoriteState}
                            deleteTodoProp={deleteTodoState}
                            likeTodoProp={likeTodoState}
                        />
                    )
                })
            }
        </div>
    )
}

export default List;