// src/layouts/LayoutWithSidebar.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import  MenuSideBar from './MenuSideBar';
import CustomAppBar from './CustomAppBar';
import useFetchData from '../CustomHooks/useFetchData';
import { Box, Typography } from '@mui/material';
import { t } from 'i18next';

const MenuPagesLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const[data, isLoading, error] = useFetchData('/MenuLayoutData')


  if (isLoading) {
    return (
      <Box flex={1} minHeight={'100vh'} display="flex" flexDirection="column" position={'relative'} justifyContent={'flex-start'} >
        <Typography>...{('common.loading')}</Typography>
        <Outlet/>
      </Box>
    );
  }

  if (error) {
    return (
      <Box flex={1} minHeight={'100vh'} display="flex" flexDirection="column" position={'relative'} justifyContent={'flex-start'} >
        <Typography>Error Loading </Typography>
        <Outlet/>
      </Box>
    );
  }


  return (
    <Box flex={1} height={'100%'} minHeight={375} width={'100%'} minWidth={665} display={'flex'} flexDirection={'column'} position={'relative'} justifyContent={'flex-start'}  >
      <CustomAppBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} marketStatus={data.marketStatus} />
      <MenuSideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} currentUser={data.currentUser} />
      <Outlet/>
    </Box>
  );
};

export default MenuPagesLayout;
