import { useReducer } from "react";

function ReducerExample() {

    interface State {
        count: number
    }

    type ActionType = {
        type: "add" | "subtract"
    }

    const initialState = {
        count: 0
    }

    function myReducer(state: State, action: ActionType) {
        switch(action.type) {
            case "add":

                return {
                    count: state.count + 1
                };

            case "subtract":

                return {
                    count: state.count - 1
                };

            default:
                return initialState;
        }
    }

    const [state, dispatch] = useReducer(myReducer, initialState);

    const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        dispatch({ type: "add" });
    }

    const handleSubtract = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        dispatch({ type: "subtract" });
    }

    return (
        <div>
            <h2>useReducer hook</h2>
            <p>{state.count}</p>
            <button onClick={handleAdd}>Add</button>
            <button onClick={handleSubtract}>Subtract</button>
        </div>
    )
}

export default ReducerExample;
