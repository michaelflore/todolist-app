import { css } from "@emotion/react";
import { TodoI } from "../types/todo";

interface ItemProps {
    todo: TodoI;
    deleteTodoProp: (todo: TodoI) => void;
}

const deleteTodoButtonStyles = css`
    background-color: rgba(0, 0, 0, 0.02);
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    border: 1px solid transparent;
    color: #000;
    border-radius: 5px;
    transition: background-color 0.25s;
    cursor: pointer;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    &:focus {
        outline: 2px solid #777777;
    }

    &:focus-visible {
        outline: 2px solid #777777;
    }
`;

function Item({ todo, deleteTodoProp } : ItemProps) {

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        deleteTodoProp(todo);
    }

    return (
        <div className="todolist__item">
            <div className="todolist__item-details">
                <h2>{todo.title}</h2>
            </div>
            <div className="todolist__item-actions">
                <button
                    css={deleteTodoButtonStyles}
                    onClick={handleDeleteClick}
                >
                    X
                </button>
            </div>
        </div>
    )
}

export default Item;
