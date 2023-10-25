
import { Line } from 'react-chartjs-2';
import { AppBar, Box, Tab, Tabs } from '@mui/material';
import { getEmptyData, getMainChartData, getSecondChartData, mainChartOptions } from './ChartConfigs';
import { useState } from 'react';
import TabPanel from '../../components/TabPanel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowDropDownCircleSharpIcon from '@mui/icons-material/ArrowDropDownCircleSharp';
import AnalyticsTabHead from './AnalyticsTabHead';
import { forwardRef } from 'react';
import { AppBlocking, AppShortcutSharp, AppsOutlined, AppsRounded, AppsTwoTone, Folder, HardwareOutlined } from '@mui/icons-material';


const AplikasiTabHead = forwardRef((props, ref) => <AnalyticsTabHead {...props}
    title='Aplikasi'
    ref={ref}
    icon={<AppShortcutSharp color='green' />}
    value='232' subtitle={'232 Total Aplikasi'} />);

const DataTabHead = forwardRef((props, ref) => <AnalyticsTabHead {...props}
    title='Data'
    ref={ref}
    icon={<Folder color='green'/>}
    value='61' subtitle={'61 Total Data '} />);

const SoftTabHead = forwardRef((props, ref) => <AnalyticsTabHead {...props}
    ref={ref}
    title='Software' 
    icon={<AppsOutlined color='green' />}
    value='-' subtitle={'- Total Software'} />);

const HardTabHead = forwardRef((props, ref) => <AnalyticsTabHead {...props}
    ref={ref}
    title='Hardware'
    icon={<HardwareOutlined color='green'  />}
    value='36' subtitle={'36 Total Hardware'} />);

function OverviewCharts() {

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
                <Line options={mainChartOptions} data={getMainChartData()} />
            </Box>
        </TabPanel>
        <TabPanel value={value} index={3} mt={0}>
            <Box sx={styles.mainChart}>
                <Line options={mainChartOptions} data={getSecondChartData()} />
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

