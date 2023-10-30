import React, { useState } from 'react';
import {
  Button,
  Container,
  Typography,
  TextField,
  CircularProgress,
} from '@mui/material';

export const InputData = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File berhasil diunggah.');
      } else {
        alert('Gagal mengunggah file.');
      }
    } catch (error) {
      console.error('Error mengunggah file:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h6">Upload Data Baru (.csv/.xlsx)</Typography>
      <input
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        style={{ display: 'none' }}
        id="file-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          value={selectedFile ? selectedFile.name : ''}
          InputProps={{
            readOnly: true,
          }}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          component="span"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ marginBottom: 2 }}
        >
          Pilih File
        </Button>
      </label>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleUpload}
        disabled={!selectedFile || loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload'}
      </Button>
    </Container>
  );
}
