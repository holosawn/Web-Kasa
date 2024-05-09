import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

const ErrorPage = () => {
  return (
    <Box height={'100vh'} width={'100vw'} display={'flex'} flexDirection={'column'} justifyContent={'start'} alignItems={'center'} >
        <Typography color={'error'} variant='h5' mt={'15%'} >
            We Are Sorry :{'('}
        </Typography>
        <Typography variant='h6' >
            There is an error happened during fetching data
        </Typography>
    </Box>
  )
}

export default ErrorPage
