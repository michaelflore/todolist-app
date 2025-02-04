import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";

import './index.css';
import App from './App.tsx';
import EditTodoPage from "./components/EditTodoPage";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/edit/:todoId" element={<EditTodoPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
