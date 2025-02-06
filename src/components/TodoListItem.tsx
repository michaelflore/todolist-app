import { css } from "@emotion/react";
import { TodoI } from "../types/todo";
import { useState } from "react";

import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import { deleteTodoAPI, updateTodoAPI } from "../api/todo-api";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import { Link } from "react-router";

interface TodoListItemProps {
    todo: TodoI;
    deleteTodoState: (todo: TodoI) => void;
    updateTodoState: (updatedTodo: TodoI) => void;
    setLoadingTodosState: (loading: boolean) => void;
}

function TodoListItem({ todo, deleteTodoState, updateTodoState } : TodoListItemProps) {

    const actionButtonStyles = css`
        background-color: rgba(0, 0, 0, 0.02);
        border: 1px solid transparent;
        color: #000;
        border-radius: 2px;
        transition: background-color 0.25s;
        cursor: pointer;
        width: 40px;
        height: 40px;

        &.edit-todo-link.disabled {
            .edit-icon {
                color: #777777;
            }
        }

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

    const [editLinkDisabled, setEditLinkDisabled] = useState(false);
    const [deleteBtnDisabled, setDeleteButtonDisabled] = useState(false);
    const [checkboxDisabled, setCheckboxDisabled] = useState(false);

    const [itemError, setItemError] = useState("");

    const confirmDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setOpen(false);

        (
            async () => {

                try {

                    setDeleteLoading(true);
                    setCheckboxDisabled(true);

                    const deletedTodo = await deleteTodoAPI(todo.id);

                    if(deletedTodo === undefined) {
                        throw new Error();
                    }

                    if(deletedTodo && deletedTodo.error) {
                        setItemError(deletedTodo.message);
                        setDeleteLoading(false);
                        setCheckboxDisabled(false);
                    }

                    if(deletedTodo && deletedTodo.id) {
                        deleteTodoState(deletedTodo);

                        setItemError("");
                        setDeleteLoading(false);
                        setCheckboxDisabled(false);
                    }


                } catch(err) {
                    console.error("deleteTodo", err);

                    if(err instanceof Error) {
                        setItemError("Something went wrong. Please try again later.");
                        setDeleteLoading(false);
                        setCheckboxDisabled(false);
                    }
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
                    setEditLinkDisabled(true);
                    setDeleteButtonDisabled(true);

                    const updatedTodo = await updateTodoAPI(todo.id, { completed: e.target.checked });

                    if(updatedTodo === undefined) {
                        throw new Error();
                    }

                    if(updatedTodo && updatedTodo.error) {
                        setItemError(updatedTodo.message);
                        setEditLoading(false);
                        setEditLinkDisabled(false);
                        setDeleteButtonDisabled(false);
                    }

                    if(updatedTodo && updatedTodo.id) {

                        updateTodoState(updatedTodo);

                        setItemError("");
                        setEditLoading(false);
                        setEditLinkDisabled(false);
                        setDeleteButtonDisabled(false);
                    }


                } catch(err) {
                    console.error("updateTodo", err);

                    if(err instanceof Error) {
                        setItemError("Something went wrong. Please try again later.");
                        setEditLoading(false);
                        setEditLinkDisabled(false);
                        setDeleteButtonDisabled(false);
                    }

                }

            }
        )();

    }

    const handleCloseItemError = () => {
        setItemError("");
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
                    itemError && (
                        <Alert icon={false} severity="error" onClose={handleCloseItemError}>{itemError}</Alert>
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
                        <>
                            <Link
                                css={actionButtonStyles}
                                to={editLinkDisabled ? "" : "/edit/" + todo.id}
                                className={editLinkDisabled ? "edit-todo-link disabled" : "edit-todo-link"}
                            >
                                <EditIcon className="edit-icon" />
                            </Link>
                            <button
                                css={actionButtonStyles}
                                onClick={handleDeleteClick}
                                disabled={deleteBtnDisabled}
                            >
                                <DeleteIcon className="trash-icon" />
                            </button>
                        </>
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

export default TodoListItem;
