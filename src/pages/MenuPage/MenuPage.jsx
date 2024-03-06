import React, { useState } from 'react';
import { Box } from '@mui/material';
import CustomAppBar from '../../PageComponents/MenuPage/CustomAppBar'
import MenuSideBar from '../../PageComponents/MenuPage/MenuSideBar'
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';


const MenuPage = () => {

  return (
    <Box flex={1} minHeight={'100vh'} display="flex" flexDirection="column" justifyContent={'flex-start'} >
      <CustomAppBar />
      <MenuSideBar  />

      <Routes>
        <Route path='/' element={<Dashboard/>} />
      </Routes>
    </Box>
  );
};

export default MenuPage;
