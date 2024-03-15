import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import { LanguageProvider } from './contexts/LangContext';
import { BrowserRouter } from 'react-router-dom';
import { CustomThemeProvider } from './contexts/CutomThemeContext';
import MenuPage from './pages/MenuPage/MenuPage';
import Sale from './pages/SalePage/Sale';



function App() {

  return (
    <CustomThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route index path='/' element={<LoginPage/>} />
            <Route path='/Menu' element={<MenuPage/>} />
            <Route path='/Sale' element={<Sale/>} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </CustomThemeProvider>
  );
}

export default App;
