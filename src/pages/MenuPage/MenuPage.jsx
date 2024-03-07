import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CustomAppBar from '../../PageComponents/MenuPage/CustomAppBar'
import MenuSideBar from '../../PageComponents/MenuPage/MenuSideBar'
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import useFetchData from '../../CustomHooks/useFetchData';
import { t } from 'i18next';


const MenuPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //todo current cashies info is static

  const{data, isLoading, error} = useFetchData('/MenuLayoutData')

  if (isLoading) {
    return (
      <Box>
        <Typography>...{t('common.loading')}</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography>{error}</Typography>
      </Box>
    );
  };

  if(!isLoading) return (
    <Box flex={1} minHeight={'100vh'} display="flex" flexDirection="column" justifyContent={'flex-start'} >
      <CustomAppBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} marketStatus={data.marketStatus} />
      <MenuSideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} currentUser={data.currentUser} />

      <Routes>
        <Route path='/' element={<Dashboard/>} />
      </Routes>
    </Box>
  );
};

export default MenuPage;
