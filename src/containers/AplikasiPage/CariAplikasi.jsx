import Box from '@mui/material/Box';
import { DataGrid,GridActionsCellItem, GridToolbar, GridToolbarExport } from '@mui/x-data-grid';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


const CariAplikasi = () => {
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

  const token = sessionStorage.getItem('token')
  useEffect(() => {
    if (token){
      fetch("http://localhost:3333/api/v1/katalog/aplikasi",{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
      )
      .then((data) => data.json())
      .then((data) => setTableData(data))   
    } else {
    }
  }, [])

  const handleDeleteClick = (id) => () => {
    // Assuming you have an API endpoint to delete a row
    const token = sessionStorage.getItem('token');
    axios.delete(`http://localhost:3333/api/v1/katalog/aplikasi/${id}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        // On success, update the local state to remove the deleted row
        setTableData(tableData.filter((row) => row.id !== id));
        closeDeleteDialog();
      })
      .catch((error) => {
        console.error('Error deleting row:', error);
      });
  };

console.log(tableData);

const columns = [
  {field: 'id', headerName: 'Id',  width: 100 },
  {field: 'title', headerName: 'Nama Aplikasi', width: 300 },
  {field: 'content', headerName: 'Uraian Aplikasi', width: 650},
  {field: 'jenis_aplikasi', headerName: 'Jenis Aplikasi',width: 150 },
  {field: 'pemilik_aplikasi', headerName: 'Pemilik Aplikasi', width: 200 },
  {field: 'pengguna_aplikasi', headerName: 'Pengguna Aplikasi', width: 200 },
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
    }
  }
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

export default CariAplikasi;




