import { Box, Card, CardContent, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import TabPanel from "../../components/TabPanel";
import { EditAdmin } from "../../containers/EditPage/EditAdmin";
import EditUser from "../../containers/EditPage/EditUser";



export const EditUserAdmin = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return(
      <>
        <Helmet>
          <title>
              Edit User & Admin
          </title>
        </Helmet>
        <div>
        <Box>
        <Typography sx={styles.pageTitle} variant="h5">Edit User dan Admin</Typography>
        <Box sx={styles.tabHeader}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Edit User&Admin Data" id='tab-0' />
                {/* <Tab label="Edit Admin" id='tab-1' /> */}
            </Tabs>
        </Box>
        <TabPanel value={value} index={0} sx={{}}>
          <EditUser/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* <EditAdmin /> */}
        </TabPanel>
        </Box>
        <footer>
            <Box sx={{
                    width: '100%',
                    height: 80
                }}>
                <Divider sx={styles.divider}/>
                <Typography sx={{
                    justifyContent: 'center',
                    alignItems : 'center',
                    alignContent : 'center'
                }} variant="h6">© Hak Cipta 2022 - 2023 Pusat Data dan Informasi Kementerian Pertahanan Republik Indonesia</Typography>
            </Box>
        </footer>
        </div>
        </> 
    );
}


/**
 * @type {import("@mui/material").SxProps}
 */

const styles = {
    pageTitle: {
        mb: 2
    },
    tabHeader: {
        borderBottom: 1,
        borderColor: 'divider'
    },
    rowContainer: {
        width: '100%',
        maxWidth: 900,
        border: 1,
        borderColor: 'neutral.medium',
        borderRadius: 1,
        mt: 2,
        p: 2,
        display: 'flex',
        alignItems: 'flex-start'
    },
    rowIcon: {
        fontSize: 40,
        color: 'neutral.normal'
    },
    secondColumn: {
        ml: 1
    },
    rowLink: {
        ml: 'auto'
    },
    divider: {
        my:4
    }
}

