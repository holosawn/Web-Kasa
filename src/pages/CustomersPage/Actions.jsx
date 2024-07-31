import { Box, Button, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import DropdownButton from '../../ReusableComponents/DropdownButton'
import CsvReader from './CSVReader'
import AddCustomerModal from '../../ReusableComponents/AddCustomerModal'
import { t } from 'i18next'

const Actions = ({triggerFetch, customers, setCustomers}) => {
  const [ isAddCustomerModalOpen, setIsCustomerModalOpen ] = useState(false)
  
  const openAddCustomerModal = () => {
    setIsCustomerModalOpen(true)
  }

  const closeAddCustomerModal = () => {
    setIsCustomerModalOpen(false)
  }

  const DropdownButtonItems = [
    { label: 'CSV', action: () => handleCSVExport(customers) },
    { label: 'JSON', action: () => handleJsonExport(customers) },
    { label: 'SQL', action: () => handleSQLEntityExport(customers) },
  ];

  return (
    <Box height={'100%'} display={'flex'} gap={{xs:1, lg:2}} ml={'auto'} mr={{xs:2, lg:7}} >
        <Button variant='contained' size='small' sx={{fontSize:{xs:10, md:12, lg:14}}} onClick={openAddCustomerModal} >
            {t('customers.addCustomer')}
        </Button>
        <DropdownButton label={t('customers.export')} menuItems={DropdownButtonItems} />
        <CsvReader setCustomers={setCustomers}/>
        <AddCustomerModal open={isAddCustomerModalOpen} onClose={closeAddCustomerModal} onSubmit={triggerFetch} />
    </Box>
  )
}

export default Actions

const handleCSVExport = (data) => {
  if (!data || data.length === 0) {
    return;
  }

  // Extract column headers from the first object keys
  const headers = Object.keys(data[0]);
  const csvHeaders = headers.join(',');

  // Map data rows to CSV format
  const csvData = data.map((row) =>
    headers.map((header) => row[header]).join(',')
  ).join('\n');

  // Combine headers and data
  const csvContent = [csvHeaders, csvData].join('\n');

  // Create a Blob and a link to trigger the download
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'customers.csv';
  a.click();
  URL.revokeObjectURL(url);
};


const handleJsonExport = (data) => {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'customers.json';
  a.click();
  URL.revokeObjectURL(url);
}

const handleSQLEntityExport = (data) => {
  const sqlData = data.map((row) => {
    const columns = Object.keys(row);
    const values = Object.values(row);
    return `INSERT INTO entities (${columns.join(', ')}) VALUES (${values.map((value) => `'${value}'`).join(', ')});`;
  }).join('\n');
  const blob = new Blob([sqlData], { type: 'text/sql' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'customers.sql';
  a.click();
  URL.revokeObjectURL(url);
};


