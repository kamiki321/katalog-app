import { DataGrid, GridActionsCellItem, GridToolbar, GridToolbarExport } from '@mui/x-data-grid';
import { Helmet } from 'react-helmet-async';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const HardwareTableUser = () => {
  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = useState(10);


  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token){
      fetch("http://localhost:3333/api/v1/katalog/hardware",
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((data) => data.json())
      .then((data) => setTableData(data))
    } else {

    }
  }, [])

console.log(tableData);



const columns = [
  {field: 'id', headerName: 'No.',  width: 100 },
  {field: 'no_serial', headerName: 'S/N', width: 150 },
  {field: 'jenis', headerName: 'Jenis', width: 150},
  {field: 'type', headerName: 'Type',width: 150 },
]
  return (
    <>
      <Helmet>
            <title>Katalog Hardware</title>
      </Helmet>
      <div style={{height:800, width:"100%"}}>
          <h3>Cari Hardware</h3>
          <DataGrid 
            rows={tableData}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[5,10,20,50,100]}
            onPageSizeChange={(newPageSize)=>setPageSize(newPageSize)}
            components={{Toolbar: GridToolbar}}
          />
      </div>

    </>
  )
}

export default HardwareTableUser;




