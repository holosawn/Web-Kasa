import { Box, CircularProgress, Typography } from '@mui/material'
import { t } from 'i18next'
import React from 'react'

const ErrorPage = () => {
  return (
    <Box height={'100vh'} width={'100vw'} display={'flex'} flexDirection={'column'} justifyContent={'start'} alignItems={'center'} >
        <Typography color={'error'} variant='h5' mt={'15%'} >
            {t('common.weAreSorry')}{'('}
        </Typography>
        <Typography variant='h6' >
            {t('common.errorHappenedDuringFetching')}
        </Typography>
    </Box>
  )
}

export default ErrorPage
