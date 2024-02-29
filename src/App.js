import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import { LanguageProvider } from './contexts/LangContext';
import { BrowserRouter } from 'react-router-dom';
import { CustomThemeProvider } from './contexts/CutomThemeContext';
import MenuPage from './pages/MenuPage/MenuPage';



function App() {

  return (
    <CustomThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route index path='/' element={<LoginPage/>} />
            <Route path='Menu' element={<MenuPage/>} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </CustomThemeProvider>
  );
}

export default App;
