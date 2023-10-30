import { PhoneAndroid } from '@mui/icons-material'
import { Box, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SecondPie from '../pusdatinCharts/SecondPie'
import PusdatinBarCharts from '../pusdatinCharts/PusdatinBarCharts'
import AppByPemilikBarChart from './AppByPemilikBarChart'
import TotalBarChart from './TotalBarChart'
import AppByJenisPieChart from './AppByJenisPieChart'
import TotalJenisChart from './TotalJenisChart'

export const TotalAppCharts = () => {
  const [totalAplikasi, setTotalAplikasi] = useState(0);
  const [totalAplikasiUmum, setTotalAplikasiUmum] = useState(0);
  const [totalAplikasiKhusus, setTotalAplikasiKhusus] = useState(0);
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
          const response = await fetch('http://localhost:3333/api/v1/katalog/aplikasi', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const data = await response.json();
            setTotalAplikasi(data.length); // Total Aplikasi
            const totalUmum = data.filter((item) => item.jenis_aplikasi === 'Aplikasi Umum').length;
            const totalKhusus = data.filter((item) => item.jenis_aplikasi === 'Aplikasi Khusus').length;
            setTotalAplikasiUmum(totalUmum); // Total Aplikasi Umum
            setTotalAplikasiKhusus(totalKhusus); // Total Aplikasi Khusus
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

  return (
    <div style={animationStyle} className="analytics-container"> 
        <Box
    sx={{
      display: { xs: 'flex', md: 'grid' },
      gridTemplateColumns: 'repeat(3,1fr)',
      gridAutoRows: 'minmax(100px, auto)',
      gap: 3,
      textAlign: 'center',
      flexDirection: 'column',
    }}
    >
    <Paper elevation={1} sx={{ p: 2 }}>
      <Typography variant="h7">Total Aplikasi Yang Digunakan Kemhan</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PhoneAndroid sx={{ height: 30, width: 30, opacity: 0.3, mr: 1 }} />
        <Typography variant="h6">{totalAplikasi} Aplikasi</Typography>
      </Box>
    </Paper>

    <Paper elevation={1} sx={{ p: 2 }}>
      <Typography variant="h7">Total Aplikasi Khusus </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PhoneAndroid sx={{ height: 30, width: 30, opacity: 0.3, mr: 1 }} />
        <Typography variant="h6">{totalAplikasiKhusus} Aplikasi</Typography>
      </Box>
    </Paper>

    <Paper elevation={1} sx={{ p: 2 }}>
      <Typography variant="h7">Total Aplikasi Umum </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PhoneAndroid sx={{ height: 30, width: 30, opacity: 0.3, mr: 1 }} />
        <Typography variant="h6">{totalAplikasiUmum} Aplikasi</Typography>
      </Box>
    </Paper>

    <Paper elevation={1} sx={{ p: 2, gridColumn: 1}}>
        <Box>
        <AppByPemilikBarChart/>
        </Box>
    </Paper>
    <Paper elevation={1} sx={{ p: 2, gridColumn: 2}}>
        <Box>
        <AppByJenisPieChart/>
        </Box>
      </Paper>
      <Paper elevation={1} sx={{ p: 2, gridColumn: 3}}>
        <TotalBarChart/>
    </Paper>

    <Paper elevation={1} sx={{ p: 2, gridColumn: '1/4'}}>
        <TotalJenisChart/>
      </Paper>
    </Box>
    </div>
  )
}

