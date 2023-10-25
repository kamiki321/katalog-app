import { Box, Card, CardContent, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import TabPanel from "../../components/TabPanel";

import { Helmet } from "react-helmet-async";
import Software from "../../containers/card/Software";
import CariAplikasi from "../../containers/AplikasiPage/CariAplikasi";
import { AplikasiSatker } from "../../containers/AplikasiPage/AplikasiSatker";
import { OverviewAplikasi } from "../../containers/AplikasiPage/OverviewAplikasi";
import FilteringAplikasi from "../../containers/AplikasiPage/FilteringAplikasi";


function KatalogAplikasi() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return(
      <>
        <Helmet>
          <title>
              Katalog Aplikasi
          </title>
        </Helmet>
        <div>
        <Box>
        <Typography sx={styles.pageTitle} variant="h5">Katalog Aplikasi</Typography>
        <Box sx={styles.tabHeader}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Overview" id='tab-0' />
                <Tab label="Table List Aplikasi" id='tab-1' />
            </Tabs>
        </Box>
        <TabPanel value={value} index={0} sx={{}}>
            {/* <Typography sx={styles.pageTitle} variant="h5">Overview Aplikasi</Typography> */}
            {/* <OverviewAplikasi/>
            <Divider sx={styles.divider}/> */}
            <Typography sx={styles.pageTitle} variant="h5">Temukan Aplikasi</Typography>
            <FilteringAplikasi/>
            

        </TabPanel>
        <TabPanel value={value} index={1}>
        <CariAplikasi/>
            {/* <Typography>Nothing yet!</Typography> */}
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

export default KatalogAplikasi;

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

