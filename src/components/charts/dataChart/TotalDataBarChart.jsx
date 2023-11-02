import { Divider, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart
} from "recharts";


export default function TotalDataBarChart() {
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
     fetch("http://localhost:3333/api/v1/katalog/data",{
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
        "Bainstrahan Kemhan",
        "Baranahan Kemhan",
        "Biro Humas Setjen Kemhan",
        "Biro Turdang Setjen Kemhan",
        "Ditjen Kuathan Kemhan",
        "Ditjen Pothan Kemhan",
        "Ditjen Strahan Kemhan",
        "lnspektorat Jenderal Kemhan",
        "Pusdatin Kemhan",
        "Puslaik Kemhan",
        "Pusrehab Kemhan"
       ]; // Replace with your desired values
       const filteredData = apiData.filter((item) =>
         penggunaToFilter.includes(item.satker)
       );
       console.log("Filtered data:", filteredData);

       // Extract "pengguna_aplikasi" and quantity from the data
       const penggunaData = penggunaToFilter.map((satker) => ({
         name: satker,
         value: filteredData.filter((item) => item.satker === satker).length,
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
    <div style={{animationStyle}}>
    <Typography variant="h6">Grafik Jumlah Total Data Per Satker</Typography>
    <Divider sx={styles.divider}/>
      <ResponsiveContainer width="100%" height={450}>
        <BarChart data={data} width={700} height={500} margin={{ top: 20, right: 30, left: 20, bottom: 120 }} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-50} textAnchor="end" />
          <YAxis dataKey="value" />
          <Tooltip />
          <Legend layout="horizontal" align="center" verticalAlign="top"/>
          <Bar dataKey="value" barSize={40} fill="#413ea0" />
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