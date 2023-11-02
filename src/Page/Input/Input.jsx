import { Box, Card, CardContent, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import TabPanel from "../../components/TabPanel";
import { InputApp } from "../../containers/InputPage/Input/InputApp";
import { InputData } from "../../containers/InputPage/Input/InputData";
import { InputTIK } from "../../containers/InputPage/Input/InputTIK";
import { CetakLaporan } from "../../containers/InputPage/Cetak/CetakLaporan";


export const Input = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return(
      <>
        <Helmet>
          <title>
              Input&Cetak
          </title>
        </Helmet>
        <div>
        <Box>
        <Typography sx={styles.pageTitle} variant="h5">Input & Cetak Laporan</Typography>
        <Box sx={styles.tabHeader}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Input Aplikasi Baru" id='tab-0' />
                <Tab label="Input Data Baru" id='tab-1' />
                <Tab label="Input Hardware Baru" id='tab-2' />
                <Tab label="Input Software Baru" id='tab-3' />
                <Tab label="Cetak Laporan" id='tab-4' />
            </Tabs>
        </Box>
        <TabPanel value={value} index={0} sx={{}}>
            <InputApp/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <InputData/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <InputTIK/>
        </TabPanel>
        <TabPanel value={value} index={3}>
            <CetakLaporan/>
        </TabPanel>
        <TabPanel value={value} index={4}>
            <CetakLaporan/>
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

