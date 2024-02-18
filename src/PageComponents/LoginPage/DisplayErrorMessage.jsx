import React from 'react';
import { Typography } from '@mui/material';

const DisplayErrorMessage = ({ errorMsg, touched }) => {
  const renderErrorMessage = () => {
    for (const key in errorMsg) {
      if (errorMsg[key] && touched[key] === true) {
        return (
          <Typography key={key} sx={{ color: 'red' }}>
            {errorMsg[key]}
          </Typography>
        );
      }
    }
    return null; // Return null if no error messages found
  };

  return renderErrorMessage();
};

export default DisplayErrorMessage;
