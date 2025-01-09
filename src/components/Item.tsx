interface Todo {
    id: number;
    title: string;
    rating: number;
}

interface ItemProps {
    todo: Todo;
    favorite: boolean | null;
    setFavoriteProp: (todo: Todo | null) => void;
}

function Item({ todo, favorite, setFavoriteProp } : ItemProps) {

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

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault();

        if(favorite) {
            setFavoriteProp(null);

        } else {
            setFavoriteProp(todo);
        }

    }

    return (
        <div className="item">
            <h2>{todo.title}</h2>
            <div>{output}</div>
            <button onClick={handleClick}>
                {
                    favorite ? (
                        <div>{"\u{1F499}"}</div>
                    ) : (
                        <div>{"\u{1F90D}"}</div>
                    )
                }
            </button>
        </div>
    )
}

export default Item;
