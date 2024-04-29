import React from 'react';
import { Typography, useTheme } from '@mui/material';
import { t } from 'i18next';

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
    return null; // Return null if no error messages found
  };

  return renderErrorMessage();
};

export default DisplayErrorMessage;
