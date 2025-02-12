import { Outlet } from "react-router";
import Container from "@mui/material/Container";
import Header from "../components/Header";

function AppLayout() {

    return (
        <div className="todolist-app">
            <Header />
            <Container maxWidth="lg">
                <Outlet />
            </Container>
        </div>
    )
  }
  
  export default AppLayout;