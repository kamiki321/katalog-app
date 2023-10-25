import React, { createContext, useEffect, useState } from 'react'

import { ThemeProvider, } from '@mui/material';
import theme from './config/theme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';


import { FAQ } from './Page/PageLain/FAQ';
import { ErrorPage } from './Page/PageLain/ErrorPage';
import ProtectedRoutes from './router/ProtectedRoutes';
import { LoginPage } from './Page/Login/LoginPage';
import KatalogData from './Page/KatalogData/KatalogData';

import KatalogAplikasi from './Page/KatalogApp/KatalogAplikasi';
import { KatalogTIK } from './Page/KatalogTIK/KatalogTIK';
import { Input } from './Page/Input/Input';
import { RegisterForm } from './Page/Register/RegisterForm';
import Analytics from './Page/Dashboard/Analytics';





export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({loggedIn: false});

  useEffect(() => {
    // Cek apakah ada data status login dalam sessionStorage
    const storedUser = sessionStorage.getItem('user');

    if (storedUser) {
      // Jika ada, ambil dan gunakan data status login
      const userData = JSON.parse(storedUser);
      setUser(userData);
    }
  }, []);

  return (
    <HelmetProvider>
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <UserContext.Provider value={{user, setUser}}>
            <BrowserRouter>
              <Routes>
                  <Route path='/' element={<LoginPage/>} />
                  {/* <Route path='/login' element={<LoginPage/>} /> */}
                  <Route path='/register' element={<RegisterForm/>}/>
                  <Route element={<ProtectedRoutes />}>
                    <Route path='/dashboard' element={<Analytics />} />
                    <Route path='/katalog-aplikasi' element={<KatalogAplikasi />} />
                    <Route path='/faq' element={<FAQ />} />
                    <Route path='/katalog-data' element={<KatalogData />} />
                    <Route path='/katalog-tik' element={<KatalogTIK />} />
                    <Route path='/input' element={<Input />} />
                    <Route path='/*' element={<ErrorPage />} />
                  </Route>
              </Routes>
            </BrowserRouter>

          </UserContext.Provider>
        </ThemeProvider>
      </React.Fragment>
    </HelmetProvider>
  )
}


export default App
