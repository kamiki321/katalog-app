
import { Line } from 'react-chartjs-2';
import { AppBar, Box, Tab, Tabs } from '@mui/material';
import { getEmptyData, getHardwareChartData, getMainChartData, getSecondChartData, mainChartOptions } from './ChartConfigs';
import TabPanel from '../../components/TabPanel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowDropDownCircleSharpIcon from '@mui/icons-material/ArrowDropDownCircleSharp';
import AnalyticsTabHead from './AnalyticsTabHead';
import { forwardRef } from 'react';
import { AppBlocking, AppShortcutSharp, AppsOutlined, AppsRounded, AppsTwoTone, Folder, HardwareOutlined } from '@mui/icons-material';
import { useEffect, useState } from 'react';

const apiData = 'http://localhost:3333/api/v1/katalog/data';
const apiApp = 'http://localhost:3333/api/v1/katalog/aplikasi' ;
const apiHard = 'http://localhost:3333/api/v1/katalog/hardware';

function OverviewCharts() {
    const [aplikasiCount, setAplikasiCount] = useState(0);
    const [dataCount, setDataCount] = useState(0);
    const [hardwareCount, setHardwareCount] = useState(0);

    
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            //data
            fetch(apiData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    return response.json(); // Parse response as JSON
                } else {
                    throw new Error(`Failed to fetch data: ${response.statusText}`);
                }
            })
            .then((data) => {
                setDataCount(data.length); // Assuming data is an array
            })
            .catch((error) => {
                console.error('Error fetching Data data:', error);
            });
            
            //aplikasi
            fetch(apiApp, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    return response.json(); // Parse response as JSON
                } else {
                    throw new Error(`Failed to fetch data: ${response.statusText}`);
                }
            })
            .then((data) => {
                setAplikasiCount(data.length); // Assuming data is an array
            })
            .catch((error) => {
                console.error('Error fetching Aplikasi data:', error);
            });
            
            //hardware
            fetch(apiHard, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    return response.json(); // Parse response as JSON
                } else {
                    throw new Error(`Failed to fetch data: ${response.statusText}`);
                }
            })
            .then((data) => {
                setHardwareCount(data.length); // Assuming data is an array
            })
            .catch((error) => {
                console.error('Error fetching Hardware data:', error);
            });
        }
    }, [apiData, apiApp, apiHard]);
    

const AplikasiTabHead = forwardRef((props, ref) => <AnalyticsTabHead {...props}
    title='Aplikasi'
    ref={ref}
    icon={<AppShortcutSharp color='green' />}
    value={aplikasiCount} 
    subtitle={`${aplikasiCount} Total Aplikasi`} />);

const DataTabHead = forwardRef((props, ref) => <AnalyticsTabHead {...props}
    title='Data'
    ref={ref}
    icon={<Folder color='green'/>}
    value={dataCount} 
    subtitle={`${dataCount} Total Data`} />);

const SoftTabHead = forwardRef((props, ref) => <AnalyticsTabHead {...props}
    ref={ref}
    title='Software' 
    icon={<AppsOutlined color='green' />}
    value='-' subtitle={'- Total Software'} />);

const HardTabHead = forwardRef((props, ref) => <AnalyticsTabHead {...props}
    ref={ref}
    title='Hardware'
    icon={<HardwareOutlined color='green'  />}
    value={hardwareCount}
    subtitle={`${hardwareCount} Total Hardware`} 
    />);


    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <Box sx={styles.container}>
        <Tabs value={value} onChange={handleChange}>
            <Tab component={AplikasiTabHead} id='tab-0' />
            <Tab component={DataTabHead} id='tab-1' />
            <Tab component={SoftTabHead} id='tab-2' />
            <Tab component={HardTabHead} id='tab-3' />
        </Tabs>

        <TabPanel value={value} index={0} mt={0}>
            <Box sx={styles.mainChart}>
                <Line options={mainChartOptions} data={getMainChartData()} />
            </Box>
        </TabPanel>
        <TabPanel value={value} index={1} mt={0}>
            <Box sx={styles.mainChart}>
                <Line options={mainChartOptions} data={getSecondChartData()} />
            </Box>
        </TabPanel>
        <TabPanel value={value} index={2} mt={0}>
            <Box sx={styles.mainChart}>
                {/* <Line options={mainChartOptions} data={getMainChartData()} /> */}
            </Box>
        </TabPanel>
        <TabPanel value={value} index={3} mt={0}>
            <Box sx={styles.mainChart}>
                {/* <Line options={mainChartOptions} data={getHardwareChartData()} /> */}
            </Box>
        </TabPanel>
    </Box>
}

export default OverviewCharts;


/**
 * @type {import("@mui/material").SxProps}
 */

const styles = {
    mainChart: {
        height: 250,
        border: 1,
        borderColor: 'neutral.medium',
        pt: 4,
        borderTop: 'none',
        borderRadius: 1,

    },
    container: {
        mt: 4,
        width: '100%'
    }
}

