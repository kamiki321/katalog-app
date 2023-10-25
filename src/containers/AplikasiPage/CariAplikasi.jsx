import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, GridToolbarExport } from '@mui/x-data-grid';
import { Helmet } from 'react-helmet-async';

import React, { useEffect, useState } from 'react'

const CariAplikasi = () => {
  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetch("https://api.mockfly.dev/mocks/4150728a-8878-4427-8725-3a92fa972967/aplikasi")
    .then((data) => data.json())
    .then((data) => setTableData(data))
  }, [])

console.log(tableData);

const columns = [
  {field: 'id', headerName: 'No.',  width: 30 },
  {field: 'title', headerName: 'Nama Aplikasi', width: 300 },
  {field: 'content', headerName: 'Uraian Aplikasi', width: 650},
  {field: 'jenis_aplikasi', headerName: 'Jenis Aplikasi',width: 150 },
  {field: 'pemilik_aplikasi', headerName: 'Pemilik Aplikasi', width: 200 },
  {field: 'pengguna_aplikasi', headerName: 'Pengguna Aplikasi', width: 200 },

]
  return (
    <>
      <div style={{height:665, width:"100%"}}>
          <h3>Cari Katalog Aplikasi</h3>
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

export default CariAplikasi;




