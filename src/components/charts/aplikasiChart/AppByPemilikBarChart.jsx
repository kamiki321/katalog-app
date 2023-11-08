import { Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function AppByPemilikBarChart() {
  const [data, setData] = useState([]);
  const [uniquePemilikAplikasiValues, setUniquePemilikAplikasiValues] = useState([]);
  const [valueCounts, setValueCounts] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    // Fetch data from the API
    if (token) {
      fetch("http://localhost:3333/api/v1/katalog/aplikasi", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((apiData) => {
          console.log("Fetched data:", apiData);
  
          // Extract unique "pemilik_aplikasi" values
          const uniqueValues = Array.from(new Set(apiData.map((item) => item.pemilik_aplikasi)));
          setUniquePemilikAplikasiValues(uniqueValues);
  
          // Count the occurrences of each unique value
          const counts = uniqueValues.map((value) => ({
            name: value,
            count: apiData.filter((item) => item.pemilik_aplikasi === value).length
          }));
          setValueCounts(counts);
  
          // Set the data
          setData(apiData);
          setFadeIn(true);
        })
        .catch((error) => console.error("Error fetching data:", error));
      
    } else {
      
    }
  }, []);
  const animationStyle = fadeIn ? { opacity: 1, transition: "opacity 0.5s" } : { opacity: 0 };

  return (
    <div style={animationStyle}>
      <Typography variant="h6"> Grafik Aplikasi berdasarkan Pemilik Aplikasi</Typography>
      <Divider sx={styles.divider}/>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart width="100%" height={500} data={valueCounts} margin={{ top: 20, right: 30, left: 20, bottom: 140 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-50} textAnchor="end" />
          <YAxis dataKey="count" />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
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
