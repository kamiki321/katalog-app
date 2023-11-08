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
  const [user, setUser] =  useState({ loggedIn: false, role : 'user'});
  const [isAdmin, setIsAdmin] = useState({ role : 'admin'})

  useEffect(() => {
    // Cek apakah ada data status login dalam sessionStorage
    const token = sessionStorage.getItem('token');
    const storedUser = sessionStorage.getItem('user');
    const role = sessionStorage.getItem('role')
    if (token && storedUser && role) {
      const userData = JSON.parse(storedUser);
      const userRole = role
      setUser({ loggedIn: true, userData });
      setIsAdmin({ userRole })
    }
  }, []);

  return (
    <HelmetProvider>
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <UserContext.Provider value={{user, setUser}}>
            <BrowserRouter>
              <Routes>
                  <Route path='/login-admin' element={<LoginAdmin/>} />
                  <Route path='/login' element={<LoginPage/>} />
                  <Route path='/register' element={<RegisterForm/>}/>
                  <Route element={<ProtectedRoutes />}>
                    <Route path='/dashboard' element={<Analytics />} />
                    <Route path='/katalog/aplikasi' element={<KatalogAplikasi />} />
                    <Route path='/faq' element={<FAQ />} />
                    <Route path='/katalog/data' element={<KatalogData />} />
                    <Route path='/katalog/tik' element={<KatalogTIK />} />
                    <Route path="/edit" element={<EditUserAdmin />} />
                    <Route path="/input" element={<Input />} />
                    {isAdmin.role === 'admin' && (
                      <>
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
