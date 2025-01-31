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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { deleteTodoAPI, updateTodoAPI } from "../api/todo-api";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

interface ItemProps {
    todo: TodoI;
    deleteTodoState: (todo: TodoI) => void;
    updateTodoState: (updatedTodo: TodoI) => void;
    setLoadingTodosState: (loading: boolean) => void;
}

function Item({ todo, deleteTodoState, updateTodoState } : ItemProps) {

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

        &:disabled {
            cursor: default;

            .trash-icon {
                color: #777777;
            }
        }
    `;

    const todoTitleStyles = css`
        margin: 0;
        text-decoration: ${todo.completed === true ? 'line-through' : 'none'};
    `;

    const [open, setOpen] = useState(false);

    const [editLoading, setEditLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [deleteBtnDisabled, setDeleteButtonDisabled] = useState(false);
    const [checkboxDisabled, setCheckboxDisabled] = useState(false);

    const [error, setError] = useState("");

    const confirmDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setOpen(false);

        (
            async () => {

                try {

                    setDeleteLoading(true);
                    setCheckboxDisabled(true);

                    const deletedTodo = await deleteTodoAPI(todo.id);

                    if(deletedTodo) {
                        deleteTodoState(deletedTodo);

                        setError("");
                        setDeleteLoading(false);
                        setCheckboxDisabled(false);
                    }


                } catch(e) {
                    console.error("deleteTodo", e);

                    setError("Something went wrong. Please try again.");
                    setDeleteLoading(false);
                    setCheckboxDisabled(false);
                }

            }
        )();

    }

    const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setOpen(true);
    }

    const handleCloseModal = () => {
        setOpen(false);
    }

    const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        (
            async () => {

                try {

                    setEditLoading(true);
                    setDeleteButtonDisabled(true);

                    const updatedTodo = await updateTodoAPI(todo.id, { completed: e.target.checked });

                    if(updatedTodo) {

                        updateTodoState(updatedTodo);

                        setError("");
                        setEditLoading(false);
                        setDeleteButtonDisabled(false);
                    }



                } catch(e) {

                    console.error("updateTodo", e);

                    setError("Something went wrong. Please try again.")
                    setEditLoading(false);
                    setDeleteButtonDisabled(false);

                }

            }
        )();

    }

    return (
        <div className="todolist__item">
            <div className="todolist__item-status">
                {
                    editLoading ? (
                        <CircularProgress
                            size="24px"
                            color="inherit"
                        />
                    ) : (
                        <Checkbox
                            aria-label="mark complete"
                            checked={todo.completed}
                            onChange={handleCheckChange}
                            className="todolist__item-status-cb"
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleIcon />}
                            disabled={checkboxDisabled}
                        />
                    )
                }
            </div>
            <div className="todolist__item-details">
                {
                    error && (
                        <Alert icon={false} severity="error">{error}</Alert>
                    )
                }
                <h2 css={todoTitleStyles}>{todo.title}</h2>
            </div>
            <div className="todolist__item-actions">
                {
                    deleteLoading ? (
                        <CircularProgress
                            size="24px"
                            color="inherit"
                        />
                    ) : (
                        <button
                            css={deleteTodoButtonStyles}
                            onClick={handleDeleteClick}
                            disabled={deleteBtnDisabled}
                        >
                            <DeleteIcon className="trash-icon" />
                        </button>
                    )
                }
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
