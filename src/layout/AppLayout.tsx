import { Outlet } from "react-router";

function AppLayout() {

    return (
        <div className="todolist-app">
            <div className="container">
                <Outlet />
            </div>
        </div>
    )
  }
  
  export default AppLayout;