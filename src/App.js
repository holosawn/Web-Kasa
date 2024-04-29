import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import { LanguageProvider, useLanguage } from './contexts/LangContext';
import { BrowserRouter } from 'react-router-dom';
import { CustomThemeProvider } from './contexts/CutomThemeContext';
import MenuPage from './pages/MenuPage/MenuPage';
import Sale from './pages/SalePage/Sale';
import { ShiftStatusProvider } from './contexts/ShiftContext';
import Payment from './pages/PaymentPage/Payment';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import Settings from './pages/SettingsPage/Settings';



function App() {

  return (
    <CustomThemeProvider>
      <LanguageProvider>
        <ShiftStatusProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/Login" />} />
              <Route path='/Login' element={<LoginPage/>} />
              <Route path='/Menu' element={<MenuPage/>} />
              <Route path='/Settings' element={<Settings/>} />
              <Route path='/Sale' element={<Sale/>} />
              <Route path='/Payment' element={<Payment/>} />
              <Route path='/Products' element={<ProductsPage/>} />
            </Routes>
          </BrowserRouter>
        </ShiftStatusProvider>
      </LanguageProvider>
    </CustomThemeProvider>
  );
}

export default App;
