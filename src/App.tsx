import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import BarChart from "./components/BarChart";
// import ReducerExample from "./components/ReducerExample";
import List from "./components/List";
import FilterButtons from "./components/FilterButtons";
import InputForm from "./components/InputForm";

interface Todo {
  id: number;
  title: string;
  rating: number;
}

function App() {

  const myData = [
    {
      id: 1,
      title: "title 1",
      rating: 5
    },
    {
      id: 2,
      title: "title 2",
      rating: 1
    },
    {
      id: 3,
      title: "title 3",
      rating: 0.5
    },
    {
      id: 4,
      title: "title 4",
      rating: 3.5
    },
  ];

  const [todos, setTodos] = useState<Todo[]>(myData);

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <InputForm
        setTodos={setTodos}
      />
      <FilterButtons
        originalData={myData}
        setTodos={setTodos}
      />
      <List
        data={todos}
      />
      {/* <ReducerExample /> */}
      {/* <BarChart /> */}
    </>
  )
}

export default App;
