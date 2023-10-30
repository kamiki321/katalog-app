import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import {
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridRowModes 
  } from '@mui/x-data-grid';
  import axios from 'axios';
import { Person, Person3, Refresh } from '@mui/icons-material';
import { Typography } from '@mui/material';

function EditToolbar(props) {
  const { setRows, refreshData, setRowModesModel, openDialog   } = props;


  // const handleClick = () => {
    //   setRows((oldRows) => [
    //     ...oldRows,
    //     { id, username: '', email: '', isNew: true },
    //   ]);
    //   setRowModesModel((oldModel) => ({
    //     ...oldModel,
    //     [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    //   }))
    // };
  

  
    return (
        <GridToolbarContainer>
          <Button color="primary" startIcon={<AddIcon />} onClick={openDialog}>
            Add Admin Access
          </Button>
          <Button color="primary" startIcon={<Refresh />} onClick={refreshData}>
            Refresh
          </Button>
          <Typography   >
            ADMIN  = 1
          </Typography>
          <Typography   >
            , USER  = 2
          </Typography>
        </GridToolbarContainer>
      );
    }

const apiUrl = 'http://localhost:3333/api/v1/users';
const apiUrladd = 'http://localhost:3333/api/v1/admin/register';


export default function EditUser() {
  const [rows, setRows] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rowModesModel, setRowModesModel] = useState({});
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newRecordData, setNewRecordData] = useState({
    username: '',
    email: '',
    password: '',
    // roleId: ''
  });

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    // Fetch data from the API when the component mounts
    if (token) {
      // Include the token in your Axios API requests
      axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log(response.data); // Log the API response
          setRows(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        });
    } else {
      // Handle the case where there is no access token
    }
  }, []);

  const refreshData = () => {
    const token = sessionStorage.getItem('token');
    // Implement logic to refresh data here, for example, by making another API call.
    setIsLoading(true); // Set loading state to true
    axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data); // Log the API response
        setRows(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  };
  
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  //edit
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  //save
  const handleSaveClick = (id) => () => {
    // Assuming you have an API endpoint to save changes to a row
    axios.patch(`http://localhost:3333/api/v1/users/${id}`, { mode: 'view' })
      .then(() => {
        // On success, update the local state to reflect the change
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      })
      .catch((error) => {
        console.error('Error saving row:', error);
      });
  };
  
  
  //delete
  const handleDeleteClick = (id) => () => {
    // Assuming you have an API endpoint to delete a row
    axios.delete(`http://localhost:3333/api/v1/users/${id}`)
      .then(() => {
        // On success, update the local state to remove the deleted row
        setRows(rows.filter((row) => row.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting row:', error);
      });
  };
  
//   const processRowUpdate = (newRow) => {
//     const updatedRow = { ...newRow, isNew: false };
//     setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
//     return updatedRow;
//   };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const openAddDialog = () => {
    console.log('Opening dialog');
    setIsAddDialogOpen(true);
  };

  const closeAddDialog = () => {
    console.log('Closing dialog');
    setIsAddDialogOpen(false);
  };

  const handleAddNewRecord = () => {
    const token = sessionStorage.getItem('token');
    axios.post(apiUrladd, newRecordData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const addedRecord = response.data;
        setRows((oldRows) => [
          ...oldRows,
          addedRecord,
        ]);
        closeAddDialog();
      })
      .catch((error) => {
        console.error('Error adding record:', error);
      });
  };

  const handleNewRecordChange = (event) => {
    const { name, value } = event.target;
    setNewRecordData({
      ...newRecordData,
      [name]: value,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const columns = [
    { field: 'id', headerName: 'Id', width: 20, editable: false },
    { field: 'username', headerName: 'Username', width: 200, editable: true },
    { field: 'email', headerName: 'Email',width: 280,align: 'left',headerAlign: 'left',editable: false,},
    { field: 'password',headerName: 'Password',width: 300,editable: true,},
    { field: 'createdAt',headerName: 'Created Date',type: 'date',width: 250,editable: false,},
    { field: 'updatedAt',headerName: 'Updated Date',type: 'date',width: 250,editable: false,},
    { field: 'roleId',headerName: 'Role',width: 100,editable: true,},
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

return (
    <Box
      sx={{
        height: 500,
        width: '100%',
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        editMode="row"
        onRowEditStop={handleRowEditStop}
        selectionModel={selectionModel}
        onSelectionModelChange={setSelectionModel}
        components={{
          Toolbar: (props) => <EditToolbar {...props} openDialog={openAddDialog} refreshData={refreshData} />,
        }}
        componentsProps={{
          Toolbar: { setRows, setSelectionModel },
          }}

      />

        <Dialog open={isAddDialogOpen} onClose={closeAddDialog}>
          <DialogTitle
          display="flex"
          >Add New Admin Access</DialogTitle>
          <DialogContent>
            <TextField
              label="Username"
              name="username"
              value={newRecordData.username}
              onChange={handleNewRecordChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={newRecordData.email}
              onChange={handleNewRecordChange}
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              value={newRecordData.password}
              onChange={handleNewRecordChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAddDialog} color="primary">
              Close
            </Button>
            <Button onClick={handleAddNewRecord} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

    </Box>
  );
}