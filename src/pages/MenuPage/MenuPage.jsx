import React, { useState } from 'react';
import { Box } from '@mui/material';
import CustomAppBar from '../../PageComponents/MenuPage/CustomAppBar'
import MenuSideBar from '../../PageComponents/MenuPage/MenuSideBar'
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useCustomTheme } from '../../contexts/CutomThemeContext';


const MenuPage = () => {
  const {mode} = useCustomTheme();


  //todo fix reference lines of MultilineChart 
  return (
    <Box flex={1} minHeight={'100vh'} display="flex" flexDirection="column" justifyContent={'flex-start'} bgcolor={mode ==='light' && '#ECEEF2'}  >
      <CustomAppBar />
      <MenuSideBar  />

      <Routes>
        <Route path='/' element={<Dashboard/>} />
      </Routes>
    </Box>
  );
};

export default MenuPage;
