import React, { useEffect, useRef } from 'react';
import { Box, Button, Paper, Tooltip, Typography } from '@mui/material';
import {
  LocalGroceryStoreTwoTone as SaleIcon,
  Loop as RefundsIcon,
  People as CustomersIcon,
  LocalOfferTwoTone as ProductsIcon,
  SettingsTwoTone as SettingsIcon,
  ForwardTwoTone as ForwardIcon,
} from '@mui/icons-material';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import BarChartSharpIcon from '@mui/icons-material/BarChartSharp';
import { useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { t } from 'i18next';
import { useAuth } from '../contexts/AuthContext';
  
const getIconStyle = (pageName, currentPage)=>({
  color: pageName === currentPage ? '#0E4D90' : '#AAC0D7',
  height: 30,
  width: 30,
  ml: 1.4
})

//Color will change if it's button of current page
const getButtonStyle=(pageName, currentPage)=>({
  borderRadius: 0,
  width:'100%',
  maxWidth: 230, 
  minWidth: 50,
  height: 60,
  display:'flex',
  flexDirection:'row',
  justifyContent:'start',
  ...(currentPage === pageName && {
    borderInlineStart: '6px solid #0E4D90',
    backgroundColor: 'background.secondary'
  }),
  transition: 'width 0.3s linear',
  ":hover":{backgroundColor:'background.secondary'},
})

//Color will change if it's description of icon of current page
const IconDescription = ({children, isMenuOpen, currentPage=false ,  color})=>(
  <Typography ml={2} variant='body2' fontSize={{xs:12, sm:14}} textTransform={'none'} color={color ? color : currentPage? '#0E4D90' : 'text.primary'} whiteSpace={'nowrap'} overflow={'hidden'} sx={{transition:'opacity 0.3s', opacity:isMenuOpen? 1 : 0}}
  >
      {children}
  </Typography>
);

// It can be wider according to isMenuOpen state and show info of current user
const MenuSideBar = ({isMenuOpen, setIsMenuOpen, currentUser}) => {
  //Current page name derived from url
  const currentPage = useLocation().pathname.slice(1) || '';
  const { logout } = useAuth()
  const menuRef = useRef();
  const navigate = useNavigate();

  //event handler for closing menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        !event.target.classList.contains('toggleButton') &&
        !event.target.classList.contains('toggleIcon')
        ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <Paper
      ref={menuRef}
      sx={{width: isMenuOpen? 'calc(max(210px, 30vw))':'70px', maxWidth:230, minWidth: 50, position:'sticky', mb:`calc(-100vh + 84px)`,
       top:64, zIndex:999, height:`calc(100vh - 64px)` , transition: 'width 0.3s linear', overflowY:'auto', displayPrint:'none'
      }}
    >
      <Box height={60} display={'flex'} flexDirection={'row'} alignItems={'center'}  >
          <AccountCircleIcon sx={{...getIconStyle('', currentPage), ml:2.5}} />
          
          <Box flexDirection={'column'} overflow={'hidden'} alignItems={'center'} ml={2} sx={{opacity:isMenuOpen? 1 : 0, transition:'opacity 0.3s'}} >
              <Typography fontSize={{xs:12, sm:14}} variant="subtitle2" component="div" textTransform={'none'} overflow={'hidden'} whiteSpace={'nowrap'} >
              {currentUser.name}
              </Typography>
              <Typography fontSize={{xs:12, sm:14}} variant="subtitle2" component="div" textTransform={'none'} overflow={'hidden'} whiteSpace={'nowrap'}>
              {t('menu.loginTime')}: {currentUser.loginTime}
              </Typography>
          </Box>
      </Box>

      
      <Tooltip title='Dashboard' arrow >
        <Button sx={getButtonStyle("menu", currentPage)} onClick={()=> navigate('/menu')} >
            <BarChartSharpIcon sx={getIconStyle('menu', currentPage)} />
            <IconDescription currentPage={'Menu' === currentPage} isMenuOpen={isMenuOpen}>{t('menu.dashboard')}</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title="Sale" arrow>
        <Button aria-label="Sale" sx={getButtonStyle("sale", currentPage)} onClick={()=> navigate('/sale')}>
          <SaleIcon sx={getIconStyle('sale', currentPage)}  />
          <IconDescription isMenuOpen={isMenuOpen} >{t('menu.newSales')}</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title="Refunds" arrow>
        <Button sx={getButtonStyle("refund", currentPage)}>
          <RefundsIcon sx={getIconStyle('refund', currentPage)} />
          <IconDescription currentPage={'refunds' === currentPage} isMenuOpen={isMenuOpen}>{t('menu.refunds')}</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title='Products' arrow>
        <Button sx={getButtonStyle("products", currentPage)} onClick={()=> navigate('/products')} >
            <ProductsIcon sx={getIconStyle('products', currentPage)} />
            <IconDescription currentPage={'products' === currentPage} isMenuOpen={isMenuOpen}>{t('menu.products')}</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title="Customers" arrow>
        <Button sx={getButtonStyle("customers", currentPage)} onClick={() => navigate('/customers')} >
            <CustomersIcon sx={getIconStyle('customers', currentPage)} />
            <IconDescription currentPage={'customers' === currentPage} isMenuOpen={isMenuOpen}>{t('menu.Customers')}</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title='Reports' arrow >
        <Button sx={getButtonStyle("reports", currentPage)} onClick={()=> navigate('/reports')}>
            <LibraryBooksRoundedIcon sx={getIconStyle('reports', currentPage)} />
            <IconDescription currentPage={'reports' === currentPage} isMenuOpen={isMenuOpen}>{t('menu.reports')}</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title='Settings' arrow>
        <Button onClick={()=>{navigate('/settings')}} sx={getButtonStyle("settings", currentPage)}>
            <SettingsIcon sx={getIconStyle('settings', currentPage)} />
            <IconDescription currentPage={'settings' === currentPage} isMenuOpen={isMenuOpen}>{t('menu.settings')}</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title='Exit' arrow>
        <Button onClick={handleLogout} sx={{ ...getButtonStyle("", currentPage), color: 'red' }}>
            <ForwardIcon sx={{ ...getIconStyle('', currentPage), transform: 'rotate(180deg)', color: '#f83e3e' }} />
            <IconDescription isMenuOpen={isMenuOpen} color={'red'}>{t('menu.exit')}</IconDescription>
        </Button>
      </Tooltip>
   
    </Paper>
  );
};

export default MenuSideBar;
