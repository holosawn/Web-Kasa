import React, { useEffect, useState } from 'react';
import { Box, Icon, MenuItem, Paper, Select, Typography } from '@mui/material';
import CustomAppBar from '../PageComponents/MenuPage/CustomAppBar';
import MenuSideBar from '../PageComponents/MenuPage/MenuSideBar';


const MenuPage = () => {

  return (
    <Box flex={1} minHeight={'100vh'} display="flex" flexDirection="column" justifyContent={'flex-start'} sx={{backgroundColor:'#EDEEF2'}} >
      <CustomAppBar />
      <MenuSideBar  />
    </Box>
  );
};

export default MenuPage;
