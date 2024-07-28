import { Box, Button, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import DropdownButton from '../../ReusableComponents/DropdownButton'
import CsvReader from './CSVReader'
import AddCustomerModal from '../../ReusableComponents/AddCustomerModal'
import { t } from 'i18next'

const exportData = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Jane', age: 30 },
  { id: 3, name: 'Bob', age: 35 },
]

const Actions = ({triggerFetch}) => {
  const [ isAddCustomerModalOpen, setIsCustomerModalOpen ] = useState(false)
  
  const openAddCustomerModal = () => {
    setIsCustomerModalOpen(true)
  }

  const closeAddCustomerModal = () => {
    setIsCustomerModalOpen(false)
  }

  return (
    <Box height={'100%'} display={'flex'} gap={{xs:1, lg:2}} ml={'auto'} mr={{xs:2, lg:7}} >
        <Button variant='contained' size='small' sx={{fontSize:{xs:10, md:12, lg:14}}} onClick={openAddCustomerModal} >
            {t('customers.addCustomer')}
        </Button>
        <DropdownButton label={t('customers.export')} menuItems={DropdownButtonItems} />
        <CsvReader/>
        <AddCustomerModal open={isAddCustomerModalOpen} onClose={closeAddCustomerModal} onSubmit={triggerFetch} />
    </Box>
  )
}

export default Actions

const handleCSVExport = (data) =>{
  const csvData = data.map((row) => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
    URL.revokeObjectURL(url);
}
const handleJsonExport = (data) => {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.json';
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
  a.download = 'data.sql';
  a.click();
  URL.revokeObjectURL(url);
};

const DropdownButtonItems = [
  { label: 'CSV', action: () => handleCSVExport(exportData) },
  { label: 'JSON', action: () => handleJsonExport(exportData) },
  { label: 'SQL', action: () => handleSQLEntityExport(exportData) },

];
