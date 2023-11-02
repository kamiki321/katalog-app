import React, { useState } from 'react';
import {
  Button,
  Container,
  Typography,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';

export const InputData = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    no_katalog_data: '',
    kode_satker: '',
    tahun: '',
    no_urut: '',
    satker: '',
    nama_dataset: '',
    objek_data: '',
    variabel_pembentuk: '',
    format_dokumen_data: '',
    jenis_data: '',
    status: '',
    produsen_data: '',
    jadwal_pemutakhiran: '',
    tagging_data_prioritas: '',
    prioritas_nasional: '',
    program_prioritas: '',
    kesepakatan_berbagi_data: '',
    link_api: '',
    kesepakatan_pengumpulan_data: '',
    catatan: '',
    dasar_hukum: '',
    kategori: ''
  });

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
      kode_satker: '',
      tahun: '',
      no_urut: '',
      satker: '',
      nama_dataset: '',
      objek_data: '',
      variabel_pembentuk: '',
      format_dokumen_data: '',
      jenis_data: '',
      status: '',
      produsen_data: '',
      jadwal_pemutakhiran: '',
      tagging_data_prioritas: '',
      prioritas_nasional: '',
      program_prioritas: '',
      kesepakatan_berbagi_data: '',
      link_api: '',
      kesepakatan_pengumpulan_data: '',
      catatan: '',
      dasar_hukum: '',
      kategori: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    const token = sessionStorage.getItem('token');
    e.preventDefault();
    setIsLoading(true);

    if (token) {
      // Contoh pengiriman data ke server (gunakan URL sebenarnya Anda)
      fetch('http://localhost:3333/api/v1/input/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          setFormData({ ...formData, no_katalog_data: data.newData });
          openSuccessDialog('Data uploaded successfully');
          console.log(data);
        })
        .catch((error) => {
          setIsLoading(false);
          openErrorDialog('An error occurred during the upload');
          console.error(error);
        });
    } else {
      setIsLoading(false);
      openErrorDialog('Token is missing. Please log in.');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Formulir Input Data</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="kode_satker"
              label="Kode Satker"
              value={formData.kode_satker}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="tahun"
              label="Tahun"
              value={formData.tahun}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="no_urut"
              label="Nomor Urut"
              value={formData.no_urut}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="satker"
              label="Satker"
              value={formData.satker}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="nama_dataset"
              label="Nama Dataset"
              value={formData.nama_dataset}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="objek_data"
              label="Objek Data"
              value={formData.objek_data}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="variabel_pembentuk"
              label="Variabel Pembentuk"
              value={formData.variabel_pembentuk}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="format_dokumen_data"
              label="Format Dokumen Data"
              value={formData.format_dokumen_data}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="jenis_data"
              label="Jenis Data"
              value={formData.jenis_data}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="status"
              label="Status"
              value={formData.status}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="produsen_data"
              label="Produsen Data"
              value={formData.produsen_data}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="jadwal_pemutakhiran"
              label="Jadwal Pemutakhiran"
              value={formData.jadwal_pemutiran}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="tagging_data_prioritas"
              label="Tagging Data Prioritas"
              value={formData.tagging_data_prioritas}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="prioritas_nasional"
              label="Prioritas Nasional"
              value={formData.prioritas_nasional}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="program_prioritas"
              label="Program Prioritas"
              value={formData.program_prioritas}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="kesepakatan_berbagi_data"
              label="Kesepakatan Berbagi Data"
              value={formData.kesepakatan_berbagi_data}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="link_api"
              label="Link API"
              value={formData.link_api}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="kesepakatan_pengumpulan_data"
              label="Kesepakatan Pengumpulan Data"
              value={formData.kesepakatan_pengumpulan_data}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="catatan"
              label="Catatan"
              value={formData.catatan}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="dasar_hukum"
              label="Dasar Hukum"
              value={formData.dasar_hukum}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="kategori"
              label="Kategori"
              value={formData.kategori}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
        </Grid>
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
