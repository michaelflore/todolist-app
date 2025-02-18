import { useRef } from "react";

import { fetchTodosAPI } from "../api/todo-api";
import { filterStatusType, TodoI } from "../types/todo";

import { css } from "@emotion/react";

interface SearchFormProps {
  activeFilter: filterStatusType;
  setLoadingTodosState: (loading: boolean) => void;
  setTodosErrorState: (error: { type: string; message: string; }) => void;
  setTodosState: (data: TodoI[]) => void;
  searchTerm: string;
  setSearchTermState:(value: string) => void;
}

export function SearchForm({ activeFilter, setLoadingTodosState, setTodosErrorState, setTodosState, searchTerm, setSearchTermState }: SearchFormProps) {

  const searchDebouncer = useRef<number | undefined>();
  const abortControllerSearch = useRef<AbortController | undefined>();

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

    if(searchDebouncer.current !== undefined) {
      clearTimeout(searchDebouncer.current);
    }

    if(abortControllerSearch.current !== undefined) {
      abortControllerSearch.current.abort("Canceled");
    }

    searchDebouncer.current = window.setTimeout(() => {

      const abortController = new AbortController();
      abortControllerSearch.current = abortController;
      
      setLoadingTodosState(true);

      (
        async () => {

          try {

            const todos = await fetchTodosAPI(activeFilter, e.target.value, abortController.signal);

            //api route not found
            if(todos === undefined) {
              throw new Error();
            }

            // if(todos && todos.error) {
            //   setTodosError(todos.message);
            //   setLoading(false);
            // }
    
            if(todos && Array.isArray(todos)) {
  
              setTodosState(todos);

              setTodosErrorState({ type: "", message: "" });
              setLoadingTodosState(false);
              
            }
    
          } catch(err) {
    
            // console.error("fetchTodosSearch", err);
    
            if(err instanceof Error) {
              setTodosErrorState({ type: "search", message: "Something went wrong. Please try again later."});
              setLoadingTodosState(false);
            }
    
          }
    
        }
      )();

    }, 500);
  }

  return (
    <input
      css={inputStyles}
      type="text"
      placeholder="Search todos..."
      value={searchTerm}
      onChange={handleSearchTermChange}
      aria-label="search todos"
    />
  )
}

export default SearchForm;
