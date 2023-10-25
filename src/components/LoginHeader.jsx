import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Hidden from '@mui/material/Hidden';
import { Box } from '@mui/material';

const LoginHeader = () => {
  return (
    <AppBar position="fixed" sx={styles.appBar}>
      <Toolbar>
        {/* <Typography variant="h6">
          PUSDATIN KEMHAN
        </Typography> */}
        <Hidden xsDown>
          <Box
                component={'img'}
                sx={styles.appLogo}
                src="/src/assets/Logo.png" />
          <Box
                sx={{ flexGrow: 1 }} />
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

/** @type {import("@mui/material").SxProps} */
const styles = {
  appBar: {
      bgcolor: 'neutral.main'
  },
  appLogo: {
    borderRadius: 2,
    width: 250,
    marginLeft: 2,
  }
}

export default LoginHeader;