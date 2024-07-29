import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import { t } from 'i18next';

const UnAuthorized = () => {
  const navigate = useNavigate();
  const {logout} = useAuth()
  const location = useLocation()

  const handleLogin = () => {
    logout();
    return <Navigate to='/login' state={{ path: location.pathname }} replace />;
  }

  return (
    <Box height={'100vh'} width={'100vw'} display={'flex'} flexDirection={'column'} justifyContent={'start'} alignItems={'center'} >
      <Typography color={'error'} variant='h6' mt={'15%'} >
          {t('common.unAuthorized')}
      </Typography>
      <Typography variant='h7' >
        {t('common.youCanLoginWithDifferentAccount')} <Link onClick={handleLogin} >{t('common.login')}</Link>
      </Typography>
      <Typography variant='h7' >
        {t('common.orYouCanGoBack')} <Link onClick={()=> navigate(-1)}>{t('common.goBack')}</Link>
      </Typography>
    </Box>
  )
}

export default UnAuthorized
