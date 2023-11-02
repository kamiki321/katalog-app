import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoginPage } from "../Page/Login/LoginPage";
import { useContext } from "react";
import { UserContext } from "../App";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Box, CssBaseline } from "@mui/material";
import AppHeader from "../components/AppHeader";
import SideNav from "../components/SideNav";

const useAuth = () => {
    const { user } = useContext(UserContext)
    return user && user.loggedIn;

};

const ProtectedRoutes = () => {
    const location = useLocation();
    const isAuth = useAuth();
    const isRole = 'admin'
  return isAuth ? (
    <>
        <ProSidebarProvider>
              <CssBaseline />
              <AppHeader />
              <Box sx={styles.container}>
                <SideNav isRole={isRole}/>
                <Box
                  component={'main'}
                  sx={styles.mainSection}
                >
                    <Outlet /> 
                </Box>

              </Box>
        </ProSidebarProvider> 
    </>
  ) : ( 
    <Navigate to='/login' replace state={{ from: location}} />
  ) 
  

};




/**
 * @type {import('@mui/material').SxProps}
 */
const styles = {
    container: {
      display: 'flex',
      bgcolor: 'neutral.light',
      height: 'calc(100% - 64px)'
    },
    mainSection: {
      p: 4,
      width: '100%',
      height: '100%',
      overflow: 'auto',
    }
  }

export default ProtectedRoutes;