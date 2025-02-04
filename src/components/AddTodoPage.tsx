import { useState } from "react";

import { css } from "@emotion/react";

import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { TodoAddI } from "../types/todo";

import { addTodoAPI } from "../api/todo-api";

import { useNavigate } from "react-router";

function AddTodoPage() {

    const navigate = useNavigate();

    const [addLoading, setAddLoading] = useState(false);
    const [addError, setAddError] = useState("");

    const [todo, setTodo] = useState<TodoAddI>({ title: "", completed: false });

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
        setAddError("");
        setTodo(todo => ({ ...todo, title: e.target.value }));
    };

    const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddError("");
        setTodo(todo => ({ ...todo, completed: e.target.checked }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setAddError("");

        if(todo && todo.title && todo.title.length < 5) {
            setAddError("Must be at least 5 characters.");
        } else {
            setAddLoading(true);
            setFormDisabled(true);
            setSubmitDisabled(true);
            
            const newTodo: TodoAddI = {
                title: todo.title,
                completed: todo.completed
            };

            (
                async () => {

                    try {

                        const addedTodo = await addTodoAPI(newTodo);
                        
                        if(addedTodo) {
                            clearForm();
                            setAddLoading(false);
                            setFormDisabled(false);
                            setSubmitDisabled(false);

                            navigate("/", { state: "Todo added successfully." });
                        }

                    } catch(e) {
                        console.error("addTodo", e);

                        setAddError("Something Went Wrong.");
                        setAddLoading(false);
                        setFormDisabled(false);
                        setSubmitDisabled(false);
                    }

                }
            )();

        }

    }

    const clearForm = () => {
        setTodo({ title: "", completed: false });
    }

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <div className="add-todo-page">
            <div className="add-todo-page__header">
                <div className="add-todo-page__header-actions">
                    <IconButton
                        aria-label="go back"
                        className="back-button"
                        onClick={handleGoBack}
                    >
                        <ArrowBackIcon className="back-icon" />
                    </IconButton>
                    <h1 className="add-todo-page__header-title">Add Todo</h1>
                </div>
            </div>
            <div className="add-todo-page__body">
                <div className="form-container">
                    {
                        addError && (
                            <Alert icon={false} severity="error">{addError}</Alert>
                        )
                    }
                    <form
                        css={formStyles}
                        onSubmit={handleSubmit}
                    >
                        <fieldset disabled={formDisabled}>
                            <FormControl className="form-group">
                                <TextField
                                    error={addError ? true : false}
                                    label="Title"
                                    placeholder="Enter title..."
                                    onChange={handleTitleChange}
                                    value={todo.title}
                                    helperText={addError}
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
                                    value={addLoading ? "Loading..." : "Add"}
                                    disabled={submitDisabled}
                                />
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddTodoPage;
