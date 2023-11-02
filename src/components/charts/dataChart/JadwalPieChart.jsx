import React, { useRef, useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import DownloadSharpIcon from "@mui/icons-material/DownloadSharp";
import { Divider, Typography } from "@mui/material";
import domtoimage from "dom-to-image";
import htmlToPdf from "html-pdf";

export default function JadwalPieChart() {
  const [anchorEl, setAnchorEl] = useState(null);
  const chartRef = useRef(null);
  const [data, setData] = useState([]); // State to hold the fetched data

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExportPNG = () => {
    if (chartRef.current) {
      domtoimage
        .toPng(chartRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "chart.png";
          link.click();
        })
        .catch((error) => {
          console.error("Error exporting PNG:", error);
        });
    }
    setAnchorEl(null);
  };

  const handleExportPDF = () => {
    if (chartRef.current) {
      domtoimage
        .toPng(chartRef.current)
        .then((dataUrl) => {
          const pdfOptions = {
            format: "A4",
            orientation: "landscape",
          };

          const pdfBuffer = `<html><body><img src="${dataUrl}" /></body></html>`;
          htmlToPdf.create(pdfBuffer, pdfOptions).toFile("chart.pdf", (err, res) => {
            if (err) {
              console.error("Error exporting PDF:", err);
            } else {
              window.open(res.filename);
            }
          });
        })
        .catch((error) => {
          console.error("Error exporting PDF:", error);
        });
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    const jadwalColors = {
        "no-info": "#8884d8",
        "bila ada perubahan": "#82ca9d",
        "Perbulan": "#ffc658",
        "Per Semester": "#ff7300",
        "Pertahun": "#9467bd",
        "Real Time": "#8c564b",
        "Semester dan Tahunan": "#e377c2",
        "Tahunan atau bila ada perubahan": "#7f7f7f",
        "Tahunan atau bila ada perubahan alokasi":"#bcbd22",
        "Triwulanan, Semesteran, Tahunan" : "#17becf"
      };
    const jadwalToFilter = Object.keys(jadwalColors);
    const token = sessionStorage.getItem('token');
    // Fetch data from the API and filter it to extract "satker" and quantity
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
  
          const filteredData = apiData.filter((item) =>
            jadwalToFilter.includes(item.jadwal_pemutakhiran)
          );
          console.log("Filtered data:", filteredData);
  
          // Extract "satker" and quantity from the data
          const jadwalData = jadwalToFilter.map((jadwal_pemutakhiran) => ({
            name: jadwal_pemutakhiran,
            value: filteredData.filter((item) => item.jadwal_pemutakhiran === jadwal_pemutakhiran).length,
            fill: jadwalColors[jadwal_pemutakhiran],
          }));
  
          setData(jadwalData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

    } else {

    }
  }, []);


  return (
    <div>
      <Typography variant="h6">
        Jumlah Data Berdasarkan Jadwal Pemutakhiran
        <IconButton
          aria-label="export"
          aria-controls="export-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <DownloadSharpIcon />
        </IconButton>
      </Typography>
      <div>
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
      <ResponsiveContainer width="100%" height={400} ref={chartRef}>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
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
