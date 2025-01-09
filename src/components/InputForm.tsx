import { useState } from "react";

interface Todo {
    id: number;
    title: string;
    rating: number;
}

interface InputFormProps {
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

function InputForm({ setTodos }: InputFormProps) {
    const [value, setValue] = useState("");

    const createNewTodo = () => {
        const newTodo = {
            id: Math.floor(Math.random() * 100) + 1,
            title: value,
            rating: 0
        };

        setTodos(state => [newTodo, ...state]);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        createNewTodo();

        clearForm();
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
        </div>
    );
}

export default InputForm;