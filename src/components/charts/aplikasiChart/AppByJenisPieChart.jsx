import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from 'axios';

const COLORS = ["#58AD60", "#76A37B"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function AppByJenisPieChart() {
  const [data, setData] = useState([]);
  
  
  useEffect(() => {
    const jenisColors ={
      "Aplikasi Khusus" :"#58AD60",
      "Aplikasi Umum" : "#76A37B"
    }
  
    const jenisToFilter = Object.keys(jenisColors);

    const token = sessionStorage.getItem('token');
    // Fetch data from your API endpoint
    if (token) {
      fetch("http://localhost:3333/api/v1/katalog/aplikasi",{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((apiData) => {
          console.log("Fetched data:", apiData); 
          // Filter the data based on "jenis_aplikasi"
          const filteredData = apiData.filter((item) =>
            jenisToFilter.includes(item.jenis_aplikasi)
          );
          console.log("Filtered data:", filteredData);
          // Extract "satker" and quantity from the data
          const jenisData = jenisToFilter.map((jenis_aplikasi) => ({
            name: jenis_aplikasi,
            value: filteredData.filter((item) => item.jenis_aplikasi === jenis_aplikasi).length,
            fill: jenisColors[jenis_aplikasi],
          }));
  
          setData(jenisData);
  
        })
        .catch((error) => console.error("Error fetching data:", error));

    } else {

    }
  }, []);

  return (
    <div>
      <Typography variant="h6"> Persentase Aplikasi yang berdasarkan Jenis Aplikasi</Typography>
      <Divider sx={styles.divider}/>
    <Box 
        sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
      }}
    > 
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  />
          ))}
        </Pie>
        <Tooltip/>
      </PieChart>
      <Stack gap={2}>
        <Typography variant="h6">Year</Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {COLORS.map((color, i) => (
            <Stack key={color} alignItems="center" spacing={1}>
              <Box sx={{ width: 20, height: 20, background: color }} />
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {data[i]?.name}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
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
