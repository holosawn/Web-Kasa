import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Stack, Typography } from '@mui/material';
import { t } from 'i18next';

const VisuallyHiddenInput = styled('input')({
  clip: 'ect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const CsvReader = ({setCustomers}) => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const rows = text.split('\r\n').map(row => row.split(','));


        if (rows.length > 1) {
          const headers = rows[0];
          const data = rows.slice(1, rows.length-1).map(row => {
            return headers.reduce((acc, header, index) => {
              acc[header] = row[index] || '';
              return acc;
            }, {});
          });

          setCustomers(prev => [...prev, ...data]);
          setFileUploaded(true);
        }
      };
      reader.readAsText(file);
    } else {
      setFileUploaded(false);
      setFileName('');
    }
  };


  return (
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        onChange={handleFileChange}
        startIcon={<CloudUploadIcon/>}
        size='small'
        sx={{fontSize:{xs:10, md:12, lg:14}}}
      >
        <Stack direction={'column'} justifyContent={'center'} py={!fileUploaded ? '5px' : 0}>
        
            {t('customers.uploadFile')}
            <VisuallyHiddenInput type="file" />

            {fileUploaded && 
            <Typography sx={{
                fontSize: 7,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
                lineHeight: 1, // adjust the line height to fit the button
                minHeight:10
              }}
              >
                 {fileName.length > 18 ? fileName.slice(0, 19) + '...' : fileName}
            </Typography>
            }

        </Stack>

      </Button>

  );
};

export default CsvReader;