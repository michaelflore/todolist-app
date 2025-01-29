import { useState, useRef } from "react";
import { fetchTodosAPI } from "../api/todo-api";
import { TodoI } from "../types/todo";

import { css } from "@emotion/react";

interface SearchFormProps {
    setLoadingTodos: (loading: boolean) => void;
    setTodosErrorState: (error: string) => void;
    setTodosState: (data: TodoI[]) => void;
}

const inputStyles = css`
  background-color: rgba(0, 0, 0, 0.05);
  width: 18rem;
  padding: 1rem;
  border: 1px solid transparent;
  color: #000;
  border-radius: 30px;

  &:focus-visible {
    outline-color: #777;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

export function SearchForm({ setLoadingTodos, setTodosErrorState, setTodosState }: SearchFormProps) {

    const [searchTerm, setSearchTerm] = useState("");

    const searchDebouncer = useRef<number | null>();
    const abortControllerSearch = useRef<AbortController | null>();

    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    
        if(searchDebouncer.current) {
          clearTimeout(searchDebouncer.current);
        }
    
        if(abortControllerSearch.current) {
          abortControllerSearch.current.abort("Canceled");
        }
    
        searchDebouncer.current = window.setTimeout(() => {
    
          const abortController = new AbortController();
          abortControllerSearch.current = abortController;
          
          const fetchTodos = async () => {
            
            try {
    
              setLoadingTodos(true);
    
              const data = await fetchTodosAPI(e.target.value, abortController.signal);
      
              if(data && Array.isArray(data)) {
      
                setTodosState(data);

                setTodosErrorState("");
                setLoadingTodos(false);
                
              }
      
            } catch(err) {
      
              console.error("fetchTodos", err);
      
              setTodosErrorState("Something went wrong. Please try again.");
              setLoadingTodos(false);
      
            }
      
          }
    
          fetchTodos();
        }, 500);
      }

    return (
        <input
            css={inputStyles}
            type="text"
            placeholder="Search todo..."
            value={searchTerm}
            onChange={handleSearchTermChange}
        />
    )
}

export default SearchForm;
