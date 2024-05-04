import { useTheme } from '@emotion/react'
import { Button, CircularProgress } from '@mui/material'
import React from 'react'

const LoadingButton = ({children, isLoading, ...props }) => {
  const theme = useTheme()
  return (
    <Button {...props}>
        {!isLoading && children}
        {isLoading && <CircularProgress color='inherit' size={25}/>}
    </Button>
  )
}

export default LoadingButton
