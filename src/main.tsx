import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";

import './index.css';

import App from './App';
import AppLayout from "./layout/AppLayout";
import AddTodoPage from "./components/AddTodoPage";
import EditTodoPage from "./components/EditTodoPage";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/add" element={<AddTodoPage />} />
          <Route path="/edit/:todoId" element={<EditTodoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
