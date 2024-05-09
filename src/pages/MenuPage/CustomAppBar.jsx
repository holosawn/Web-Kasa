import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import data from '../../Data/MenuLayoutData.json'
import FiberManualRecord from '@mui/icons-material/FiberManualRecord';
import { useLocation } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { t } from 'i18next';

// It will toggle the Siderbar menu and show marketStatus
export default function CustomAppBar({ setIsMenuOpen, marketStatus}) {

  const currentPage = useLocation().pathname.slice(1);

  const toggleIsMenuOpen= (e)=>{
    setIsMenuOpen(prev => !prev);
  };

  return (
    <AppBar position="static" sx={{height:'64px', maxHeight:'64px', minHeight:'64px', width:'100%', position:'sticky', top:0, zIndex:998 }}  >
      <Toolbar sx={{
        height:'100%',
      }} >

        <IconButton onClick={toggleIsMenuOpen}  className="toggleButton"sx={{height:50, width:70, display:'flex', justifyContent:'center', alignItems:'center', position:'absolute', left:0}} >
          <MenuSharpIcon className='toggleIcon' sx={{ color:'white', ":hover":{cursor:'pointer'}, height: 30, width: 30}} />
        </IconButton>

        <Typography  variant='h6' position={'relative'} ml={9.5} mb={1} sx={{ fontSize: '20px' }}>
          {t(`menu.${currentPage}`)}
        </Typography>

        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} position={'absolute'} bottom={0} left={0} ml={12}>
          <FiberManualRecord sx={{color: marketStatus ? 'green' : 'red', width:0.17, mr:1}}  />
          <Typography variant='subtitle2' fontSize={{xs:12, sm:14}} sx={{ fontSize: '12px' }}>
              {t('menu.statusStr')}{marketStatus ? t('menu.online') : t('menu.offline')}
          </Typography>
          </Box>

        <Box  justifyContent={'center'} mr={3} ml={'auto'}>
          <Typography variant='subtitle2' sx={{fontSize:{xs:12, sm:14}}}> {t('menu.storeNo')}: {data.marketNo} </Typography>
          <Typography variant='subtitle2' sx={{fontSize:{xs:12, sm:14}}}>{t('menu.counterNo')}: {data.counterNo} ({data.counterName})</Typography>
        </Box>
        <Box justifyContent={'center'}>
          <Typography variant='subtitle2' sx={{fontSize:{xs:12, sm:14}}}>{t('menu.counterIp')}: {data.counterIp}</Typography>
          <Typography variant='subtitle2' sx={{fontSize:{xs:12, sm:14}}}>{t('menu.version')}: {data.version}</Typography>
        </Box>

      </Toolbar>
    </AppBar>
  );
}
