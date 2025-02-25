import { TodoUpdatesI } from "../types/todo";
import { useState, useEffect } from "react";

import { fetchTodoAPI } from "../api/todo-api";

import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import EditTodoPageBody from "../components/EditTodoPageBody";

import { useParams, useNavigate } from "react-router";

function EditTodoPage() {

    const params = useParams();
    const navigate = useNavigate();

    const [todoLoading, setTodoLoading] = useState(false);
    const [todoError, setTodoError] = useState("");

    const [previousTodo, setPreviousTodo] = useState<TodoUpdatesI>({ title: "", completed: false });
    const [todo, setTodo] = useState<TodoUpdatesI>({ title: "", completed: false });

    const setTodoTitleState = (value: string) => {
        setTodo(todo => ({ ...todo, title: value }));
    }

    const setTodoCompletedState = (value: boolean) => {
        setTodo(todo => ({ ...todo, completed: value }));
    }

    const clearForm = () => {
        setTodo({ title: "", completed: false });
    }

    const handleGoBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setTodoLoading(true);

        (
            async () => {
            
                try {

                    const todo = await fetchTodoAPI((params.todoId as string), signal);

                    if(todo === undefined) {
                        setTodoError("Something went wrong. Please try again later.");
                        setTodoLoading(false);
                    }

                    if(todo && todo.error) {
                        setTodoError(todo.message);
                        setTodoLoading(false);
                    }
        
                    if(todo && todo.id) {
            
                        setTodo({ title: todo.title, completed: todo.completed });
                        setPreviousTodo({ title: todo.title, completed: todo.completed });
                
                        setTodoError("");
                        setTodoLoading(false);

                    }
            
                } catch(err) {
            
                    console.error("fetchTodo", err);
            
                }
        
            }
        )();
    
        return () => {
            if(abortController) {
                abortController.abort("Unmount");
            }
        }
        
    }, [params.todoId]);

    return (
        <div className="edit-todo-page">
            <div className="todo-page__header">
                <div className="todo-page__header-actions">
                    <IconButton
                        aria-label="go back"
                        className="back-button"
                        onClick={handleGoBack}
                    >
                        <ArrowBackIcon className="back-icon" />
                    </IconButton>
                    <h1 className="todo-page__header-title">Edit Todo</h1>
                </div>
            </div>
            {
                todoLoading ? (
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        aria-label="Loading todo information"
                    >
                        <EditTodoPageBody
                            todoError={todoError}
                            previousTodo={previousTodo}
                            todo={todo}
                            clearForm={clearForm}
                            setTodoTitleState={setTodoTitleState}
                            setTodoCompletedState={setTodoCompletedState}
                        />
                    </Skeleton>
                ) : (
                    <EditTodoPageBody
                        todoError={todoError}
                        previousTodo={previousTodo}
                        todo={todo}
                        clearForm={clearForm}
                        setTodoTitleState={setTodoTitleState}
                        setTodoCompletedState={setTodoCompletedState}
                    />
                )
            }
        </div>
    )
}

export default EditTodoPage;
