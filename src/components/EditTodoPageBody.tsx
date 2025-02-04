import { useState } from "react";

import { css } from "@emotion/react";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import { TodoUpdatesI } from "../types/todo";

import { updateTodoAPI } from "../api/todo-api";

import { useParams, useNavigate } from "react-router";

interface EditTodoPageBodyProps {
    todoError: string;
    previousTodo: TodoUpdatesI;
    todo: TodoUpdatesI;
    setTodoErrorState: (value: string) => void;
    clearForm: () => void;
    setTodoTitleState: (value: string) => void;
    setTodoCompletedState: (value: boolean) => void;
}

function EditTodoPageBody({ todoError, previousTodo, todo, setTodoErrorState, clearForm, setTodoTitleState, setTodoCompletedState }: EditTodoPageBodyProps) {

    const params = useParams();
    const navigate = useNavigate();

    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateError, setUpdateError] = useState("");

    const [formDisabled, setFormDisabled] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);

    const formStyles = css`
        width: 300px;
        margin-bottom: 0.2rem;

        fieldset {
            border: 0;
            padding: 1rem;
        }
    `;

    const submitStyles = css`
        background-color: rgba(0, 0, 0, 1);
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        border: 1px solid transparent;
        color: #fff;
        border-radius: 5px;
        transition: background-color 0.25s;
        cursor: pointer;

        &:hover {
            background-color: rgba(0, 0, 0, 0.7);
        }

        &:active {
            outline: 2px solid #777777;
        }

        &:focus-visible {
            outline: 2px solid #777777;
        }

        &:disabled {
            background-color: #777777;
            border: 2px solid #777777;
            cursor: default;
        }
    `;

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateError("");
        setTodoTitleState(e.target.value);
    };

    const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateError("");
        setTodoCompletedState(e.target.checked);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setUpdateError("");

        if(todo && todo.title && todo.title.length < 5) {
            setUpdateError("Must be at least 5 characters.");
        } else {
            setUpdateLoading(true);
            setFormDisabled(true);
            setSubmitDisabled(true);
            
            const updates: TodoUpdatesI = {};

            if(todo.title !== previousTodo.title) {
                updates.title = todo.title;
            }

            if(todo.completed !== previousTodo.completed) {
                updates.completed = todo.completed;
            }

            (
                async () => {

                    try {

                        const updatedTodo = await updateTodoAPI((params.todoId as string), updates);
                        
                        if(updatedTodo) {
                            clearForm();
                            setUpdateLoading(false);
                            setFormDisabled(false);
                            setSubmitDisabled(false);

                            navigate("/", { state: "Todo updated successfully." });
                        }


                    } catch(e) {
                        console.error("updateTodo", e);

                        setUpdateError("Something Went Wrong.");
                        setUpdateLoading(false);
                        setFormDisabled(false);
                        setSubmitDisabled(false);
                    }

                }
            )();

        }

    }

    const handleAlertClose = () => {
        setTodoErrorState("");
    }

    return (
        <div className="edit-todo-page__body">
            {
                todoError ? (
                    <Alert severity="error" onClose={handleAlertClose}>
                        <AlertTitle>Error</AlertTitle>
                        {
                            todoError
                        }
                    </Alert>
                ) : (
                    <div className="form-container">
                        {
                            updateError && (
                                <Alert icon={false} severity="error">{updateError}</Alert>
                            )
                        }
                        <form
                            css={formStyles}
                            onSubmit={handleSubmit}
                        >
                            <fieldset disabled={formDisabled}>
                                <FormControl className="form-group">
                                    <TextField
                                        error={updateError ? true : false}
                                        label="Title"
                                        placeholder="Enter title..."
                                        onChange={handleTitleChange}
                                        value={todo.title}
                                        helperText={updateError}
                                        autoComplete="off"
                                        slotProps={
                                            {
                                                inputLabel: {
                                                    shrink: true
                                                }
                                            }
                                        }
                                        sx={{
                                            "&.MuiTextField-root": {
                                                width: "100%"
                                            },
                                            "& .MuiInputLabel-root": {
                                                position: "static",
                                                color: "#000",
                                                transform: "none",
                                                marginBottom: "6px"
                                            },
                                            "& .MuiInputLabel-root.Mui-focused": {
                                                color: "#000",
                                            },
                                            "& .MuiInputBase-input": {
                                                backgroundColor: "rgba(0, 0, 0, 0.05)",
                                                padding: "15px 20px",
                                                border: "1px solid transparent",
                                                color: "#000",
                                                borderRadius: "5px",
                                                height: "auto",
                                                font: "revert",
                                                "&::placeholder": {
                                                    color: "rgba(0, 0, 0, 0.5)",
                                                    opacity: "1"
                                                }
                                            },
                                            "& .MuiInputBase-input:focus-visible": {
                                                outline: "2px solid #777"
                                            },
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "0",
                                            },
                                            "& .Mui-focused.MuiInputBase-formControl": {
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    border: "0",  // Remove the focus outline border
                                                }
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormControl className="form-group">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                aria-label="mark complete"
                                                checked={todo.completed}
                                                onChange={handleCheckChange}
                                                className="todolist__item-status-cb"
                                                icon={<RadioButtonUncheckedIcon />}
                                                checkedIcon={<CheckCircleIcon />}
                                            />
                                        }
                                        label={todo.completed === true ? "Completed" : "Pending"}
                                    />
                                </FormControl>
                                <div className="form-group-centered">
                                    <input
                                        css={submitStyles}
                                        type="submit"
                                        value={updateLoading ? "Loading..." : "Update"}
                                        disabled={submitDisabled}
                                    />
                                </div>
                            </fieldset>
                        </form>
                    </div>
                )
            }
        </div>
    );
}

export default EditTodoPageBody;
