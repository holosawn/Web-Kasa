import React, { useEffect, useState } from 'react'
import useFetchData from '../../CustomHooks/useFetchData.js'
import LoadingPage from '../ErrorAndLoadingPages/LoadingPage.jsx'
import ErrorPage from '../ErrorAndLoadingPages/ErrorPage.jsx'
import { Box, Stack } from '@mui/material'
import FilterInputs from './FilterInputs.jsx'
import ReportList from './ReportList.jsx'
import ReportPreview from './ReportPreview.jsx'
import { formatDateToISO } from '../../utils/helpers.js'

const startDate = new Date();
startDate.setHours(0, 0, 0, 0); // Set milliseconds to 0 to ensure it's part of the current day

const endDate = new Date();
endDate.setHours(23, 59, 59, 999); // Set to the end of the day (23 hours, 59 minutes, 59 seconds, 999 milliseconds)

const ReportsPage = () => {
  // TODO Settings back error
  const [data, dataFetchError, dataFetchLoading] = useFetchData('/Reports')  
  const [filterValues, setFilterValues] = useState(JSON.parse(sessionStorage.getItem('filterValues')) || {
    id:'',
    shop:'',
    startDate: formatDateToISO(startDate), // Use the modified startDate
    endDate: formatDateToISO(endDate) // Use the modified endDate
  });
  const [currentReport, setCurrentReport] = useState(null)

  const updateFilterValues= (input)=>{
      setFilterValues((prev)=> {
        if (typeof input === 'function') {
          const newValue = input(prev);
          sessionStorage.setItem('filterValues', JSON.stringify(newValue))
          return newValue
        }
        else{
          sessionStorage.setItem('filterValues', JSON.stringify(input))
          return input
        }
      })
  }

  // localStorage.setItem("reports", JSON.stringify([]))
  const reports = JSON.parse(localStorage.getItem("reports")) || []
  // console.log(reports[reports.length-1]);


  return dataFetchLoading ? (
    <LoadingPage/>
  )
  : dataFetchError ? (
    <ErrorPage/>
  )
  :(
    <Box mx={"16px"} ml={"85px"} display={'flex'} p={1} pt={{xs:0, md:1}} flexDirection={'column'} alignItems={'center'} >
      <FilterInputs filterValues={filterValues} setFilterValues={updateFilterValues} />
      <Stack display={'flex'} flexDirection={'row'} justifyContent={'start'} width={'100%'} height={{xs:'calc(100vh - 150px)', md:'calc(100vh - 180px)', lg:'calc(100vh - 200px)' }} gap={3} py={1} >
        <ReportList reports={[...data, ...reports]} filterValues={filterValues} currentReport={currentReport} setCurrentReport={setCurrentReport} />
        <ReportPreview currentReport={currentReport} setCurrentReport={currentReport} />
      </Stack>
    </Box>
  )
}

export default ReportsPage
