
import { AppBar, Badge, Box, Button, IconButton, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout';
import { useProSidebar } from "react-pro-sidebar";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../App";
import Axios from 'axios';

function AppHeader() {
    const { user, setUser } = useContext(UserContext);
    // const navigate = useNavigate();
    // const location = useLocation();
    const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();

    return <AppBar position="sticky" sx={styles.appBar}>
        <Toolbar >
            <IconButton onClick={() => broken ? toggleSidebar() : collapseSidebar()} color="secondary">
                <MenuIcon />
            </IconButton>
            <Box
                component={'img'}
                sx={styles.appLogo}
                src="/src/assets/Logo.png" />
            <Box
                sx={{ flexGrow: 1 }} />
            <IconButton
            onClick={async () => {
                if (!user.loggedIn) return;
                try {
                // Clear the token from Axios headers
                sessionStorage.removeItem('token');
                delete Axios.defaults.headers.common['Authorization'];

                // Update the user state to indicate they are logged out
                const updatedUser = { loggedIn: false };
                sessionStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);

                // You can perform any additional actions needed for a successful logout
                } catch (error) {
                console.error('Error logging out:', error);
                }
            }}
            title="Sign Out"
            color="secondary"
            navigate to="/"
            >
            <LogoutIcon />
            </IconButton>

        </Toolbar>
    </AppBar>;
}

/** @type {import("@mui/material").SxProps} */
const styles = {
    appBar: {
        bgcolor: 'neutral.main'
    },
    appLogo: {
        borderRadius: 2,
        width: 250,
        marginLeft: 2,
        cursor: 'pointer'
    }
}

export default AppHeader;