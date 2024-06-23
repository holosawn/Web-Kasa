import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

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
          You do not have permission to view this page
      </Typography>
      <Typography variant='h7' >
          You can <Link onClick={handleLogin} >login</Link> with a different account
      </Typography>
      <Typography variant='h7' >
          Or you can <Link onClick={()=> navigate(-1)}>go back</Link>
      </Typography>
    </Box>
  )
}

export default UnAuthorized
