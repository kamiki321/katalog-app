import React, { useState } from 'react';
import { Button, Container, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Box, FormControl, InputLabel, CircularProgress, MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';


export const InputApp = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); 
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: 'null',
    title: '',
    content: '',
    jenis_aplikasi: '',
    pemilik_aplikasi: '',
    pengguna_aplikasi: '',
    buttonUrl: '',
  });
  const [penggunaAplikasiOptions, setPenggunaAplikasiOptions] = useState([]);
  const [jenisAplikasiOptions, setJenisAplikasiOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if(token){
      fetch('http://localhost:3333/api/v1/katalog/aplikasi', {
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
        .then((response) => response.json())
        .then((data) => {
          // Extract the values from the "pengguna_aplikasi" column
          const uniqueJenisAplikasi = [...new Set(data.map((item) => item.jenis_aplikasi))];
          const uniquePenggunaAplikasi = [...new Set(data.map((item) => item.pengguna_aplikasi))];
          // Sort the unique values alphabetically
          uniqueJenisAplikasi.sort((a, b) => a.localeCompare(b));
          setJenisAplikasiOptions(uniqueJenisAplikasi);
          uniquePenggunaAplikasi.sort((a, b) => a.localeCompare(b));
          setPenggunaAplikasiOptions(uniquePenggunaAplikasi);
        })
        .catch((error) => {
          console.error('Error fetching pengguna aplikasi:', error);
        });
    } else {

    }
  }, []);


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

    setFormData({
      imageUrl: 'null',
      title: '',
      content: '',
      jenis_aplikasi: '',
      pemilik_aplikasi: '',
      pengguna_aplikasi: '',
      buttonUrl: '',
    });
  };
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      // Handle file input
      setFormData({
        ...formData,
        [name]: files[0], // Store the selected file in the state
      });
    } else {
      // Handle other form fields
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    const token = sessionStorage.getItem('token');
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('image', formData.image); // Use the correct form field name 'image'
    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', formData.content);
    formDataToSend.append('jenis_aplikasi', formData.jenis_aplikasi);
    formDataToSend.append('pemilik_aplikasi', formData.pemilik_aplikasi);
    formDataToSend.append('pengguna_aplikasi', formData.pengguna_aplikasi);
    formDataToSend.append('buttonUrl', formData.buttonUrl);

    console.log(formDataToSend);

  if (token) {
    fetch('http://localhost:3333/api/v1/aplikasi/upload', {
      method: 'POST',
      body: formDataToSend,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data.filePath) {
          openSuccessDialog('Berhasil Input Data Baru');
          console.log('File path:', data.filePath);
        } else {
          openErrorDialog('File path not found in the response');
          console.error('File path not found in the response');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        openErrorDialog('An error occurred during the upload');
        console.error(error);
      });
  }
  };

  return (
    <Container>
      <Typography variant="h4">Form Input data Aplikasi baru</Typography>
      <form onSubmit={handleSubmit}>
      <Box marginBottom={3} marginTop={3}>
        <FormControl fullWidth>
        <InputLabel htmlFor="image"></InputLabel>
          <TextField
            id="image"
            type="file"
            name="image"
            onChange={handleInputChange}
          />
        </FormControl>
      </Box>
        <Box marginBottom={2}>
          <TextField
            name="title"
            label="Judul Aplikasi"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
        <Box marginBottom={2}>
          <TextField
            name="content"
            label="Konten Aplikasi"
            value={formData.content}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
        <Box marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel id="jenis-aplikasi-label">Jenis Aplikasi</InputLabel>
              <Select
                name="jenis_aplikasi"
                label="jenis-aplikasi-label"
                value={formData.jenis_aplikasi}
                onChange={handleInputChange}
              >
                {jenisAplikasiOptions.map((jenisAplikasi, index) => (
                  <MenuItem key={index} value={jenisAplikasi}>
                    {jenisAplikasi}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
        </Box>

        <Box marginBottom={2}>
          <TextField
            name="pemilik_aplikasi"
            label="Pemilik Aplikasi"
            value={formData.pemilik_aplikasi}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>
        <Box marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel id="pengguna-aplikasi-label">Pengguna Aplikasi</InputLabel>
            <Select
              name="pengguna_aplikasi"
              label="Pengguna Aplikasi"
              value={formData.pengguna_aplikasi}
              onChange={handleInputChange}
            >
              {penggunaAplikasiOptions.map((penggunaAplikasi, index) => (
                <MenuItem key={index} value={penggunaAplikasi}>
                  {penggunaAplikasi}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box marginBottom={2}>
          <TextField
            name="buttonUrl"
            label="Link to App"
            value={formData.buttonUrl}
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
