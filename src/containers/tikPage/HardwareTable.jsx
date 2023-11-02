import { DataGrid, GridActionsCellItem, GridToolbar, GridToolbarExport } from '@mui/x-data-grid';
import { Helmet } from 'react-helmet-async';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const HardwareTable = () => {
  const [tableData, setTableData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState();

  const openDeleteDialog = (id) => {
    console.log('Opening dialog');
    setDeleteRowId(id);
    setIsDeleteDialogOpen(true);
  };
  
  const closeDeleteDialog = () => {
    setDeleteRowId(null);
    setIsDeleteDialogOpen(false);
  };

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

const handleDeleteClick = (id) => () => {
  console.log('Deleting row with ID:', id);
  const token = sessionStorage.getItem('token');
  axios.delete(`http://localhost:3333/api/v1/katalog/hardware/${id}`,
  {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(() => {
      setTableData(tableData.filter((row) => row.id !== id));
      closeDeleteDialog();
    })
    .catch((error) => {
      console.error('Error deleting row:', error);
    });
};

const columns = [
  {field: 'id', headerName: 'No.',  width: 100 },
  {field: 'no_serial', headerName: 'S/N', width: 150 },
  {field: 'jenis', headerName: 'Jenis', width: 150},
  {field: 'type', headerName: 'Type',width: 150 },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 200,
    cellClassName: 'actions',
    getActions: ({ id }) => {
      return [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => openDeleteDialog(id)}
          color="inherit"
        />,
      ];
    },
  },
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
        <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog} sx={{ margin: '20px', padding: '20px' }}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this row?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDeleteDialog} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleDeleteClick(deleteRowId)}
                color="primary"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
    </>
  )
}

export default HardwareTable;




