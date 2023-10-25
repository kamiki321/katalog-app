import { Divider, Typography } from "@mui/material";
import React from "react";


import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    year: "unkown",
    aplikasi: 3,

  },
  {
    year: "2006",
    aplikasi: 1,

  },
  {
    year: "2016",
    aplikasi: 1,

  },
  {
    year: "2017",
    aplikasi: 3,

  },
  {
    year: "2018",
    aplikasi: 2,

  },
  {
    year: "2019",
    aplikasi: 6,

  },
  {
    year: "2020",
    aplikasi: 4,

  },
  {
    year: "2021",
    aplikasi: 5,
  },
  {
    year: "2022",
    aplikasi: 31,

  }
];

export default function PusdatinBarCharts() {
  return (
    <div style={{ width: '100%', height: 300, minWidth: 250 }}>
      <Typography variant="h6"> Jumlah Aplikasi yang terdapat di Pusdatin Kemhan berdasarkan kategori Tahun Pembuatan</Typography>
      <Divider sx={styles.divider}/>
      <ResponsiveContainer>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 15,
          left: 0,
          bottom: 30
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="aplikasi" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
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
