import React, { useState } from 'react';
import { Alert, AlertTitle, Fade } from '@mui/material';

const useAlert = () => {
  const [alert, setAlert] = useState({
    open: false,
    severity: 'info',
    title: '',
    content: '',
  });

  const showAlert = (severity, title, content, duration = 2000) => {
    setAlert({
      open: true,
      severity: severity,
      title: title,
      content: content,
    });

    setTimeout(() => {
      setAlert({
        open: false,
        severity: 'info',
        title: '',
        content: '',
      });
    }, duration);
  };

  const AlertComponent = () => {
    return (
      <Fade in={alert.open}>
        <Alert
          severity={alert.severity}
          sx={{
            position: 'fixed',
            top: '15%',
            right: 0,
            transform: 'translate(-5%, -50%)',
            width: '250px',
            height: '100px',
            zIndex: 999,
          }}
        >
          {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
          {alert.content}
        </Alert>
      </Fade>
    );
  };

  return [showAlert, AlertComponent];
};

export default useAlert;