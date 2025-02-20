import { AppBar, Container, Toolbar, Typography } from "@mui/material";

function NavBar() {
    return (
        <AppBar
            position="static"
            color="primary"
            sx={{
                boxShadow: "0px 3px 3px -2px rgba(119, 119, 119, 0.11), 0px 3px 4px 0px rgba(119, 119, 119, 0.11), 0px 1px 8px 0px rgba(119, 119, 119, 0.11)"
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters={true}>
                    <Typography variant="h1" sx={{ fontSize: "2rem", fontWeight: "600", padding: "1rem 0" }}>
                        To-do List
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBar;