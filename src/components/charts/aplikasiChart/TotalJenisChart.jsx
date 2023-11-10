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
import { Box, Divider, Stack, Typography } from "@mui/material";
import axios from "axios";


export default function TotalJenisChart() {
    const [fadeIn, setFadeIn] = useState(false);
    const [dataFromAPI, setDataFromAPI] = useState([]);
    useEffect(() => {
      const token = sessionStorage.getItem('token');
      // Add a delay to trigger the fade-in animation after a short delay
      const timeoutId = setTimeout(() => {
        setFadeIn(true);
      }, 500); // Adjust the delay as needed

      if(token){
        axios.get("http://localhost:3333/api/v1/katalog/aplikasi",  {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          const apiData = response.data;
    
          // Menghitung Total, Khusus, dan Umum dari data API
          const dataProcessed = apiData.map((item) => ({
            name: item.pengguna_aplikasi,
            Khusus: item.jenis_aplikasi === "Aplikasi Khusus" ? 1 : 0,
            Umum: item.jenis_aplikasi === "Aplikasi Umum" ? 1 : 0,
            Total: 1
          }));
    
          // Mengelompokkan data berdasarkan 'name' (misalnya, 'Ditjen Renhan', 'Biro Ortala', dll.)
          const groupedData = dataProcessed.reduce((result, item) => {
            const existingItem = result.find((i) => i.name === item.name);
            if (existingItem) {
              existingItem.Khusus += item.Khusus;
              existingItem.Umum += item.Umum;
              existingItem.Total += item.Total;
            } else {
              result.push(item);
            }
            return result;
          }, []);
    
          setDataFromAPI(groupedData);
          setFadeIn(true);
        })
        .catch((error) => {
          console.error("Error fetching data from API:", error);
        });

      } else {

      }
      // Clear the timeout on unmount to prevent memory leaks
      return () => clearTimeout(timeoutId);
    }, []);
    const animationStyle = fadeIn ? { opacity: 1, transition: 'opacity 0.5s' } : { opacity: 0 };

  return (
    <div style={{animationStyle }} className="analytics-container">
        <Typography variant="h6"> Jumlah Aplikasi Berdasarkan Jenis Aplikasi </Typography>
      <Divider sx={styles.divider}/>
      <ResponsiveContainer width= '100%' height= {450}>
        <BarChart
        data={dataFromAPI}
        width='100%' height={500}
        margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 140
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-50} textAnchor="end" />
        <YAxis />
        <Tooltip />
        <Legend layout="horizontal" align="center" verticalAlign="top"/>
        <Bar dataKey="Total" fill="#181B64" />
        <Bar dataKey="Khusus" stackId="a" fill="#FFA800" />
        <Bar dataKey="Umum" stackId="a" fill="#82ca9d" />
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