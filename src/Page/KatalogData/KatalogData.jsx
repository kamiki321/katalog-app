import { Box, Card, CardContent, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";



import { Helmet } from "react-helmet-async";
import CariData from "../../containers/DataPage/CariData";
import Software from "../../containers/card/Software";
import TabPanel from "../../components/TabPanel";
// import DataList from "../../components/List/DataList";
import DataSatkerTable from "../../containers/Table/DataSatkerTable";
import { Component1, Component10, Component11, Component2, Component3, Component4, Component5, Component6, Component7, Component8, Component9 } from "../../containers/Table/components";



function KatalogData() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return(
      <>
        <Helmet>
          <title>
              Katalog Data
          </title>
        </Helmet>
        <div>
        <Box>
            <Typography sx={styles.pageTitle} variant="h5">Katalog Data</Typography>
            <Box sx={styles.tabHeader}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Semua Data" id='tab-0' />
                    <Tab label="Per Satker" id='tab-1' />


                </Tabs>
            </Box>
                <TabPanel value={value} index={0} sx={{}}>
                    <CariData/>

                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Component1/>
                    <Divider sx={styles.divider}/>
                    <Component2/>
                    <Divider sx={styles.divider}/>
                    <Component3/>
                    <Divider sx={styles.divider}/>
                    <Component4/>
                    <Divider sx={styles.divider}/>
                    <Component5/>
                    <Divider sx={styles.divider}/>
                    <Component6/>
                    <Divider sx={styles.divider}/>
                    <Component7/>
                    <Divider sx={styles.divider}/>
                    <Component8/>
                    <Divider sx={styles.divider}/>
                    <Component9/>
                    <Divider sx={styles.divider}/>
                    <Component10/>
                    <Divider sx={styles.divider}/>
                    <Component11/>



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

export default KatalogData;

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

