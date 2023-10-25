import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const DataSatkerTable = ({ apiUrl, filterBy }) => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetch(apiUrl)
      .then((data) => data.json())
      .then((data) => {
        setTableData(data);
        // Filter data based on the 'filterBy' property
        if (filterBy) {
          const filtered = data.filter((item) => item.satker === filterBy);
          setFilteredData(filtered);
        }
      });
  }, [apiUrl, filterBy]);

  const columns = [
    {field: 'no_katalog_data', headerName: 'No. Katalog Data', width: 150 },
    {field: 'kode_satker', headerName: 'Kode Satker', width: 100},
    {field: 'tahun', headerName: 'Tahun',width: 70 },
    {field: 'no_urut', headerName: 'No. Urut', width: 70 },
    {field: 'satker', headerName: 'Satker', width: 250},
    {field: 'nama_dataset', headerName: 'Nama Dataset', width: 500 },
    {field: 'status', headerName: 'Status', width: 100 },
    {field: 'kategori', headerName: 'Kategori', width: 200}
  ];

  // Use 'filteredData' if it's available, otherwise use 'tableData'
  const rows = filteredData.length > 0 ? filteredData : tableData;

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default DataSatkerTable;
