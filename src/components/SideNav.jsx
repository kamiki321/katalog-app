import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined'; import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined'; import StyleIcon from '@mui/icons-material/Style';
import { Link, useNavigate } from "react-router-dom";
import { AppRegistrationOutlined, CategoryOutlined, ComputerOutlined, DatasetOutlined, HardwareOutlined, Input, InputOutlined, PhoneAndroidTwoTone, QuestionMarkOutlined, SearchOutlined } from "@mui/icons-material";

function SideNav() {
    const { collapsed } = useProSidebar();
    const theme = useTheme();

    return <Sidebar
        style={{ height: "100%", top: 'auto' }}
        breakPoint="md"
        backgroundColor={theme.palette.neutral.normal}

    >
        <Box sx={styles.avatarContainer}>
            <Avatar sx={styles.avatar} alt="logo" src="src/assets/logo_kemhan.png" />
            {!collapsed ? <Typography color="secondary" variant="overline" sx={styles.yourChannel}>Katalog Data & Aplikasi</Typography> : null}

        </Box>

        <Menu
            menuItemStyles={{
                button: ({ level, active }) => {
                    return {
                        backgroundColor: active ? theme.palette.neutral.main : undefined,
                    };
                },
            }}>
            <MenuItem active={window.location.pathname === "/dashboard"} component={<Link to="/dashboard" />} icon={<DashboardOutlinedIcon color="secondary" />}> <Typography color="secondary" variant="body2">Dashboard</Typography> </MenuItem>
            <MenuItem active={window.location.pathname === "/katalog-aplikasi"} component={<Link to="/katalog-aplikasi" />} icon={<PhoneAndroidTwoTone color="secondary"/>}> <Typography color="secondary" variant="body2">Katalog Aplikasi </Typography></MenuItem>
            <MenuItem active={window.location.pathname === "/katalog-data"} component={<Link to="/katalog-data" />} icon={<DatasetOutlined color="secondary" />}> <Typography color="secondary" variant="body2">Katalog Data</Typography></MenuItem>
            <MenuItem active={window.location.pathname === "/katalog-tik"} component={<Link to="/katalog-tik" />} icon={<ComputerOutlined color="secondary" />}> <Typography color="secondary" variant="body2">Katalog TIK</Typography></MenuItem>
            <MenuItem active={window.location.pathname === "/input"} component={<Link to="/input" />} icon={<Input color="secondary" />}> <Typography color="secondary" variant="body2">Input</Typography></MenuItem>
            <MenuItem active={window.location.pathname === "/faq"} component={<Link to="/faq" />} icon={<QuestionMarkOutlined color="secondary" />}> <Typography color="secondary" variant="body2">FAQ </Typography></MenuItem >
        </Menu >
    </Sidebar >;
}

export default SideNav;

/**
 * @type {import("@mui/material").SxProps}
 */
const styles = {
    avatarContainer: {
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
        flexDirection: 'column',
        my: 5
    },
    avatar: {
        width: '40%',
        height: 'auto'
    },
    yourChannel: {
        mt: 1
    }

}