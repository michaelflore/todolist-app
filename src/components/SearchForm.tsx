import { useRef } from "react";

import { fetchTodosAPI } from "../api/todo-api";
import { filterStatusType, TodoI } from "../types/todo";

import { css } from "@emotion/react";

interface SearchFormProps {
  activeFilter: filterStatusType;
  setLoadingTodosState: (loading: boolean) => void;
  setTodosErrorState: (error: string) => void;
  setTodosState: (data: TodoI[]) => void;
  searchTerm: string;
  setSearchTermState:(value: string) => void;
}

export function SearchForm({ activeFilter, setLoadingTodosState, setTodosErrorState, setTodosState, searchTerm, setSearchTermState }: SearchFormProps) {

  const searchDebouncer = useRef<number | null>();
  const abortControllerSearch = useRef<AbortController | null>();

  const inputStyles = css`
    background-color: rgba(0, 0, 0, 0.05);
    width: 18rem;
    padding: 15px 25px;
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

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermState(e.target.value);

    if(searchDebouncer.current) {
      clearTimeout(searchDebouncer.current);
    }

    if(abortControllerSearch.current) {
      abortControllerSearch.current.abort("Canceled");
    }

    searchDebouncer.current = window.setTimeout(() => {

      const abortController = new AbortController();
      abortControllerSearch.current = abortController;
      
      (
        async () => {

          try {
  
            setLoadingTodosState(true);
  
            const todos = await fetchTodosAPI(activeFilter, e.target.value, abortController.signal);
    
            if(todos && Array.isArray(todos)) {
    
              setTodosState(todos);

              setTodosErrorState("");
              setLoadingTodosState(false);
              
            }
    
          } catch(e) {
    
            console.error("fetchTodosSearch", e);
    
            setTodosErrorState("Something went wrong. Please try again.");
            setLoadingTodosState(false);
    
          }
    
        }
      )();

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
