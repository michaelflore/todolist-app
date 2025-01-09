import { useState } from "react";
import Item from "./Item";

interface Todo {
    id: number;
    title: string;
    rating: number;
}

interface ListProps {
    data: Todo[];
}

function List( { data }: ListProps) {
    const [favorite, setFavorite] = useState<Todo | null>(null);

    const setFavoriteState = (todo: Todo | null) => {
        setFavorite(todo);
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
                        />
                    )
                })
            }
        </div>
    )
}

export default List;