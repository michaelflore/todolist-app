import { useState } from "react";
import { TodoI } from "./TodoList";

interface InputFormProps {
    createNewTodo: (todo: TodoI) => void;
}

function InputForm({ createNewTodo }: InputFormProps) {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

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

            const newTodo = {
                id: window.crypto.randomUUID(),
                title: value,
                rating: 0,
                likes: 0
            };
    
            createNewTodo(newTodo);
    
            clearForm();
        }

    }

    const clearForm = () => {
        setValue("");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="Enter new todo" onChange={handleChange} value={value}/>

                <input type="submit" />
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