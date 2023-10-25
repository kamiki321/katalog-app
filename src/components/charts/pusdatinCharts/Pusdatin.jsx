import { AppRegistration, Group, MapsHomeWork, PhoneAndroid } from '@mui/icons-material'
import { Box, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SecondBar from './SecondBar'
import SecondPie from './SecondPie'
import PusdatinAppList from './PusdatinAppList'

export const Pusdatin = () => {
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    // Add a delay to trigger the fade-in animation after a short delay
    const timeoutId = setTimeout(() => {
      setFadeIn(true);
    }, 500); // Adjust the delay as needed

    // Clear the timeout on unmount to prevent memory leaks
    return () => clearTimeout(timeoutId);
  }, []);

  const animationStyle = fadeIn ? { opacity: 1, transition: 'opacity 0.5s' } : { opacity: 0 };

  return (

    <div style={animationStyle} className="analytics-container"> 
        <Box
    sx={{
      display: { xs: 'flex', md: 'grid' },
      gridTemplateColumns: 'repeat(4,1fr)',
      gridAutoRows: 'minmax(100px, auto)',
      gap: 3,
      textAlign: 'center',
      flexDirection: 'column',
    }}
    >
    <Paper elevation={1} sx={{ p: 3 }}>
      <Typography variant="h7">Total Aplikasi</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PhoneAndroid sx={{ height: 50, width: 50, opacity: 0.3, mr: 1 }} />
        <Typography variant="h6">19 Aplikasi</Typography>
      </Box>
    </Paper>
    <Paper elevation={1} sx={{ p: 3 }}>
      <Typography variant="h7">Dimiliki Pusdatin</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PhoneAndroid sx={{ height: 50, width: 70, opacity: 0.3, mr: 1 }} />
        <Typography variant="h6">47 Aplikasi </Typography>
      </Box>
    </Paper>
    <Paper elevation={1} sx={{ p: 3 }}>
      <Typography variant="h7">Digunakan Pusdatin</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PhoneAndroid sx={{ height: 50, width: 70, opacity: 0.3, mr: 1 }} />
        <Typography variant="h6">19 Aplikasi </Typography>
      </Box>
    </Paper>
    <Paper elevation={1} sx={{ p: 3 }}>
      <Typography variant="h7">Dimiliki Non-Pusdatin</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PhoneAndroid sx={{ height: 50, width: 70, opacity: 0.3, mr: 1 }} />
        <Typography variant="h6">2 Aplikasi </Typography>
      </Box>
    </Paper>
    <Paper elevation={1} sx={{ p: 2, gridColumn: 3 }}>
        <Box>
        <SecondPie/>
        </Box>
    </Paper>
    <Paper elevation={1} sx={{ p: 2, gridColumn: '1/3', gridRow: 2 }}>
        <SecondBar/>
    </Paper>
    {/* <Paper elevation={1} sx={{ p: 2, gridColumn: '1/4' }}>
        <PusdatinBarCharts/>
    </Paper> */}
    <Paper elevation={1} sx={{ p: 2, gridColumn: 4, gridRow: 2 }}>
        <PusdatinAppList/>
    </Paper>

    </Box>
    </div>
  )
}

