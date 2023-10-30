import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, GridToolbarExport } from '@mui/x-data-grid';
import { Helmet } from 'react-helmet-async';

import React, { useEffect, useState } from 'react'

const CariData = () => {
  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) {
      fetch("http://localhost:3333/api/v1/katalog/data", {
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
  {field: 'id', headerName: 'No.',  width: 30 },
  {field: 'no_katalog_data', headerName: 'No. Katalog Data', width: 150 },
  {field: 'kode_satker', headerName: 'Kode Satker', width: 100},
  {field: 'tahun', headerName: 'Tahun',width: 70 },
  {field: 'no_urut', headerName: 'No. Urut', width: 70 },
  {field: 'satker', headerName: 'Satker', width: 250},
  {field: 'nama_dataset', headerName: 'Nama Dataset', width: 500 },
  {field: 'objek_data', headerName: 'Objek Data', width: 300 },
  {field: 'variabel_pembentuk', headerName: 'Variabel Pembentuk', width: 300},
  {field: 'format_dokumen_data', headerName: 'Format Dokumen Data', width: 150 },
  {field: 'jenis_data', headerName: 'Jenis Data', width: 100 },
  {field: 'status', headerName: 'Status', width: 100 },
  {field: 'produsen_data', headerName: 'Produsen Data', width: 300},
  {field: 'jadwal_pemutakhiran', headerName: 'Jadwal Pemutakhiran Data', width: 100 },
  {field: 'tagging_data_prioritas', headerName: 'Tagging Data Prioritas Pembentuk', width: 100},
  {field: 'prioritas_nasional', headerName: 'Prioritas Nasional', width: 100 },
  {field: 'program_prioritas', headerName: 'Program Prioritas', width: 100 },
  {field: 'kesepakatan_berbagi_data', headerName: 'Kesepakatan Berbagi Data ', width: 100},
  {field: 'link_api', headerName: 'Link Api', width: 100},
  {field: 'kesepakatan_pengumpulan_data', headerName: 'Kesepakatan Pengumpulan Data', width: 100 },
  {field: 'catatan', headerName: 'Catatan', width: 100 },
  {field: 'dasar_hukum', headerName: 'Dasar Hukum', width: 500},
  {field: 'kategori', headerName: 'Kategori', width: 200}
]
  return (
    <>
      <Helmet>
            <title>Katalog Data</title>
      </Helmet>
      <div style={{height:800, width:"100%"}}>
          <h3>Cari Katalog Data</h3>
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

export default CariData;




