import { Button, CircularProgress } from '@mui/material'
import React from 'react'

const LoadingButton = ({children, isLoading, ...props }) => {
  const isDisabled = props.disabled || isLoading; // if props.disabled is already true or isLoading is true

  return (
    <Button disabled={isDisabled} {...props}>
        {!isLoading && children}
        {isLoading && <CircularProgress color='inherit' size={25}/>}
    </Button>
  )
}

export default LoadingButton
