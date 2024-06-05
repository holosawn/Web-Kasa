import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import { LanguageProvider, useLanguage } from './contexts/LangContext';
import { BrowserRouter } from 'react-router-dom';
import { CustomThemeProvider } from './contexts/CutomThemeContext';
import SalePage from './pages/SalePage/SalePage';
import { ShiftStatusProvider } from './contexts/ShiftContext';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import Settings from './pages/SettingsPage/SettingsPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import ReportsPage from './pages/ReportsPage/ReportsPage';
import MenuPagesLayout from './Layouts/MenuPagesLayout'
import { Box } from '@mui/material';
import Dashboard from './pages/MenuPage/Dashboard';



function App() {

  return (
    <CustomThemeProvider>
      <LanguageProvider>
        <ShiftStatusProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/Login" />} />
              <Route path='/Login' element={<LoginPage/>} />
              <Route path='/Settings' element={<Settings/>} />
              <Route path='/Sale' element={<SalePage/>} />
              <Route path='/Payment' element={<PaymentPage/>} />
              <Route path='/Products' element={<ProductsPage/>} />
              <Route element={<MenuPagesLayout/>} >
                <Route path='/Menu' element={<Dashboard/>} />
                <Route path='/Reports' element={<ReportsPage/>} />
                <Route path='/test' element={<Box>kekeek</Box>} />
              </Route>

          </Routes>
          </BrowserRouter>
        </ShiftStatusProvider>
      </LanguageProvider>
    </CustomThemeProvider>
  );
}

export default App;
