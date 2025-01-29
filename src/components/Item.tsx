import { css } from "@emotion/react";
import { TodoI } from "../types/todo";
import { useState } from "react";

import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";

import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

interface ItemProps {
    todo: TodoI;
    deleteTodoState: (todo: TodoI) => void;
    markTodoCompletedState: (todo: TodoI, value: boolean) => void;
}

function Item({ todo, deleteTodoState, markTodoCompletedState } : ItemProps) {

    const deleteTodoButtonStyles = css`
        background-color: rgba(0, 0, 0, 0.02);
        border: 1px solid transparent;
        color: #000;
        border-radius: 2px;
        transition: background-color 0.25s;
        cursor: pointer;
        width: 40px;
        height: 40px;

        &:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }

        &:active {
            outline: 2px solid #777777;
        }

        &:focus-visible {
            outline: 2px solid #777777;
        }
    `;

    const todoTitleStyles = css`
        text-decoration: ${todo.completed === true ? 'line-through' : 'none'}
    `;

    const [open, setOpen] = useState(false);
    const [completed, setCompleted] = useState(false);

    const confirmDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        deleteTodoState(todo);
    }

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setOpen(true);
    }

    const handleCloseModal = () => {
        setOpen(false);
    }

    const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompleted(e.target.checked);

        markTodoCompletedState(todo, e.target.checked);
    }

    return (
        <div className="todolist__item">
            <div className="todolist__item-status">
                <Checkbox
                    aria-label="mark complete"
                    checked={completed}
                    onChange={handleCheckChange}
                    className="todolist__item-status-cb"
                />
            </div>
            <div className="todolist__item-details">
                <h2 css={todoTitleStyles}>{todo.title}</h2>
            </div>
            <div className="todolist__item-actions">
                <button
                    css={deleteTodoButtonStyles}
                    onClick={handleDeleteClick}
                >
                    <DeleteIcon className="trash-icon" />
                </button>
            </div>
            <Modal
                open={open}
                onClose={handleCloseModal}
            >
                <Box className="delete-modal__content">
                    <Box className="delete-modal__content-heading">
                        <Typography variant="h4" className="delete-modal__content-confirm">
                            Confirm
                        </Typography>
                        <IconButton
                            aria-label="close modal"
                            onClick={handleCloseModal}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Typography className="delete-modal__content-message">
                        Are you sure you want to delete this todo?
                    </Typography>
                    <Box className="delete-modal__actions">
                        <Button
                            variant="outlined"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            className="delete-modal__actions-yes"
                            onClick={confirmDeleteClick}
                        >
                            Yes
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default Item;
