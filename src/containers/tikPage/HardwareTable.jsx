import { DataGrid, GridToolbar, GridToolbarExport } from '@mui/x-data-grid';
import { Helmet } from 'react-helmet-async';

import React, { useEffect, useState } from 'react'

const HardwareTable = () => {
  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetch("https://api.mockfly.dev/mocks/4150728a-8878-4427-8725-3a92fa972967/hardware")
    .then((data) => data.json())
    .then((data) => setTableData(data))
  }, [])

console.log(tableData);

const columns = [
  {field: 'id', headerName: 'No.',  width: 30 },
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

export default HardwareTable;




