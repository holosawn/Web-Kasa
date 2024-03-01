import React, { useEffect, useState } from 'react';
import { Box, Icon, MenuItem, Paper, Select, Typography } from '@mui/material';
import CustomAppBar from './CustomAppBar';
import MenuSideBar from './MenuSideBar';
import DashBoard from './DashBoard';


const MenuPage = () => {

  return (
    <Box flex={1} minHeight={'100vh'} display="flex" flexDirection="column" justifyContent={'flex-start'} sx={{backgroundColor:'#EDEEF2'}} >
      <CustomAppBar />
      <MenuSideBar  />
      <DashBoard />
    </Box>
  );
};

export default MenuPage;
