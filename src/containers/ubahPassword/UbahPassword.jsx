import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export const UbahPassword = () => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePassword = () => {
    // Add your logic to change the password here
    // You can use the 'password' state to get the new password
    // Make an API call or perform any necessary actions
    // Then, close the dialog
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Ubah Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ubah Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Silakan masukkan password baru Anda.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Password Baru"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Batal
          </Button>
          <Button onClick={handleChangePassword} color="primary">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
