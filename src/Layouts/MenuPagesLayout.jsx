// src/layouts/LayoutWithSidebar.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import  MenuSideBar from './MenuSideBar';
import CustomAppBar from './CustomAppBar';
import useFetchData from '../CustomHooks/useFetchData';
import { Box, Typography } from '@mui/material';
import { t } from 'i18next';
import ErrorPage from '../pages/ErrorAndLoadingPages/ErrorPage';
import LoadingPage from '../pages/ErrorAndLoadingPages/LoadingPage';

const MenuPagesLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const[data, isLoading, error] = useFetchData('/MenuLayoutData')

  // console.log(error, isLoading);


  if (isLoading) {
    return (
      <LoadingPage/>
    );
  }

  if (error) {
    return (
      <ErrorPage/>
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
