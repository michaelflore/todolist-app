import { useState } from "react";
import { TodoI } from "./TodoList";

interface InputFormProps {
    createNewTodo: (todo: TodoI) => void;
}

function InputForm({ createNewTodo }: InputFormProps) {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [submitDisabled, setSubmitDisabled] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

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

                        const response = await fetch("http://localhost:5000/todolist", {
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
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="Enter new todo" onChange={handleChange} value={value}/>

                <input type="submit" value={loading ? "Loading..." : "Add"} disabled={submitDisabled} />
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