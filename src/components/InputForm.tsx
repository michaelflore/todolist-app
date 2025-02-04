import { useState } from "react";

import { TodoI } from "../types/todo";

import { css } from "@emotion/react";

import TextField from "@mui/material/TextField";

import { addTodoAPI } from "../api/todo-api";

interface InputFormProps {
    addNewTodoState: (todo: TodoI) => void;
}

function InputForm({ addNewTodoState }: InputFormProps) {

    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [submitDisabled, setSubmitDisabled] = useState(false);

    const formStyles = css`
        margin-bottom: 0.2rem;
    `;

    const submitStyles = css`
        background-color: #000;
        padding: 0.5rem 1rem;
        border: 2px solid #000;
        color: #fff;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        cursor: pointer;

        &:disabled {
            background-color: #777777;
            border: 2px solid #777777;
            cursor: default;
        }
    `;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        setValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");

        if(value.length < 5) {
            setError("Must be at least 5 characters.");
        } else {
            setLoading(true);
            setSubmitDisabled(true);
           
            const newTodo = {
                id: window.crypto.randomUUID(), 
                title: value,
                completed: false
            };

            (
                async () => {

                    try {

                        const data = await addTodoAPI(newTodo);
                        
                        if(data) {
                            clearForm();
                            setLoading(false);
                            setSubmitDisabled(false);
                            addNewTodoState(data);
                        }

    

                    } catch(e) {
                        console.error("addTodo", e);

                        setError("Something Went Wrong");
                        setLoading(false);
                        setSubmitDisabled(false);
                    }

                }
            )();

        }

    }

    const clearForm = () => {
        setValue("");
    }

    return (
        <div className="new-todo">
            <form
                css={formStyles}
                onSubmit={handleSubmit}
            >

                <TextField
                    error={error ? true : false}
                    placeholder="Enter new todo..."
                    onChange={handleChange}
                    value={value}
                    helperText={error}
                    autoComplete="off"
                    sx={{
                        '& .MuiInputBase-input': {
                          backgroundColor: 'rgba(0, 0, 0, 0.02)',
                          padding: '0.5rem 1rem',
                          border: '2px solid #000',
                          color: '#000',
                          borderTopLeftRadius: '5px',
                          borderBottomLeftRadius: '5px',
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

                <input
                    css={submitStyles}
                    type="submit"
                    value={loading ? "Loading..." : "Add"}
                    disabled={submitDisabled}
                />
            </form>
        </div>
    );
}

export default InputForm;