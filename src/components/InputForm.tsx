import { useState } from "react";
import { TodoI } from "../types/todo";
import { css } from "@emotion/react";

interface InputFormProps {
    createNewTodo: (todo: TodoI) => void;
}

const formStyles = css`
    margin-bottom: 0.2rem;
`;

const inputStyles = css`
    background-color: rgba(0, 0, 0, 0.02);
    padding: 0.5rem 1rem;
    border: 2px solid #000;
    color: #000;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;

    &::placeholder {
      color: rgba(0, 0, 0, 0.5);
    }
`;

const submitStyles = css`
    background-color: #000;
    padding: 0.5rem 1rem;
    border: 2px solid #000;
    color: #fff;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    cursor: pointer;
`;

function InputForm({ createNewTodo }: InputFormProps) {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [submitDisabled, setSubmitDisabled] = useState(false);

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
                rating: 0,
                likes: 0
            };

            (
                async () => {

                    try {

                        const response = await fetch("/api/todolist", {
                            method: "POST",
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(newTodo)
                        });
                    
                        const data = await response.json();

                        createNewTodo(data);
    
                        clearForm();
                        setLoading(false);
                        setSubmitDisabled(false);

                    } catch(e) {
                        console.error(e);

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
                <input
                    css={inputStyles}
                    placeholder="Enter new todo..."
                    onChange={handleChange}
                    value={value}
                />

                <input
                    css={submitStyles}
                    type="submit"
                    value={loading ? "Loading..." : "Add"}
                    disabled={submitDisabled}
                />
            </form>
            {
                error && (
                    <p>{error}</p>
                )
            }
        </div>
    );
}

export default InputForm;