import React, { useState } from 'react';
import { Box } from '@mui/material';
import CustomAppBar from '../../PageComponents/MenuPage/CustomAppBar'
import MenuSideBar from '../../PageComponents/MenuPage/MenuSideBar'
import MultiLineChart from '../../ReusableComponents/MultiLineChart';
import DiscountIcon from '../../assets/discount.svg'
import SaleInfoCard from '../../PageComponents/MenuPage/Dashboard/SaleInfoCard';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';


const exampleSeries=[
  {
      "type": "bar",
      "data": [20000, 22000, 18000, 21000, 19000, 23000, 22000, 21000],
      "label": "Gross Sales",
      "color": "#5F9DDD"
  },
  {
      "type": "line",
      "data": [18000, 20000, 16000, 19000, 17000, 21000, 20000, 19000],
      "label": "Net Sales",
      "color": "#28C76F"
  },
  {
      "type": "line",
      "data":[12000, 14000, 11000, 13000, 11500, 14000, 13500, 13000],
      "label": "Cost Of Sales",
      "color": "#ED6D6E"
  },
  {
      "type": "line",
      "data": [6000, 8000, 5000, 6000, 5500, 7000, 6500, 7000],
      "color": "#FF9F43",
      "label": "Gross Sales"
  }
]

const exampleDates = [
  "2024-08-29T07:00:00.594Z",
  "2024-08-29T09:00:00.594Z",
  "2024-08-29T11:00:00.594Z",
  "2024-08-29T13:00:00.594Z",
  "2024-08-29T15:00:00.594Z",
  "2024-08-29T17:00:00.594Z",
  "2024-08-29T19:00:00.594Z",
  "2024-08-29T21:00:00.594Z"
];

const exampleTimeline = 'today';

const exampleSingleLineData = [
  20000,
  22000,
  18000,
  21000,
  19000,
  23000,
  22000,
  21000
];

const MenuPage = () => {

  //todo fix reference lines of MultilineChart 
  return (
    <Box flex={1} minHeight={'100vh'} display="flex" flexDirection="column" justifyContent={'flex-start'} sx={{backgroundColor:'#EDEEF2'}} >
      <CustomAppBar />
      <MenuSideBar  />

      <Routes>
        <Route path='/' element={<Dashboard/>} />
      </Routes>
    </Box>
  );
};

export default MenuPage;
