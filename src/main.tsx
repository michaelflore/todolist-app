import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";

import AppLayout from "./layout/AppLayout";

import HomePage from "./pages/HomePage";
import AddTodoPage from "./pages/AddTodoPage";
import EditTodoPage from "./pages/EditTodoPage";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Global, css } from "@emotion/react";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', serif"
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Global
      styles={css`
        * {
          font-family: "Poppins", serif;
        }
      `}
    />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddTodoPage />} />
            <Route path="/edit/:todoId" element={<EditTodoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
