import React, { createContext, useEffect, useState } from 'react'

import { ThemeProvider, } from '@mui/material';
import theme from './config/theme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ProtectedRoutes from './router/ProtectedRoutes';

//Halaman
import { FAQ } from './Page/PageLain/FAQ';
import { ErrorPage } from './Page/PageLain/ErrorPage';
import { LoginPage } from './Page/Login/LoginPage';
import KatalogData from './Page/KatalogData/KatalogData';
import KatalogAplikasi from './Page/KatalogApp/KatalogAplikasi';
import { KatalogTIK } from './Page/KatalogTIK/KatalogTIK';
import { Input } from './Page/Input/Input';
import { RegisterForm } from './Page/Register/RegisterForm';
import Analytics from './Page/Dashboard/Analytics';
import { EditUserAdmin } from './Page/Edit/EditUserAdmin';
import { LoginAdmin } from './Page/Login/LoginAdmin';


export const UserContext = createContext();

function App() {
  const [user, setUser] =  useState({ loggedIn: false, role: '' });

  useEffect(() => {
    // Cek apakah ada data status login dalam sessionStorage
    const token = sessionStorage.getItem('token');
    const storedUser = sessionStorage.getItem('user');

    if (token && storedUser) {
      const userData = JSON.parse(storedUser);
      setUser({ loggedIn: true, userData });
    }
  }, []);

  return (
    <HelmetProvider>
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <UserContext.Provider value={{user, setUser}}>
            <BrowserRouter>
              <Routes>
                  <Route path='/admin/login' element={<LoginAdmin/>} />
                  <Route path='/user/login' element={<LoginPage/>} />
                  <Route path='/user/register' element={<RegisterForm/>}/>
                  <Route element={<ProtectedRoutes />}>
                    <Route path='/dashboard' element={<Analytics />} />
                    <Route path='/katalog/aplikasi' element={<KatalogAplikasi />} />
                    <Route path='/faq' element={<FAQ />} />
                    <Route path='/katalog/data' element={<KatalogData />} />
                    <Route path='/katalog/tik' element={<KatalogTIK />} />
                    {user.role === 'admin' && (
                      <>
                        <Route path="/edit" element={<EditUserAdmin />} />
                        <Route path="/input" element={<Input />} />
                      </>
                    )}
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
