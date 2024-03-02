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
  
const getIconStyle = (pageName, currentPage)=>({
  color: pageName === currentPage ? '#0E4D90' : '#AAC0D7',
  height: 30,
  width: 30,
  ml: 1.4
})

const getButtonStyle=(pageName, currentPage)=>({
  borderRadius: 0,
  width:'100%',
  maxWidth: 210, 
  minWidth: 50,
  height: 60,
  display:'flex',
  flexDirection:'row',
  justifyContent:'start',
  backgroundColor: 'white',
  ...(currentPage === pageName && {
    borderInlineStart: '6px solid #0E4D90',
    backgroundColor: '#F0F2F5'
  }),
  transition: 'width 0.3s linear',
  ":hover":{backgroundColor:'#F0F2F5'},
})

const IconDescription = ({children, isMenuOpen, color})=>(
  <Typography ml={2} variant='body2' fontSize={{xs:12, sm:14}} textTransform={'none'} color={color ? color : '#0E4D90'} whiteSpace={'nowrap'} overflow={'hidden'} sx={{transition:'opacity 0.3s', opacity:isMenuOpen? 1 : 0}}
  >
      {children}
  </Typography>
);

const MenuSideBar = () => {
  //todo scroll, workerInfo, responsivenes
  const [isMenuOpen, setIsMenuOpen] = useState();
  const currentPage = useLocation().pathname.slice(1) || '';
  
  console.log("SideBar rendered")

  const toggleIsMenuOpen= ()=>{
    setIsMenuOpen(prev=>!prev);
  };

  return (
    <Paper elevation={1} sx={{width: isMenuOpen? '30vw':'70px', maxWidth:   210, minWidth: 50, position:'fixed', 
      left:0, top:64, zIndex:999, backgroundColor: 'white', height:`calc(100vh - 64px)` , transition: 'width 0.3s linear', overflowy:'auto',
     
    }}>
      <Box height={60} display={'flex'} flexDirection={'row'} alignItems={'center'}  >
          <AccountCircleIcon sx={{...getIconStyle('', currentPage), ml:2.5}} />
          
          <Box flexDirection={'column'} overflow={'hidden'} alignItems={'center'} ml={2} sx={{opacity:isMenuOpen? 1 : 0, transition:'opacity 0.3s'}} >
              <Typography fontSize={{xs:12, sm:14}} variant="subtitle2" component="div" color={'gray'} textTransform={'none'} overflow={'hidden'} whiteSpace={'nowrap'} >
              Kate Grimes
              </Typography>
              <Typography fontSize={{xs:12, sm:14}} variant="subtitle2" component="div" color={'gray'} textTransform={'none'} overflow={'hidden'} whiteSpace={'nowrap'}>
              Login Time: 12:26 
              </Typography>
          </Box>
      </Box>

      <Tooltip title="Sale" arrow>
        <Button aria-label="Sale" sx={getButtonStyle("Sale", currentPage)}>
          <SaleIcon sx={getIconStyle('Sale', currentPage)} />
          <IconDescription isMenuOpen={isMenuOpen} >New Sales</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title="Refunds" arrow>
        <Button sx={getButtonStyle("Refund", currentPage)}>
          <RefundsIcon sx={getIconStyle('Refund', currentPage)} />
          <IconDescription isMenuOpen={isMenuOpen}>Refunds</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title="Manage Sales" arrow>
        <Button sx={getButtonStyle("ManageSales", currentPage)}>
            <ReportsIcon sx={getIconStyle('ManageSales', currentPage)} />
            <IconDescription isMenuOpen={isMenuOpen}>Manage Sales</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title='Products' arrow>
        <Button sx={getButtonStyle("Products", currentPage)}>
            <ProductsIcon sx={getIconStyle('Products', currentPage)} />
            <IconDescription isMenuOpen={isMenuOpen}>Products</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title='Reports' arrow >
        <Button sx={getButtonStyle("Reports", currentPage)}>
            <LibraryBooksRoundedIcon sx={getIconStyle('Reports', currentPage)} />
            <IconDescription isMenuOpen={isMenuOpen}>Reports</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title='Dashboard' arrow >
        <Button sx={getButtonStyle("Menu", currentPage)}>
            <BarChartSharpIcon sx={getIconStyle('Menu', currentPage)} />
            <IconDescription isMenuOpen={isMenuOpen}>Dashboard</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title='Settings' arrow>
        <Button sx={getButtonStyle("Settings", currentPage)}>
            <SettingsIcon sx={getIconStyle('Settings', currentPage)} />
            <IconDescription isMenuOpen={isMenuOpen}>Settings</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title='Exit' arrow>
        <Button sx={{ ...getButtonStyle("", currentPage), color: 'red' }}>
            <ForwardIcon sx={{ ...getIconStyle('', currentPage), transform: 'rotate(180deg)', color: '#f83e3e' }} />
            <IconDescription isMenuOpen={isMenuOpen} color={'red'}>Exit</IconDescription>
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
            alignItems:'center',
            color:'red'
        }}>
            <MenuSharpIcon sx={{...getIconStyle('', currentPage), color:'white', ":hover":{cursor:'pointer'}}} />
        </IconButton>
   
    </Paper>
  );
};

export default MenuSideBar;
