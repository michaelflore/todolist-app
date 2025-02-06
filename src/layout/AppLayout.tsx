import { Outlet } from "react-router";
import Container from "@mui/material/Container";

function AppLayout() {

    return (
        <div className="todolist-app">
            <Container maxWidth="lg">
                <Outlet />
            </Container>
        </div>
    )
  }
  
  export default AppLayout;