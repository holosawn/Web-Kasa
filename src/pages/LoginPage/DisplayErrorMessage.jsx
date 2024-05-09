import React from 'react';
import { Typography, useTheme } from '@mui/material';
import { t } from 'i18next';

  // The component returns the first error message found for any field
  // If no error messages are found, it returns null
  // errorMsg is an object that contains error messages for each field
  // touched is an object that tracks whether each field has been interacted with by the user
const DisplayErrorMessage = ({ errorMsg, touched, sx, ...props }) => {


  const theme = useTheme();

  const renderErrorMessage = () => {
    for (const key in errorMsg) {
      if (errorMsg[key] && touched[key] === true) {
        return (
          <Typography color={'error'} key={key} sx={{fontSize: {xs: 13, md:16} , ...sx}} {...props}>
            {t(`login.${key}Err`)}
          </Typography>
        );
      }
    }
    return null; 
  };


  return renderErrorMessage();
};

export default DisplayErrorMessage;
