import React, { useState } from 'react'
import useFetchData from '../../CustomHooks/useFetchData.js'
import LoadingPage from '../ErrorAndLoadingPages/LoadingPage.jsx'
import ErrorPage from '../ErrorAndLoadingPages/ErrorPage.jsx'
import { Box, Stack, Typography } from '@mui/material'
import FilterInputs from './FilterInputs.jsx'
import ReportList from './ReportList.jsx'
import ReportPreview from './ReportPreview.jsx'
import { formatDateToISO } from '../../utils/helpers.js'

const startDate = new Date();
startDate.setHours(0, 0, 0, 0); // Set milliseconds to 0 to ensure it's part of the current day

const endDate = new Date();
endDate.setHours(23, 59, 59, 999); // Set to the end of the day (23 hours, 59 minutes, 59 seconds, 999 milliseconds)

const ReportsPage = () => {
  // Todo products page should navigate to -1
  const [data, dataFetchError, dataFetchLoading] = useFetchData('/Reports')
  const [filterValues, setFilterValues] = useState({
    id:'',
    shop:'',
    startDate: formatDateToISO(startDate), // Use the modified startDate
    endDate: formatDateToISO(endDate) // Use the modified endDate
  });

  return dataFetchLoading ? (
    <LoadingPage/>
  )
  : dataFetchError ? (
    <ErrorPage/>
  )
  :(
    <Box mx={"16px"} ml={"85px"} display={'flex'} p={1} flexDirection={'column'} alignItems={'center'} >

    {/* <Box flex={1} width={'100%'} height={'100%'} bgcolor={'background.default'} ml={'65px'} display={'flex'} flexDirection={'column'} alignItems={'center'} p={'2%'} pt={0} > */}
      <FilterInputs filterValues={filterValues} setFilterValues={setFilterValues} />
      <Stack display={'flex'} flexDirection={'row'} justifyContent={'start'} width={'100%'} height={'calc(92vh - 120px)'} gap={3} py={1} >
        <ReportList reports={data} filterValues={filterValues} />
        <ReportPreview/>
      </Stack>
    </Box>
  )
}

export default ReportsPage
