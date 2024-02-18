import React, { useState } from 'react';
import { Box, Button, IconButton, Paper, Tooltip, Typography, useTheme } from '@mui/material';
import {
  LocalGroceryStoreTwoTone as SaleIcon,
  Loop as RefundsIcon,
  FeedTwoTone as ReportsIcon,
  LocalOfferTwoTone as ProductsIcon,
  SettingsTwoTone as SettingsIcon,
  ForwardTwoTone as ForwardIcon,
} from '@mui/icons-material';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import BarChartSharpIcon from '@mui/icons-material/BarChartSharp';
import { useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const MenuSideBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState();

  const currentPage = useLocation().pathname.slice(1);

  const breakpointValues = useTheme().breakpoints.values;
  const isSmall = window.innerWidth < breakpointValues.sm
  console.log("SideBar rendered")

  
  const getIconStyle = (pageName)=>({
    color: pageName === currentPage ? '#0E4D90' : '#AAC0D7',
    height: 30,
    width: 30,
    ml: {sm:1.4, xs:0.3}
  })

  const getButtonStyle=(pageName)=>({
    borderRadius: 0,
    width:'100%',
    maxWidth: isMenuOpen? 210:73, 
    minWidth: isMenuOpen? 150: 50,
    height: 60,
    display:'flex',
    flexDirection:'row',
    justifyContent:'start',
    backgroundColor: 'white',
    ...(currentPage === pageName && {
      borderInlineStart: '6px solid #0E4D90',
      backgroundColor: '#F0F2F5'
    }),
    ":hover":{backgroundColor:'#F0F2F5'},
  })

  const IconDescription = ({children})=>(
    isMenuOpen && <Typography ml={2} variant='body2' fontSize={{xs:12, sm:14}} textTransform={'none'} color={'#0E4D90'} whiteSpace={'nowrap'} overflow={'hidden'}
    >
        {children}
    </Typography>
  )

  const toggleIsMenuOpen= ()=>{
    setIsMenuOpen(prev=>!prev);
  }

  return (
    <Paper elevation={1} sx={{width: isMenuOpen? '30vw':'10vw', maxWidth: isMenuOpen? 210:73, minWidth: isMenuOpen?150: 50, position:'fixed', 
      left:0, top:64, zIndex:999, backgroundColor: 'white', height:`calc(100vh - 64px)` , transition: 'width 0.2s ease', overflowy:'scroll',
     
    }}>
      <Box height={60} display={'flex'} flexDirection={'row'} alignItems={'center'}  >
          <AccountCircleIcon sx={{...getIconStyle(''), ml:{sm:2.5, xs:1.2}}} />
          { isMenuOpen &&
          <Box flexDirection={'column'} overflow={'hidden'} alignItems={'center'} ml={1}>
              <Typography fontSize={{xs:12, sm:14}} variant="subtitle2" component="div" textTransform={'none'} overflow={'hidden'} whiteSpace={'nowrap'} >
              Kate Grimes
              </Typography>
              <Typography fontSize={{xs:12, sm:14}} variant="subtitle2" component="div" color={'gray'} textTransform={'none'} overflow={'hidden'} whiteSpace={'nowrap'}>
              Login Time: 12:26 
              </Typography>
          </Box>}
      </Box>

      <Tooltip title="Sale" arrow>
        <Button aria-label="Sale" sx={getButtonStyle("Sale")}>
          <SaleIcon sx={getIconStyle('Sale')} />
          {isMenuOpen && <IconDescription>New Sales</IconDescription>}
        </Button>
      </Tooltip>
      <Tooltip title="Refunds" arrow>
        <Button sx={getButtonStyle("Refund")}>
          <RefundsIcon sx={getIconStyle('Refund')} />
          {isMenuOpen && <IconDescription>Refunds</IconDescription>}
        </Button>
      </Tooltip>
      <Tooltip title="Manage Sales" arrow>
        <Button sx={getButtonStyle("ManageSales")}>
            <ReportsIcon sx={getIconStyle('ManageSales')} />
            <IconDescription>Manage Sales</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title='Products' arrow>
        <Button sx={getButtonStyle("Products")}>
            <ProductsIcon sx={getIconStyle('Products')} />
            <IconDescription>Products</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title='Reports' arrow >
        <Button sx={getButtonStyle("Reports")}>
            <LibraryBooksRoundedIcon sx={getIconStyle('Reports')} />
            <IconDescription>Reports</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title='Dashboard' arrow >
        <Button sx={getButtonStyle("Menu")}>
            <BarChartSharpIcon sx={getIconStyle('Menu')} />
            <IconDescription>Dashboard</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title='Settings' arrow>
        <Button sx={getButtonStyle("Settings")}>
            <SettingsIcon sx={getIconStyle('Settings')} />
            <IconDescription>Settings</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title='Exit' arrow>
        <Button sx={{ ...getButtonStyle(""), color: 'red' }}>
            <ForwardIcon sx={{ ...getIconStyle(''), transform: 'rotate(180deg)', color: '#f83e3e' }} />
            <IconDescription>Exit</IconDescription>
        </Button>
      </Tooltip>
        <IconButton onClick={toggleIsMenuOpen} sx={{
            position:'absolute',
            height:50,
            top:-50,
            right:0,
            left:0,
            width:70,
            display:'flex',
            justifyContent:'start',
            alignItems:'center'
        }}>
            <MenuSharpIcon sx={{...getIconStyle(''), color:'white', ":hover":{cursor:'pointer'}, ml: {sm:1.4, xs:0.3}}} />
        </IconButton>
   
    </Paper>
  );
};

export default MenuSideBar;
