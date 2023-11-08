import React, { useState } from 'react';
import { Button, Container, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Box, FormControl, InputLabel, CircularProgress } from '@mui/material';

export const InputTIK = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); 
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    no_serial: '',
    jenis: '',
    type: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const openErrorDialog = (errorMessage) => {
    setError(errorMessage);
    setOpenDialog(true);
  };
  
  const openSuccessDialog = (successMessage) => {
    setSuccess(successMessage);
    setOpenDialog(true);
  };
  
  const closeDialog = () => {
    setError(null);
    setSuccess(null);
    setOpenDialog(false);

    // Setelah dialog ditutup, mengosongkan nilai-nilai dalam TextField
    setFormData({
      no_serial: '',
      jenis: '',
      type: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');

    // Kirim data ke server atau lakukan operasi penyimpanan di sini

    setIsLoading(true);

    if(token){
      fetch('http://localhost:3333/api/v1/input/hardware', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          openSuccessDialog('Berhasil Input Hardware Baru');
          setIsLoading(false);
          console.log(data);
        })
        .catch((error) => {
          setIsLoading(false);
          openErrorDialog('An error occurred during the upload');
          console.error(error);
        });

    } else {

    }
    // Contoh pengiriman data ke server (gunakan URL sebenarnya Anda)
  };

  return (
    <Container>
      <Typography variant="h4">Form Input data Hardware baru</Typography>
      <form onSubmit={handleSubmit}>
        <Box marginBottom={2}>
          <TextField
            name="no_serial"
            label="No. Serial"
            value={formData.no_serial}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            name="jenis"
            label="Jenis"
            value={formData.jenis}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            name="type"
            label="Type"
            value={formData.type}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
        >
          Kirim Data
        </Button>
      </form>

      <Dialog open={openDialog} onClose={closeDialog}>
        <DialogTitle>Alert</DialogTitle>
        <DialogContent>
          {error && <div className="error-alert">{error}</div>}
          {success && <div className="success-alert">{success}</div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {isLoading && <CircularProgress />}
    </Container>
  );
};
