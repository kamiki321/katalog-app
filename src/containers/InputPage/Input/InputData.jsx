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
        // Send the file to your backend API using a fetch or axios
        const response = await fetch('/upload', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          alert('File uploaded successfully.');
        } else {
          alert('File upload failed.');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Container>
        <Typography variant="h6">Upload Data Baru (.csv/xlsx)</Typography>
        <input
          accept="image/*"
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
            sx={{ marginBottom: 2 }} // Add margin to the label
          />
          <Button
            variant="contained"
            component="span"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ marginBottom: 2 }} // Add margin to the button
          >
            Select File
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

    