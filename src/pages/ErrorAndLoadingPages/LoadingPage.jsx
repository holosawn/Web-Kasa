import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

const LoadingPage = () => {
  return (
    <Box height={'100vh'} width={'100vw'} display={'flex'} justifyContent={'center'} alignItems={'center'} >
        <CircularProgress size={50} value={100}  />
    </Box>
  )
}

export default LoadingPage
