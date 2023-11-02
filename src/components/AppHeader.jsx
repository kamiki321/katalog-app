
import { 
    AppBar, 
    Box, 
    IconButton, 
    Toolbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout';
import { useProSidebar } from "react-pro-sidebar";
import { useContext,useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { UserContext } from "../App";
import Axios from 'axios';
import { PasswordOutlined } from "@mui/icons-material";

function AppHeader() {
    const { user, setUser } = useContext(UserContext);
    // const navigate = useNavigate();
    // const location = useLocation();
    const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
    const [currentPassword, setCurrentPassword] = useState(""); // Define and set the currentPassword state variable
    const [newPassword, setNewPassword] = useState("");
    const [passwordMismatchError, setPasswordMismatchError] = useState(null); // State for password mismatch error



    const handleOpenPasswordDialog = () => {
        setOpenPasswordDialog(true);
      };
    
    const handleClosePasswordDialog = () => {
        setOpenPasswordDialog(false);
        // Reset the newPassword state if needed
        setNewPassword("");
    };

    const handleChangePassword = async () => {
        try {
            console.log('User Object:', user);
          const token = sessionStorage.getItem('token');
          if (token) {
            const response = await Axios.patch(
              `http://localhost:3333/api/v1/changePassword/${user.userId}`,
              {
                currentPassword: currentPassword, // Send the current password
                newPassword: newPassword, // Send the new password
              },
              {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              }
            );
      
            if (response.status === 200) {
              alert('Password changed successfully!');
              // Optionally, you can sign the user out here or redirect them to the login page.
            } else {
              alert('Failed to change the password');
            }
      
            handleClosePasswordDialog();
          } else {
            // Handle the case where there's no token
          }
        } catch (error) {
          console.error('Error changing password:', error);
          alert('An error occurred while changing the password');
        }
      };
      
    
      

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
            <IconButton onClick={handleOpenPasswordDialog} color="secondary">
                <PasswordOutlined>
                    Ubah Password
                </PasswordOutlined>
            </IconButton>
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
            navigate to="/login/user"
            >
            <LogoutIcon />
            </IconButton>

        </Toolbar>
  
        <Dialog open={openPasswordDialog} onClose={handleClosePasswordDialog}>
            <DialogTitle>Ubah Password</DialogTitle>
            <DialogContent sx={{ padding: '16px' }}>
                <TextField
                    label="Password Saat Ini"
                    type="password"
                    fullWidth
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    sx={{ marginBottom: '16px' }}
                />
                <TextField
                    label="Password Baru"
                    type="password"
                    fullWidth
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    sx={{ marginBottom: '16px' }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClosePasswordDialog} color="primary">
                    Batal
                </Button>
                <Button onClick={handleChangePassword} color="primary">
                    Simpan
                </Button>
            </DialogActions>
            {passwordMismatchError && (
                <Typography variant="body2" color="error">
                    {passwordMismatchError}
                </Typography>
            )}
        </Dialog>

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