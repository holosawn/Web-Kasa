import React, { useState } from 'react'
import MultiLineChart from './Dashboard/MultiLineChart';
import { Box, MenuItem, Select, Typography, Paper } from '@mui/material';
import useFetchData from '../../CustomHooks/useFetchData'
import SalesResultInfo from './Dashboard/SalesResultInfo';
import TopEntitiesList from './Dashboard/TopEntitiesList';
import SalesDeductionInfo from './Dashboard/SalesDeductionInfo';
import LoadingPage from '../ErrorAndLoadingPages/LoadingPage'
import ErrorPage from '../ErrorAndLoadingPages/ErrorPage'
import { t } from 'i18next';

// Selecting timeline to show value according to it
const SelectTimeline = ({ timeline, setTimeline }) => {
    const onChange = (e) => {
      setTimeline(e.target.value);
    };
  
    return (
      <Select
        defaultValue={"today"}
        value={timeline}
        onChange={(e) => onChange(e)}
        variant="outlined"
        sx={{
          width: 200,
          margin: 1,
          padding: 0,
        }}
      >
        <MenuItem value={"today"}>{t('dashboard.today')}</MenuItem>
        <MenuItem value={"yesterday"}>{t('dashboard.yesterday')}</MenuItem>
        <MenuItem value={"thisWeek"}>{t('dashboard.thisWeek')}</MenuItem>
        <MenuItem value={"lastWeek"}>{t('dashboard.lastWeek')}</MenuItem>
        <MenuItem value={"thisMonth"}>{t('dashboard.thisMonth')}</MenuItem>
        <MenuItem value={"lastMonth"}>{t('dashboard.lastMonth')}</MenuItem>
      </Select>
    );
};

// Creates series object for MUI chart 
const SalesResultChart = ({ data, timeline }) => {
    const dates = data.date.values
    
    const grossSalesData = data.grossSales.values
    const netSalesData = data.netSales.values
    const costOfSalesData = data.costOfSales.values
    const grossProfitData = data.grossProfit.values
  
    const MultilineChartSeries = [
      {
        type: "bar",
        data: grossSalesData,
        label: t('dashboard.grossSales'),
        color: "#5F9DDD",
      },
      {
        type: "line",
        data: netSalesData,
        label: t('dashboard.netSales'),
        color: "#28C76F",
      },
      {
        type: "line",
        data: costOfSalesData,
        label: t('dashboard.costOfSales'),
        color: "#ED6D6E",
      },
      {
        type: "line",
        data: grossProfitData,
        color: "#FF9F43",
        label: t('dashboard.grossSales'),
      },
    ];
  
    return (
      <MultiLineChart
        series={MultilineChartSeries}
        dates={dates}
        timeline={timeline} />
    );
};

// Creates series object for MUI chart 
const SalesDeductionChart = ({ data, timeline }) => {
  const dates = data.date.values
  
  const discountData = data.discount.values
  const cashRefundData = data.cashRefund.values
  const creditNoteData = data.creditNote.values

  const MultilineChartSeries = [
    {
      type: "bar",
      data: discountData,
      label: t('dashboard.discount'),
      color: "#5F9DDD",
    },
    {
      type: "line",
      data: cashRefundData,
      label: t('dashboard.cashRefund'),
      color: "#28C76F",
    },
    {
      type: "line",
      data: creditNoteData,
      label: t('dashboard.creditNote'),
      color: "#ED6D6E",
    },
  ];

  return (
    <MultiLineChart
      series={MultilineChartSeries}
      dates={dates}
      timeline={timeline}
    />
  );
};

const Dashboard = () => {
    const [timeline, setTimeline] = useState("today");
    const [data, isLoading, error] = useFetchData(`/DashboardData/${timeline}`);

  if (isLoading) {
    return <LoadingPage/>
  } 
  else if (error){
    return <ErrorPage/>
  }
  else{
    return (
    <Box mx={"16px"} ml={"85px"} mb={2} display={'flex'} flexDirection={'column'} alignItems={'center'} >
        <Paper sx={{
            width:'98%', display:'flex', flexDirection:'row', justifyContent:'end', mt:2.5, m:1, height:65, borderRadius:1
          }}
        >
          <SelectTimeline timeline={timeline} setTimeline={setTimeline} />
        </Paper>

          {/* Component with multiple tiny graphs to show data  */}
        <SalesResultInfo salesData={{"salesResult": data.salesResult, "salesResultoverTime": data.salesResultOverTime}} timeline={timeline} />

          <Box
            width={'100%'}
            display={"flex"}
            flex={1}
            flexDirection={{md:"row", xs:'column'}}
            justifyContent={"stretch"}
          >
            <SalesResultChart data={data.salesResultOverTime} timeline={timeline} />
            <TopEntitiesList topSoldEntities={data.topProducts} totalSale={data.totalSale} timeline={timeline} label={t('dashboard.topProducts')} />
          </Box>    

          {/* Component with multiple tiny graphs to show data  */}
        <SalesDeductionInfo salesData={{"salesDeduction": data.salesDeduction, "salesDeductionOverTime": data.salesDeductionOverTime}} timeline={timeline} />
        <Box
          display={"flex"}
          width={'100%'}
          flexDirection={{md:"row", xs:'column'}}
          justifyContent={"stretch"}
        >
          <SalesDeductionChart data={data.salesDeductionOverTime} timeline={timeline} />
          <TopEntitiesList topSoldEntities={data.topCategories} totalSale={data.totalSale} timeline={timeline} label={t('dashboard.topCategories')}/>
        </Box>
    </Box> 
  )
    }
}


export default Dashboard
