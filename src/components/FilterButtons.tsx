import { css } from "@emotion/react";

import { fetchTodosAPI } from "../api/todo-api";

import { filterStatusType, TodoI } from "../types/todo";

import FilterAltIcon from "@mui/icons-material/FilterAlt";

interface FilterButtonsProps {
    activeFilter: filterStatusType;
    setActiveFilterState: (filterTerm: filterStatusType) => void;
    setLoadingTodosState: (loading: boolean) => void;
    setTodosErrorState: (error: string) => void;
    setTodosState: (data: TodoI[]) => void;
    searchTerm: string;
}

function FilterButtons({ activeFilter, setActiveFilterState, setLoadingTodosState, setTodosErrorState, setTodosState, searchTerm }: FilterButtonsProps) {

    const buttonStyles = css`
        background-color: rgba(0, 0, 0, 0.02);
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        border: 1px solid transparent;
        color: #000;
        border-radius: 5px;
        transition: background-color 0.25s;
        cursor: pointer;

        &:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }

        &:active {
            outline: 2px solid #777777;
        }

        &:focus-visible {
            outline: 2px solid #777777;
        }
    `;

    const activeStyles = css`
        background-color: rgba(0, 0, 0, 0.09);
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        border: 1px solid transparent;
        color: #000;
        border-radius: 5px;
        transition: background-color 0.25s;
        cursor: pointer;

        &:hover {
            background-color: rgba(0, 0, 0, 0.05);
        }

        &:active {
            outline: 2px solid #777777;
        }

        &:focus-visible {
            outline: 2px solid #777777;
        }
    `;

    const handleClickAll = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setActiveFilterState("");

        (
            async () => {

                try {
        
                    setLoadingTodosState(true);
        
                    const todos = await fetchTodosAPI("", searchTerm, null);
            
                    if(todos && Array.isArray(todos)) {
            
                        setTodosState(todos);

                        setTodosErrorState("");
                        setLoadingTodosState(false);
                    
                    }
            
                } catch(e) {
            
                    console.error("fetchTodosAll", e);
            
                    setTodosErrorState("Something went wrong. Please try again.");
                    setLoadingTodosState(false);
            
                }
        
            }
        )();
    }

    const handleClickCompleted = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setActiveFilterState("completed");

        (
            async () => {

                try {
        
                    setLoadingTodosState(true);
        
                    const todos = await fetchTodosAPI("completed", searchTerm, null);
            
                    if(todos && Array.isArray(todos)) {
            
                        setTodosState(todos);

                        setTodosErrorState("");
                        setLoadingTodosState(false);
                    
                    }
            
                } catch(e) {
            
                    console.error("fetchTodosAll", e);
            
                    setTodosErrorState("Something went wrong. Please try again.");
                    setLoadingTodosState(false);
            
                }
        
            }
        )();
    }

    const handleClickPending = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setActiveFilterState("pending");

        (
            async () => {

                try {
        
                    setLoadingTodosState(true);
        
                    const todos = await fetchTodosAPI("pending", searchTerm, null);
            
                    if(todos && Array.isArray(todos)) {
            
                        setTodosState(todos);

                        setTodosErrorState("");
                        setLoadingTodosState(false);
                    
                    }
            
                } catch(e) {
            
                    console.error("fetchTodosAll", e);
            
                    setTodosErrorState("Something went wrong. Please try again.");
                    setLoadingTodosState(false);
            
                }
        
            }
        )();
    }

    return (
        <div className="filter-buttons">
            <div className="filter-buttons__info">
                <FilterAltIcon />
            </div>
            <button
                css={activeFilter === "" ? activeStyles : buttonStyles}
                onClick={handleClickAll}
            >
                All
            </button>
            <button
                css={activeFilter === "completed" ? activeStyles : buttonStyles}
                onClick={handleClickCompleted}
            >
                Completed
            </button>
            <button
                css={activeFilter === "pending" ? activeStyles : buttonStyles}
                onClick={handleClickPending}
            >
                Pending
            </button>
        </div>
    )
}

export default FilterButtons;
