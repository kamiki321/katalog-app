import { Button, Container, Grid, TextField, Typography, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import LoginHeader from '../../components/LoginHeader';
// import axios from 'axios';

export const LoginAdmin = () => {
  const theme = useTheme;
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('')

  
  const handleEmailChange = (e) => {
    setEmailError('');
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError('');
  };


  const validateForm = () => {
    let isValid = true;
  
    // Validate password length
    if (password.length < 8) {
      setPasswordError('Password harus paling tidak sepanjang 8 character ');
      isValid = false;
    } else {
      setPasswordError('');
    }
  
    // Validate email format
    if (!email.trim()) {
      setEmailError('Email harus mempunyai format example@kemhan.go.id');
    isValid = false;
  } else {
    setEmailError('');
  }
  
    return isValid;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // const validationErrors = validateForm();
  
    if (validateForm()) {
      try {
        
        // const response = await axios.post('http://localhost:3333/api/v1/login', {
        //   email: email,
        //   password: password,
        // });

        const response = await fetch('http://localhost:3333/api/v1/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        })

        if (response.ok) {
          const data = await response.json();
    
          console.log('Respons dari server:', data);
          if (data) {
            // Mengasumsikan token dikembalikan dalam respons
            // console.log('token', data.data.token);
    
            sessionStorage.setItem('token', data.data.token);
    
            const userData = { loggedIn: true, role: data.data.role };
            // console.log(data.data.token);
            sessionStorage.setItem('user', JSON.stringify(userData));
            // Set the token in the context
            setUser(userData);
    
    
            navigate('/dashboard');
          }
        } else {
          const errorData = await response.json();
          console.log(response.status, errorData);
          alert("Terjadi kesalahan di server, Jika anda User silahkan login lewat halaman Login User");
    
        }
      } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan saat melakukan permintaan");
      }
    } else {
      // Handle validation errors
      // alert(validationErrors.join('\n'));
    }
  }

  // Gunakan useEffect untuk mengecek status login saat komponen dimuat
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.loggedIn) {
        navigate('/dashboard');
      }
    }
  }, [navigate]);


  return (
    <div>
      <header>
        <LoginHeader/>
      </header>
      
      <div>
      <Typography  fontFamily="sans-serif" variant="h4" align="center"  sx={styles.spacer}>
      Selamat datang pada Halaman Login Admin Katalog Data Aplikasi 
      </Typography>
      <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: '50px' }}>
      
        <Typography variant="h4" align="center" gutterBottom>
          <img src ="src/assets/logo_kemhan.png" width='80px' height='auto'  />
          <br></br>
          Sign In!
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                autoComplete='email'
                autoFocus
                value={email}
                onChange={handleEmailChange}
                error={Boolean(emailError)}
                helperText={emailError}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                fullWidth
                type="password"
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                error={Boolean(passwordError)}
                helperText={passwordError}
              />
            </Grid>
            <Grid item xs={12}>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={user.loggedIn}
              >
                Masuk Sekarang!
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography 
              variant="h6" 
              align="center" 
              gutterBottom >
                Apakah anda Seorang User?
                <Button  href="/user/login">
                  Kembali
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    </div>
    <footer >
            <Box sx={{
              width: '100%',
              height: 80
            }}
            >
               
                <Typography 
                align = "center"
                variant="h6" sx={styles.appFooter}>© Hak Cipta 2022 - 2023 Pusat Data dan Informasi Kementerian Pertahanan Republik Indonesia</Typography>
            </Box>
    </footer>
    </div>
  )
}


/** @type {import("@mui/material").SxProps} */
const styles = {
  appBar: {
      bgcolor: 'neutral.main'
  },
  spacer: {
      paddingTop: 12,
      margin : 0,
      fontFamily : 'sans-serif'
  },
  appFooter: {
    position: 'sticky',
    padding: 5,
    margin : 0
}
}