import * as React from 'react';
import { useState } from 'react';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { trTR, enUS, ruRU } from '@mui/x-data-grid/locales';import { Button, ButtonGroup, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Stack } from '@mui/material';
import { FirstPage, NavigateBefore, NavigateNext, LastPage } from '@mui/icons-material';
import AddCustomerModal from '../../ReusableComponents/AddCustomerModal';
import { t } from 'i18next';
import { useLanguage } from '../../contexts/LangContext';

// For custompagination buttons
const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handlePageChange = (newPage) => {
    apiRef.current.setPage(newPage - 1);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <ButtonGroup variant="outlined" sx={{ my: {xs:0.5, md:1, lg:2}, ml:'auto', mr:'auto', height:{xs:30, md:40, lg:50}}} >
      <Button onClick={() => handlePageChange(1)}><FirstPage/></Button>
      <Button onClick={() => handlePageChange(page)}><NavigateBefore/></Button>
      <Button
        ref={anchorRef}
        onClick={handleToggle}
      >
        {page + 1}/{pageCount}
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal sx={{zIndex:100}} >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom'? 'center top' : 'center bottom' }}
          >
            <Paper
              sx={{
                maxHeight: 300, // adjust the max height to your liking
                overflowY: 'auto',
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="menu-list-grow">
                  {Array.from({ length: pageCount }, (_, index) => (
                    <MenuItem key={index + 1} onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <Button onClick={() => handlePageChange(page + 2)}><NavigateNext/></Button>
      <Button onClick={() => handlePageChange(pageCount)}><LastPage/></Button>
    </ButtonGroup>
  );
};
  
const CustomersTable = ({filterValue, customers, setCustomers}) => {
  // to pass id to operations on customers
  const [customerIdToUpdate, setCustomerIdToUpdate] = useState(null)

  const { lang } = useLanguage()

  const componentLang = lang === 'en' ? enUS : lang === 'tr' ? trTR : ruRU

  const filteredRows = React.useMemo(() => {
    if (filterValue === '') {
      return customers;
    }
    return customers.filter((row) => {
      return Object.values(row).some((value) => {
        return String(value).toLowerCase().includes(filterValue.toLowerCase());
      });
    });
  }, [filterValue, customers]);

  const handleUpdate = (id) => {
    setCustomerIdToUpdate(id)
  }

  const closeCustomerUpdate = () => {
    setCustomerIdToUpdate(null)
  }

  const handleDelete = (id) => {
    const updatedCustomer = filteredRows.filter(cus => parseInt(cus.id) != parseInt(id));
    setCustomers(updatedCustomer)
  };

  // For columns MUI DataGrid
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex:1,
      minWidth:90,
      headerClassName: 'super-app-theme--header', 
    },
    {
      field: 'name',
      headerName: t('customers.name'),
      flex:1,
      minWidth:80,
      editable: true,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'surname',
      headerName: t('customers.surname'),
      flex:1,
      minWidth:90,
      editable: true,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'telNo',
      headerName: t('customers.phoneNumber'),
      flex:2,
      minWidth:120, 
      editable: true,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'email',
      headerName: 'Email',
      flex:2,
      minWidth:150, 
      editable: true,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'spendingScore',
      headerName: t('customers.spendingScore'),
      flex:2,
      minWidth:150, 
      editable: true,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'signUp',
      headerName: t('customers.createdAt'),
      flex:2,
      minWidth:180, 
      editable: true,
      headerClassName: 'super-app-theme--header',
      type: 'dateTime',
      valueGetter: (value) => value && new Date(value),
    },
    {
      field: 'actions',
      headerName: t('customers.actions'),
      flex: 2,
      minWidth:200,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Stack direction={'row'} gap={1} alignItems={'center'} height={'100%'} >
          <Button variant='contained' color='success' 
            onClick={() => handleUpdate(params.row.id)}
            >{t('customers.update')}</Button>
          <Button variant='contained' color='error' 
            onClick={() => handleDelete(params.row.id)}
            >{t('customers.delete')}</Button>
        </Stack>
      ),
    }
  ];

  return (
    <>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        autoPageSize          
        disableRowSelectionOnClick
        localeText={componentLang.components.MuiDataGrid.defaultProps.localeText}
        slots={{
          pagination: CustomPagination,
        }}
        sx={{
          '& .super-app-theme--header': {
            backgroundColor: 'background.paper',
          },
          '& .MuiDataGrid-footerContainer':{
            minHeight:20,
          }
        }}
      />
      <AddCustomerModal open={(customerIdToUpdate || false) && true} onClose={closeCustomerUpdate} customerId={customerIdToUpdate} customersOnSystem={customers} setCustomersOnSystem={setCustomers} />
    </>
  );
};


export default CustomersTable
