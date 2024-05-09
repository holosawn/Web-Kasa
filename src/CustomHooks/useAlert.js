import React, { useCallback, useMemo, useState } from 'react';
import { Alert, AlertTitle, Fade } from '@mui/material';

const useAlert = (...alertComponentProps) => {
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

  const AlertComponent = useCallback(({sx}) => {
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
            ...sx
          }}
          {...alertComponentProps}
        >
          {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
          {alert.content}
        </Alert>
      </Fade>
    );
  }, [alert]);

  return [showAlert, AlertComponent];
};

export default useAlert;
