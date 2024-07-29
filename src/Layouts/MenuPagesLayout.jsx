import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import  MenuSideBar from './MenuSideBar';
import CustomAppBar from './CustomAppBar';
import useFetchData from '../CustomHooks/useFetchData';
import { Box } from '@mui/material';
import ErrorPage from '../pages/ErrorAndLoadingPages/ErrorPage';
import LoadingPage from '../pages/ErrorAndLoadingPages/LoadingPage';

const MenuPagesLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [data, isLoading, error] = useFetchData('/marketStatus')

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
      <CustomAppBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} marketStatus={data} />
      <MenuSideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} currentUser={data.currentUser} />
      <Outlet/>
    </Box>
  );
};

export default MenuPagesLayout;
