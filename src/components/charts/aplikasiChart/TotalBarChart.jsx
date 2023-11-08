import { Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from 'axios';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
  Legend
} from "recharts";



export default function TotalBarChart() {
  const [data, setData] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    // Add a delay to trigger the fade-in animation after a short delay
    const timeoutId = setTimeout(() => {
      setFadeIn(true);
    }, 500); // Adjust the delay as needed

    if (token){
           // Fetch data from the API
     fetch("http://localhost:3333/api/v1/katalog/aplikasi",{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
     })
     .then((response) => response.json())
     .then((apiData) => {
       console.log("Fetched data:", apiData);

       // Filter the data based on "pengguna_aplikasi"
       const penggunaToFilter = [
         "Ditjen Renhan", 
         "Biro Ortala",
         "Biro Turdang",
         "Biro Umum",
         "Biro Hukum",
         "Itjen Kemhan",
         "Ditjen Strahan Kemhan",
         "Ditjen Pothan Kemhan",
         "Ditjen Kuathan Kemhan",
         "Ditjen Baranahan Kemhan",
         "Unhan",
         "Biro TU dan Protokol",
         "Biro Kepegawaian",
         "Pusat Kelaikan",
         "Badiklat Kemhan",
         "Bainstrahan Kemhan",
         "Pusrehab Kemhan",
         "Pusdatin Kemhan",
       ]; // Replace with your desired values
       const filteredData = apiData.filter((item) =>
         penggunaToFilter.includes(item.pengguna_aplikasi)
       );
       console.log("Filtered data:", filteredData);

       // Extract "pengguna_aplikasi" and quantity from the data
       const penggunaData = penggunaToFilter.map((pengguna_aplikasi) => ({
         name: pengguna_aplikasi,
         value: filteredData.filter((item) => item.pengguna_aplikasi === pengguna_aplikasi).length,
         // fill: penggunaColors[pengguna_aplikasi], // Define colors as needed
       }));

       setData(penggunaData);
     })
     .catch((error) => console.error("Error fetching data:", error));

   // Clear the timeout on unmount to prevent memory leaks
   return () => clearTimeout(timeoutId);
    } else {

    }

  }, []);
  const animationStyle = fadeIn ? { opacity: 1, transition: 'opacity 0.5s' } : { opacity: 0 };

  return (

    <div  style={{animationStyle}} className="analytics-container">
      <Typography variant="h6"> Grafik Aplikasi yang digunakan di Lingkungan Kemhan </Typography>
      <Divider sx={styles.divider}/>
      <ResponsiveContainer width="100%" height={450}>
      <BarChart
        width="100%" 
        height={450}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 140 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-50} textAnchor="end"/>
        <YAxis dataKey="value" />
        <Tooltip />
        <Bar  dataKey="value"  fill="#3A7240" />
      </BarChart>
    </ResponsiveContainer>
    
    </div>
  );
}

/**
 * @type {import("@mui/material").SxProps}
 */

const styles = {
  divider: {
    my:2
}
}    
