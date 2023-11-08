import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TabPanel from "../../components/TabPanel";
import OverviewCharts from "../../containers/DashboardPage/OverviewCharts";
import TenAplikasiOverview from "../../containers/DashboardPage/TenAplikasiOverview";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Pusdatin } from "../../components/charts/pusdatinCharts/Pusdatin";
import { TotalAppCharts } from "../../components/charts/aplikasiChart/TotalAppCharts";
import { TotalDataChart } from "../../components/charts/dataChart/TotalDataChart";
import TopDataList from "../../components/charts/dataChart/TopDataList";
import TopFiveData from "../../containers/DashboardPage/TopFiveData";


function Analytics() {
    const [value, setValue] = useState(0);
    const [slideIn, setSlideIn] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        // Add a delay to trigger the slide-in animation after a short delay
        const timeoutId = setTimeout(() => {
          setSlideIn(true);
        }, 500); // Adjust the delay as needed
    
        // Clear the timeout on unmount to prevent memory leaks
        return () => clearTimeout(timeoutId);
      }, []);

      const animationStyle = slideIn
    ? {
        transform: 'translateY(0)',
        transition: 'transform 0.5s',
      }
    : {
        transform: 'translateY(-100%)',
      };

    return ( 
        <>
        <Helmet>
            <title>Dashboard</title>
        </Helmet>
        <div style={{ ...animationStyle, position: 'relative' }} className="analytics-container">
        <Box>
            {/* <Box sx={{
                width: 600,
                height: 450,
                display: 'grid',
                gridTemplateColumns: { 'md': '1fr', 'lg': '1fr 0px' },
                gap: 2,
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                // display: 'flex',
                // backgroundImage: 
            }}>
            <img src="public/asset4.png" height={600} width={600}/>
            </Box>
            <Divider sx={styles.divider}/> */}
        <Typography sx={styles.pageTitle} variant="h5">Dashboard</Typography>
        <Box sx={styles.tabHeader}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Overview" id='tab-0' />
                <Tab label="Aplikasi" id='tab-2' />
                <Tab label="Data" id='tab-3' />
                {/* <Tab label="Software" id='tab-1' />
                <Tab label="Hardware" id='tab-4' /> */}
            </Tabs>
        </Box>
        <TabPanel value={value} index={0} sx={{}}>
            <Box sx={styles.overviewContainer}>
                <Box sx={styles.statsContainer}>
                    <Typography variant="h5">
                        Grafik Analisis Data, Aplikasi dan Hardware
                    </Typography>
                    
                    <OverviewCharts />
                    <Divider sx={styles.divider}/>
                    <TenAplikasiOverview/>
                </Box>
                <Box>
                    {/* <TopDataList/> */}
                    <TopFiveData/>
                    {/* <LatestVideoCard/> */}
                </Box>

            </Box>
        </TabPanel>
        <TabPanel value={value} index={1}> 
            <Typography variant="h4">Analisis Aplikasi</Typography>
            <Divider sx={styles.divider}/>  
            <TotalAppCharts/>
                {/* <Divider sx={styles.divider}/>
                <Typography variant="h4">Pusdatin</Typography>
                <Divider sx={styles.divider}/>
                <Pusdatin/> */}
        </TabPanel>
        <TabPanel value={value} index={2}>
            <Typography variant="h4">Analisis Data</Typography>
            <Divider sx={styles.divider}/>
            <TotalDataChart/>
        </TabPanel>
        {/* <TabPanel value={value} index={3}>
            <Typography>Software</Typography>
        </TabPanel>
        <TabPanel value={value} index={4}>
            <Typography>Hardware</Typography>
        </TabPanel> */}
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

export default Analytics;

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
    overviewContainer: {
        display: 'grid',
        gridTemplateColumns: { 'md': '1fr', 'lg': '1fr 300px' },
        gap: 2,
        justifyContent: 'center',
    },
    pusdatinBarChartContainer: {
        display: 'grid',
        gridTemplateColumns: { 'md': '1fr', 'lg': '1fr 700px' },
        gap: 1,
        justifyContent: 'center',
    },
    statsContainer: {
        bgcolor: 'neutral.light',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    divider: {
        my:4
    }

}

