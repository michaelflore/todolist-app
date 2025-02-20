import { Outlet } from "react-router";
import Container from "@mui/material/Container";
import NavBar from "./Navbar";

function AppLayout() {

    return (
        <div className="todolist-app">
            <NavBar />
            <Container maxWidth="lg">
                <Outlet />
            </Container>
        </div>
    )
  }
  
  export default AppLayout;