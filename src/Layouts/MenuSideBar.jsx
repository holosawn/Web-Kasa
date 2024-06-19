import React, { useEffect, useRef } from 'react';
import { Box, Button, Paper, Tooltip, Typography } from '@mui/material';
import {
  LocalGroceryStoreTwoTone as SaleIcon,
  Loop as RefundsIcon,
  FeedTwoTone as ReportsIcon,
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

//Color will change if it's button of current
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

//Color will change if it's description of icon of current
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
        <Button sx={getButtonStyle("Menu", currentPage)} onClick={()=> navigate('/Menu')} >
            <BarChartSharpIcon sx={getIconStyle('Menu', currentPage)} />
            <IconDescription currentPage={'Menu' === currentPage} isMenuOpen={isMenuOpen}>{t('menu.dashboard')}</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title="Sale" arrow>
        <Button aria-label="Sale" sx={getButtonStyle("Sale", currentPage)} onClick={()=> navigate('/Sale')}>
          <SaleIcon sx={getIconStyle('Sale', currentPage)}  />
          <IconDescription isMenuOpen={isMenuOpen} >{t('menu.newSales')}</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title="Refunds" arrow>
        <Button sx={getButtonStyle("Refund", currentPage)}>
          <RefundsIcon sx={getIconStyle('Refund', currentPage)} />
          <IconDescription currentPage={'Refunds' === currentPage} isMenuOpen={isMenuOpen}>{t('menu.refunds')}</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title="Manage Sales" arrow>
        <Button sx={getButtonStyle("ManageSales", currentPage)}>
            <ReportsIcon sx={getIconStyle('ManageSales', currentPage)} />
            <IconDescription currentPage={'ManageSales' === currentPage} isMenuOpen={isMenuOpen}>{t('menu.manageSales')}</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title='Products' arrow>
        <Button sx={getButtonStyle("Products", currentPage)} onClick={()=> navigate('/Products')} >
            <ProductsIcon sx={getIconStyle('Products', currentPage)} />
            <IconDescription currentPage={'Products' === currentPage} isMenuOpen={isMenuOpen}>{t('menu.products')}</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title='Reports' arrow >
        <Button sx={getButtonStyle("Reports", currentPage)} onClick={()=> navigate('/Reports')}>
            <LibraryBooksRoundedIcon sx={getIconStyle('Reports', currentPage)} />
            <IconDescription currentPage={'Reports' === currentPage} isMenuOpen={isMenuOpen}>{t('menu.reports')}</IconDescription>
        </Button>
      </Tooltip>
      <Tooltip title='Settings' arrow>
        <Button onClick={()=>{navigate('/Settings')}} sx={getButtonStyle("Settings", currentPage)}>
            <SettingsIcon sx={getIconStyle('Settings', currentPage)} />
            <IconDescription currentPage={'Settings' === currentPage} isMenuOpen={isMenuOpen}>{t('menu.settings')}</IconDescription>
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
