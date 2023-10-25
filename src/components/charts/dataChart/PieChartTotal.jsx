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

export default function PieChartTotal() {
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
    const satkerColors = {
        "Bainstrahan Kemhan": "#8884d8",
        "Baranahan Kemhan": "#82ca9d",
        "Biro Humas Setjen Kemhan": "#ffc658",
        "Biro Turdang Setjen Kemhan": "#ff7300",
        "Ditjen Kuathan Kemhan": "#9467bd",
        "Ditjen Pothan Kemhan": "#8c564b",
        "Ditjen Strahan Kemhan": "#e377c2",
        "lnspektorat Jenderal  Kemhan": "#7f7f7f",
        "Pusdatin Kemhan":"#bcbd22",
        "Puslaik Kemhan" : "#17becf",
        "Pusrehab Kemhan": "#aec7e8"
      };

      const satkerToFilter = Object.keys(satkerColors);
    // Fetch data from the API and filter it to extract "satker" and quantity
    fetch("https://api.mockfly.dev/mocks/4150728a-8878-4427-8725-3a92fa972967/all")
      .then((response) => response.json())
      .then((apiData) => {
        console.log("Fetched data:", apiData); 

        const filteredData = apiData.filter((item) =>
          satkerToFilter.includes(item.satker)
        );
        console.log("Filtered data:", filteredData);

        // Extract "satker" and quantity from the data
        const satkerData = satkerToFilter.map((satker) => ({
          name: satker,
          value: filteredData.filter((item) => item.satker === satker).length,
          fill: satkerColors[satker],
        }));

        setData(satkerData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  return (
    <div>
      <Typography variant="h6">
        Persentase Jumlah Data Berdasarkan Satker
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
