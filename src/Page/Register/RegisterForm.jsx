import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  CssBaseline,
  Typography,
  Link,
  TextField,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import LoginHeader from '../components/LoginHeader';

export const RegisterForm = () =>{
const navigate = useNavigate();
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [usernameError, setUsernameError] = useState('');
const [passwordError, setPasswordError] = useState('');
const [emailError, setEmailError] = useState('');


const handleBackToLogin = (e) => {
  navigate('/user/login')
};

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
  //validate username isn't null
  if (username.trim() === '') {
    setUsernameError('Username is required');
    isValid = false;
  } else {
    setUsernameError('');
  }

  // Validate password length
  if (password.length < 8) {
    setPasswordError('Password harus paling tidak sepanjang 8 character ');
    isValid = false;
  } else {
    setPasswordError('');
  }

  // Validate email format
  const emailRegex = /^[A-Za-z0-9._%+-]+@kemhan\.go\.id$/;
  if (!email.match(emailRegex)) {
    setEmailError('Email harus mempunyai format example@kemhan.go.id');
    isValid = false;
  } else {
    setEmailError('');
  }

  return isValid;
};


const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      const response = await fetch('http://localhost:3333/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username, email, password 
        }),
      })

      if(response.ok){
        const data = await response.json();
        console.log('Respons dari server : ', data)
        if (data) {
          alert("Berhasil!");
          navigate('/user/login');
        } else{
          const errorData = await response.json();
          console.log(response.status, errorData);
          alert("Terjadi kesalahan di server");
        }
      }
    } catch (error) {
        console.error(error);
        alert('Registration failed');
    }
      // .then((response) => {
      //   if (response.ok) {
      //     return response.json();
      //   } else {
      //     throw new Error('Registration failed');
      //   }
      // })
      // .then((data) => {
      //   console.log(data);
      //   alert("Berhasil!");
      //   navigate('/');
      // })
      // .catch((error) => {
      //   console.error(error);
      //   alert("Terjadi kesalahan saat melakukan permintaan");
      // });
  }
};


return (
  <div>
  <AppBar position="static" color="primary">
        <Toolbar>

        <img src ="src/assets/logo.png" width='300px' height='auto'  />

        </Toolbar>
  </AppBar>
  <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={3} // You can adjust the elevation for the card-like effect
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 4, // Add margin from the top
            padding: 3, // Add padding inside the card
          }}
        >
          <img src ="src/assets/logo_kemhan.png" width='80px' height='auto'  />
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form
        sx={{
          width: '100%',
          marginTop: 2,
        }}
        noValidate
        onSubmit={handleSubmit}
      >
        {/* Registration form fields go here */}
        <TextField
           variant="outlined"
           margin="normal"
           fullWidth
           label="Username"
           name="username"
           autoComplete="username"
           autoFocus
           value={username}
           onChange={(e) => setUsername(e.target.value)}
           error={Boolean(usernameError)}
           helperText={usernameError}
           required
        />
        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            name="email"
            autoFocus
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
            error={Boolean(emailError)}
            helperText={emailError}
            required
        />

        <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            error={Boolean(passwordError)}
            helperText={passwordError}
            required
        />

        {/* Add more fields as needed */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }} // Add margin to the button
        >
          Register
        </Button>
      </form>
          <Link
            component="button"
            variant="body2"
            onClick={handleBackToLogin}
            sx={{ cursor: 'pointer', marginTop: 5 }} // Add margin to the link
          >
            <ArrowBackIcon sx={{ marginRight: 1 }} /> Back to Login
          </Link>
        </Paper>
      </Container>
    </div>
  );
}
