import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UnAuthorized = () => {
  const navigate = useNavigate();

  return (
    <Box height={'100vh'} width={'100vw'} display={'flex'} flexDirection={'column'} justifyContent={'start'} alignItems={'center'} >
      <Typography color={'error'} variant='h6' mt={'15%'} >
          You do not have permission to view this page
      </Typography>
      <Typography variant='h7' >
          You can <Link to={'/login'}>login</Link> with a different account
      </Typography>
      <Typography variant='h7' >
          Or you can <Link onClick={()=> navigate(-1)}>go back</Link>
      </Typography>
    </Box>
  )
}

export default UnAuthorized
