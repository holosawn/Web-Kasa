import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import { LanguageProvider } from './contexts/LangContext';
import { BrowserRouter } from 'react-router-dom';
import { CustomThemeProvider } from './contexts/CutomThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import SalePage from './pages/SalePage/SalePage';
import { ShiftStatusProvider } from './contexts/ShiftContext';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import Settings from './pages/SettingsPage/SettingsPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import ReportsPage from './pages/ReportsPage/ReportsPage';
import MenuPagesLayout from './Layouts/MenuPagesLayout'
import Dashboard from './pages/MenuPage/Dashboard';
import Authorization from './Auth/Authorization';


function App() {

  return (
    <CustomThemeProvider>
      <LanguageProvider>
        <ShiftStatusProvider>
            <BrowserRouter>
              <AuthProvider>
                <Routes>
                  <Route path="/" element={<Navigate to="/Login" />} />
                  <Route path='/Login' element={<LoginPage/>} />

                  <Route element={<Authorization />}>
                    <Route path='/Settings' element={<Settings/>} />
                  </Route>

                  <Route element={<Authorization allowedRoles={['cashier']} />}>
                    <Route path='/Sale' element={<SalePage/>} />
                    <Route path='/Payment' element={<PaymentPage/>} />
                    <Route path='/Products' element={<ProductsPage/>} />
                  </Route>


                  <Route element={<MenuPagesLayout/>} >
                    <Route element={<Authorization />}>
                      <Route path='/Menu' element={<Dashboard/>} />
                    </Route>
                    <Route element={<Authorization allowedRoles={['admin']} />}>
                      <Route path='/Reports' element={<ReportsPage/>} />
                    </Route>
                  </Route>

                </Routes>
              </AuthProvider>
            </BrowserRouter>
        </ShiftStatusProvider>
      </LanguageProvider>
    </CustomThemeProvider>
  );
}

export default App;
