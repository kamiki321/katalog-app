import React, { useEffect, useState, useRef } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { Divider, Typography } from "@mui/material";
import { DownloadSharp } from "@mui/icons-material";

export default function PieChartStatus() {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    // Define the statuses to filter by and their corresponding colors
    const token = sessionStorage.getItem('token');
    const statusColors = {
      Terbuka: "#8884d8",
      Tertutup: "#82ca9d",
      Rahasia: "#ffc658",
      Terbatas: "#ff7300",
    };

    // Define the statuses to filter by
    const statusesToFilter = Object.keys(statusColors);

    if (token) {
      fetch("http://localhost:3333/api/v1/katalog/data", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((apiData) => {
          console.log("Fetched data:", apiData); 
          // Filter data based on the specified statuses
          const filteredData = apiData.filter((item) =>
            statusesToFilter.includes(item.status)
          );
          console.log("Filtered data:", filteredData);
  
          // Calculate the quantity of each status
          const statusData = statusesToFilter.map((status) => ({
            name: status,
            value: filteredData.filter((item) => item.status === status).length,
            fill: statusColors[status], // Specify the color for the status
          }));
  
          setData(statusData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

    } else {

    }
    // Fetch data from the API
  }, []);

  const handleExportPNG = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save("chart.png");
      });
    }
    setAnchorEl(null);
  };

  const handleExportPDF = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save("chart.pdf");
    });
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <Typography variant="h6">
         Jumlah Data Berdasarkan Status 
        <IconButton
          aria-label="export"
          aria-controls="export-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <DownloadSharp />
        </IconButton>
      </Typography>
      <div >
        <Menu
          id="export-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleExportPNG}>Export as PNG</MenuItem>
          <MenuItem onClick={handleExportPDF}>Export as PDF</MenuItem>
        </Menu>
      </div>
            <Divider sx={styles.divider} />
      <ResponsiveContainer width="100%" height={360} ref={chartRef}>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data}
            outerRadius={120}
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {

  divider: {
    my: 2,
  },
};
