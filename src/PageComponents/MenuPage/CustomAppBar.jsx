import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import data from '../../Data/MenuLayoutData.json'
import FiberManualRecord from '@mui/icons-material/FiberManualRecord';
import { useLocation } from 'react-router-dom';

export default function CustomAppBar() {

  const currentPage = useLocation().pathname.slice(1);
  console.log("Appbar rendered")
  return (
    <Box height={'64px'} maxHeight={'64px'} minHeight={'64px'} width={'100%'} position={'sticky'} top={0} zIndex={998} >
      <AppBar position="static" sx={{backgroundColor:'#0E4D90', height:'100%'}} >
        <Toolbar>
          <Typography ml={7} variant='h6' position={'relative'} sx={{ fontSize: '16px' }}>
            {currentPage}
          </Typography>

          <Box display={'flex'} flexDirection={'row'} alignItems={'center'} position={'absolute'} bottom={0} left={0} ml={9.5}>
            <FiberManualRecord sx={{color:'green', width:0.08}}  />
            <Typography variant='subtitle2' fontSize={{xs:12, sm:14}} sx={{ fontSize: '12px' }}>
                Market is online
            </Typography>
           </Box>

          <Box  justifyContent={'center'} mr={3} ml={'auto'}>
            <Typography variant='subtitle2' sx={{fontSize:{xs:12, sm:14}}}>Mağaza No: {data.marketNo} </Typography>
            <Typography variant='subtitle2' sx={{fontSize:{xs:12, sm:14}}}>Kasa No: {data.counterNo} ({data.counterName})</Typography>
          </Box>
          <Box justifyContent={'center'}>
            <Typography variant='subtitle2' sx={{fontSize:{xs:12, sm:14}}}>Kasa Ip No: {data.counterIp}</Typography>
            <Typography variant='subtitle2' sx={{fontSize:{xs:12, sm:14}}}>Versiyon: {data.version}</Typography>
          </Box>

        </Toolbar>
      </AppBar>

    </Box>
  );
}
