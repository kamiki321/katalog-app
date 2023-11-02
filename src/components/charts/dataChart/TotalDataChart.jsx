import { DataArray, DataObject, Folder, FolderDelete, FolderDeleteOutlined, FolderOffOutlined, FolderOffRounded, FolderOffSharp, FolderOffTwoTone, FolderOpen, FolderOpenSharp, FolderOpenTwoTone, FolderSpecial, PermDataSettingRounded, PhoneAndroid, RuleFolderOutlined } from '@mui/icons-material'
import { Box, Paper, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import TotalDataBarChart from './TotalDataBarChart'
import ListData from './TopDataList'
import TopDataList from './TopDataList'
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For table support (optional)
import html2canvas from 'html2canvas';
import PieChartStatus from './PieChartStatus'
import PieChartTotal from './PieChartTotal'
import KategoriBarChart from './KategoriBarChart'
import JadwalPieChart from './JadwalPieChart'





export const TotalDataChart = () => {
  const contentRef = useRef(null);
  const [totalData, setTotalData] = useState(0);
  const [totalStatusTerbuka, setTotalTerbuka] = useState(0);
  const [totalStatusTertutup, setTotalTertutup] = useState(0);
  const [totalStatusRahasia, setTotalRahasia] = useState(0);
  const [totalStatusTerbatas, setTotalTerbatas] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    // Add a delay to trigger the fade-in animation after a short delay
    const timeoutId = setTimeout(() => {
      setFadeIn(true);
    }, 500); // Adjust the delay as needed
    const fetchData = async () => {
      try {
        if (token) {
          const response = await fetch('http://localhost:3333/api/v1/katalog/data', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const data = await response.json();
            setTotalData(data.length); // Total Aplikasi
            const totalTerbuka = data.filter((item) => item.status === 'Terbuka').length;
            const totalTertutup = data.filter((item) => item.status === 'Tertutup').length;
            const totalRahasia = data.filter((item) => item.status === 'Rahasia').length;
            const totalTerbatas = data.filter((item) => item.status === 'Terbatas').length;
            setTotalTerbuka(totalTerbuka); 
            setTotalTertutup(totalTertutup); 
            setTotalRahasia(totalRahasia); 
            setTotalTerbatas(totalTerbatas); 
          } else {
            console.error('Failed to fetch data:', response.status);
          }
        } else {
          // Handle the case when there is no token
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    // Clear the timeout on unmount to prevent memory leaks
    const clearTimer = () => clearTimeout(timeoutId);
    fetchData(); // Now, fetchData will be called to fetch data
  
    return clearTimer;
  }, []);


  const animationStyle = fadeIn ? { opacity: 1, transition: 'opacity 0.5s' } : { opacity: 0 };

  const exportToPDF = () => {
    console.log('Exporting to PDF...');
    console.log('contentRef.current:', contentRef.current);
  
    if (contentRef.current) {
      html2canvas(contentRef.current).then((canvas) => {
        console.log('Canvas:', canvas);
        const imgData = canvas.toDataURL('image/png');
        console.log('imgData:', imgData);
  
        const pdf = new jsPDF('p', 'mm');
        const width = pdf.internal.pageSize.getWidth();
        console.log('PDF Width:', width);
  
        const height = (canvas.height * width) / canvas.width;
        console.log('PDF Height:', height);
  
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save('total-data-chart.pdf');
      });
    }
  };
  
  
  return (
    <div ref={contentRef} id="total-data-chart" style={animationStyle} className="analytics-container"> 
      <button
        onClick={exportToPDF}
        style={{ padding: '10px', margin: '10px' }}
      >
        Export to PDF
      </button>
        <Box
    sx={{
      display: { xs: 'flex', md: 'grid' },
      gridTemplateColumns: 'repeat(5,1fr)',
      gridAutoRows: 'minmax(100px, auto)',
      gap: 3,
      textAlign: 'center',
      flexDirection: 'column',
    }}
    >
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h7">Total Data</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Folder color='green' sx={{ height: 35, width: 35, opacity: 0.3, mr: 1 }} />
        <Typography variant="h6">{totalData} Data</Typography>
      </Box>
    </Paper>

    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h7">Status Terbuka </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FolderOpenTwoTone color='green' sx={{ height: 35, width: 35, opacity: 0.3, mr: 1 , color:''}} />
        <Typography variant="h6">{totalStatusTerbuka} Data</Typography>
      </Box>
    </Paper>

    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h7">Status Tertutup </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FolderOffRounded color='black'  sx={{ height: 35, width: 35, opacity: 0.3, mr: 1 }} />
        <Typography variant="h6">{totalStatusTertutup} Data</Typography>
      </Box>
    </Paper>

    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h7">Status Terbatas </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FolderOffOutlined sx={{ height: 35, width: 35, opacity: 0.3, mr: 1 }} />
        <Typography variant="h6">{totalStatusTerbatas} Data</Typography>
      </Box>
    </Paper>

    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h7">Status Rahasia </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FolderSpecial sx={{ height: 35, width: 35, opacity: 0.3, mr: 1 }} />
        <Typography variant="h6">{totalStatusRahasia} Data</Typography>
      </Box>
    </Paper>

    <Paper elevation={3} sx={{ p: 2, gridColumn: '1/3', gridRow: 3}}>
        <Box>
        {/* <TotalDataPieChart/> */}
        <PieChartTotal/>
        </Box>
    </Paper>
    <Paper elevation={3} sx={{ p: 2, gridColumn: '3/5', gridRow: '3/4'}}>
        <Box>
          <PieChartStatus/>
        {/* <StatusDataChart/> */}
        </Box>
    </Paper>
    <Paper elevation={3} sx={{ p: 2, gridColumn: '1/5', gridRow: 2}}>
        <TotalDataBarChart/>
    </Paper>
    <Paper elevation={3} sx={{ p: 2, gridColumn: '1/4', gridRow: 4}}>
        <KategoriBarChart/>
    </Paper>
    <Paper elevation={3} sx={{ p: 2, gridColumn: '4/6', gridRow: 4}}>
        <Box>
          <JadwalPieChart/>
        {/* <StatusDataChart/> */}
        </Box>
    </Paper>
    <Paper elevation={3} sx={{ p: 2, gridColumn: 5, gridRow: '2/4' }}>
        <TopDataList/>
    </Paper>
    </Box>

    </div>
  )
}

