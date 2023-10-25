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

const data = [
  {
    name: "Ditjen Renhan",
    Khusus: 0,
    Umum: 24,
    Total: 24
  },
  {
    name: "Biro Ortala",
    Khusus: 2,
    Umum: 17,
    Total: 19
  },
  {
    name: "Biro Turdang",
    Khusus: 0,
    Umum: 1,
    Total: 1
  },
  {
    name: "Biro Umum",
    Khusus: 0,
    Umum: 17,
    Total: 17
  },
  {
    name: "Biro Hukum",
    Khusus: 1,
    Umum: 0,
    Total: 1
  },
  {
    name: "Itjen Kemhan",
    Khusus: 1,
    Umum: 2,
    Total: 3
  },
  {
    name: "Ditjen Strahan Kemhan",
    Khusus: 0,
    Umum: 12,
    Total: 12
  },
  {
    name: "Ditjen Pothan Kemhan",
    Khusus: 4,
    Umum: 8,
    Total: 12
  },
  {
    name: "Ditjen Kuathan Kemhan",
    Khusus: 0,
    Umum: 18,
    Total: 18
  },
  {
    name: "Ditjen Baranahan Kemhan",
    Khusus: 1,
    Umum: 5,
    Total: 6
  },
  {
    name: "Unhan Kemhan",
    Khusus: 0,
    Umum: 7,
    Total: 7
  },
  {
    name: "Biro TU dan Protokol",
    Khusus: 0,
    Umum: 17,
    Total: 17
  },
  {
    name: "Biro Kepegawaian",
    Khusus: 4,
    Umum: 2,
    Total: 6
  },
  {
    name: "Pusat Kelaikan",
    Khusus: 0,
    Umum: 7,
    Total: 7
  },
  {
    name: "Badiklat Kemhan",
    Khusus: 27,
    Umum: 0,
    Total: 27
  },
  {
    name: "Bainstrahan Kemhan",
    Khusus: 16,
    Umum: 0,
    Total: 16
  },
  {
    name: "Pusrehab Kemhan",
    Khusus: 0,
    Umum: 2,
    Total: 2
  },
  {
    name: "Pusdatin Kemhan",
    Khusus: 11,
    Umum: 8,
    Total: 19
  },
];

export default function TotalJenisChart() {
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
    <div style={{animationStyle, width: '100%', height: 450, minWidth: 250 }} className="analytics-container">
        <Typography variant="h6"> Jumlah Aplikasi Berdasarkan Jenis Aplikasi </Typography>
      <Divider sx={styles.divider}/>
      <ResponsiveContainer>

        <BarChart
        data={data}
        margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 100
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Total"  />
        <Bar dataKey="Khusus" stackId="a" fill="#8884d8" />
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