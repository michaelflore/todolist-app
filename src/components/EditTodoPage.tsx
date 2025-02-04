import { TodoUpdatesI } from "../types/todo";
import { useState, useEffect } from "react";

import { fetchTodoAPI, updateTodoAPI } from "../api/todo-api";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import { css } from "@emotion/react";

import { useParams, useNavigate } from "react-router";

function EditTodoPage() {

    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [todoError, setTodoError] = useState("");

    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateError, setUpdateError] = useState("");

    const [previousTodo, setPreviousTodo] = useState<TodoUpdatesI>({ title: "", completed: false });
    const [todo, setTodo] = useState<TodoUpdatesI>({ title: "", completed: false });

    const [formDisabled, setFormDisabled] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);

    const formStyles = css`
        margin-bottom: 0.2rem;

        fieldset {
            border: 0;
            padding: 1rem;
        }
    `;

    const submitStyles = css`
        background-color: #000;
        padding: 0.5rem 1rem;
        border: 2px solid #000;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;

        &:disabled {
            background-color: #777777;
            border: 2px solid #777777;
            cursor: default;
        }
    `;

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateError("");
        setTodo(todo => ({ ...todo, title: e.target.value }));
    };

    const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateError("");
        setTodo(todo => ({ ...todo, completed: e.target.checked }));
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

                        setUpdateError("Something Went Wrong");
                        setUpdateLoading(false);
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

    const handleAlertClose = () => {
        setTodoError("");
    }

    const handleGoBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
    
        (
            async () => {
            
            try {
        
                setLoading(true);
        
                const todo = await fetchTodoAPI((params.todoId as string), signal);
    
                if(todo && todo.id) {
        
                    setTodo({ title: todo.title, completed: todo.completed });
                    setPreviousTodo({ title: todo.title, completed: todo.completed });
            
                    setTodoError("");
                    setLoading(false);
        
                }
        
            } catch(err) {
        
                console.error("fetchTodo", err);
        
                setTodoError("Something went wrong. Please try again.");
                setLoading(false);
        
            }
        
            }
        )();
    
        return () => {
            abortController.abort("Mounted");
        }
        
    }, [params.todoId]);

    return (
        <div className="edit-todo-page">
            <div className="edit-todo-page__header">
                <IconButton
                    aria-label="go back"
                    onClick={handleGoBack}
                >
                    <ArrowBackIcon className="back-icon" />
                </IconButton>
                <h1 className="edit-todo-page__header-title">Edit Todo</h1>
            </div>
            {
                loading ? (
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                    >
                        <div>Loading</div>
                    </Skeleton>
                ) : (
                    <div>
                        {
                            todoError ? (
                                <Alert severity="error" onClose={handleAlertClose}>
                                    <AlertTitle>Error</AlertTitle>
                                    {
                                        todoError
                                    }
                                </Alert>
                            ) : (
                                <div>
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
                                                    sx={{
                                                        "& .MuiInputLabel-root": {
                                                            position: "static",
                                                            transform: "none"
                                                        },
                                                        '& .MuiInputBase-input': {
                                                            backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                                            padding: '0.5rem 1rem',
                                                            border: '2px solid #000',
                                                            color: '#000',
                                                            borderRadius: '5px',
                                                            height: 'auto',
                                                            font: "revert",
                                                            '&::placeholder': {
                                                            color: 'rgba(0, 0, 0, 0.5)',
                                                            },
                                                        },
                                                        "& .MuiOutlinedInput-notchedOutline": {
                                                            border: '0'
                                                        },
                                                        "& .Mui-focused.MuiInputBase-formControl": {
                                                            '& .MuiOutlinedInput-notchedOutline': {
                                                                border: '0',  // Remove the focus outline border
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
                )
            }
        </div>
    )
}

export default EditTodoPage;
