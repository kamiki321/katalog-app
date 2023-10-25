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
  Legend
} from "recharts";

const data = [
  {
    name: "Bainstrahan",
    uv: 5,
    pv: 5
  },
  {
    name: "Baranahan",
    uv: 3,
    pv: 3
  },
  {
    name: "Biro Humas",
    uv: 8,
    pv: 8
  },
  {
    name: "Biro Turdan",
    uv: 1,
    pv: 1
  },
  {
    name: "Ditjen Kuathan ",
    uv: 28,
    pv: 28
  },
  {
    name: "Ditjen Pothan",
    uv: 5,
    pv: 5
  },
  {
    name: "Ditjen Strahan",
    uv: 2,
    pv: 2
  },
  {
    name: "Inspektorat Jendral ",
    uv: 4,
    pv: 4
  },
  {
    name: "Pusdatin",
    uv: 2,
    pv: 2
  },
  {
    name: "Puslaik ",
    uv: 1,
    pv: 1
  },
  {
    name: "Pusrehab",
    uv: 2,
    pv: 2
  }
];

export default function TotalDataBarChart() {
  // const [data, setData] = useState([])
  // const [uniquePemilikAplikasiValues, setUniquePemilikAplikasiValues] = useState([]);
  // const [valueCounts , setValueCounts] = useState([])
  // const [fadeIn, setFadeIn] = useState(false);

  // useEffect(() => {
  //   // Fetch data from the API
  //   fetch("https://api.mockfly.dev/mocks/4150728a-8878-4427-8725-3a92fa972967/all")
  //     .then((response) => response.json())
  //     .then((apiData) => {
  //       console.log("Fetched data:", apiData);

  //       // Extract unique "pemilik_aplikasi" values
  //       const uniqueValues = Array.from(new Set(apiData.map((item) => item.satker)));
  //       setUniquePemilikAplikasiValues(uniqueValues);

  //       // Count the occurrences of each unique value
  //       const counts = uniqueValues.map((valueCounts) => ({
  //         name: valueCounts,
  //         count: apiData.filter((item) => item.satker === valueCounts).length
  //       }));
  //       setValueCounts(counts);

  //       // Set the data
  //       setData(apiData);
  //       setFadeIn(true);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  return (
    <div style={{ width: "100%", height: 400 }}>
    <Typography variant="h6">Grafik Jumlah Total Data Per Satker</Typography>
    <Divider sx={styles.divider}/>
      <ResponsiveContainer>
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 60,
            left: 20
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
        </ComposedChart>
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