import { Box, Paper, Stack } from '@mui/material'
import React, { useState } from 'react'
import CustomFilterTextField from './CustomFilterTextField'
import Actions from './Actions'
import CustomersTable from './CustomersTable'
import useFetchData from '../../CustomHooks/useFetchData'
import LoadingPage from '../ErrorAndLoadingPages/LoadingPage'
import ErrorPage from '../ErrorAndLoadingPages/ErrorPage'

const CustomersPage = () => {
  const [ fetchTriggerToggle, setFetchTriggerToggle ] = useState(false)
  const [ customers, customersFetchLoading, customersFetchError, setCustomers ] = useFetchData('/customers', fetchTriggerToggle)
  const [ filterValue, setFilterValue] = useState('')

  if (customersFetchLoading) {
    return <LoadingPage/>
  }

  if (customersFetchError) {
    return <ErrorPage/>
  }

  const triggerCustomersFetch = () => {
    setFetchTriggerToggle(prev => !prev)
  }

  return (
    <Paper elevation={1} sx={{height:{xs: 'calc(100vh - 100px)', lg:'calc(100vh - 120px)'}, ml:{xs:'84px', lg:'100px'}, mr:{xs:2, lg:4}, my:{xs:0, lg:1.5, }, borderRadius:2}} >
      <Stack direction={'row'} my={{xs:1, md:2,}}  mx={{xs:1, lg:2}} alignItems={'center'} width={'100%'} height={{xs:40, lg:50}} >
        <CustomFilterTextField filterValue={filterValue} setFilterValue={setFilterValue} />
        <Actions triggerFetch={triggerCustomersFetch} />
      </Stack>
      <Box height={{xs:'calc(100% - 56px)', md:'calc(100% - 70px)',  lg:'calc(100% - 80px)'}} >
        <CustomersTable filterValue={filterValue} customers={customers} setCustomers={setCustomers} />
      </Box>
    </Paper>
  )
}

export default CustomersPage
