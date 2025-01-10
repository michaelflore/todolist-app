import { TodoI } from "./TodoList";

interface ItemProps {
    todo: TodoI;
    favorite: boolean | null;
    setFavoriteProp: (todo: TodoI | null) => void;
    deleteTodoProp: (todo: TodoI) => void;
    likeTodoProp: (todo: TodoI) => void;
}

function Item({ todo, favorite, setFavoriteProp, deleteTodoProp, likeTodoProp } : ItemProps) {

    let output = "";

    for(let i = 0; i < 5; i++) {

        if ((todo.rating % 1) != 0 && i === Math.floor(todo.rating)) {
            output += "\u2728";
        } else if (i < todo.rating) {
            output += "\u2B50";
        } else {
            output += "\u2729";
        }
    }

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault();

        if(favorite) {
            setFavoriteProp(null);

        } else {
            setFavoriteProp(todo);
        }

    }

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        deleteTodoProp(todo);
    }

    const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        likeTodoProp(todo);
    }

    return (
        <div className="item">
            <h2>{todo.title}</h2>
            <p>Likes: {todo.likes}</p>
            <div>{output}</div>
            <button onClick={handleFavoriteClick}>
                {
                    favorite ? (
                        <div>{"\u{1F499}"}</div>
                    ) : (
                        <div>{"\u{1F90D}"}</div>
                    )
                }
            </button>
            <button onClick={handleLikeClick}>{"\u{1F44D}"}</button>
            <button onClick={handleDeleteClick}>X</button>
        </div>
    )
}

export default Item;
