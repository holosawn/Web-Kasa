import React, { useState } from 'react'
import MultiLineChart from '../../ReusableComponents/MultiLineChart';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import useFetchData from '../../CustomHooks/useFetchData'
import SalesSummaryInfo from '../../PageComponents/MenuPage/Dashboard/SalesSummaryInfo';
import TopEntitiesList from '../../PageComponents/MenuPage/Dashboard/TopEntitiesList';
import discountIcon from '../../assets/discount.svg'
import refundIcon from '../../assets/refund.svg'
import creditNoteIcon from '../../assets/creditNote.svg'
import SaleInfoCard from '../../PageComponents/MenuPage/Dashboard/SaleInfoCard';
import SalesDeductionInfo from '../../PageComponents/MenuPage/Dashboard/SalesDeductionInfo';


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
        <MenuItem value={"today"}>Today</MenuItem>
        <MenuItem value={"yesterday"}>Yesterday</MenuItem>
        <MenuItem value={"thisWeek"}>Thish Week</MenuItem>
        <MenuItem value={"thisMonth"}>This Month</MenuItem>
        <MenuItem value={"lastWeek"}>Last Week</MenuItem>
        <MenuItem value={"lastMonth"}>Last Month</MenuItem>
      </Select>
    );
};

const SalesSummaryChart = ({ data, timeline }) => {
    const dates = data.date.values
    
    const grossSalesData = data.grossSales.values
    const netSalesData = data.netSales.values
    const costOfSalesData = data.costOfSales.values
    const grossProfitData = data.grossProfit.values
  
    const MultilineChartSeries = [
      {
        type: "bar",
        data: grossSalesData,
        label: "Gross Sales",
        color: "#5F9DDD",
      },
      {
        type: "line",
        data: netSalesData,
        label: "Net Sales",
        color: "#28C76F",
      },
      {
        type: "line",
        data: costOfSalesData,
        label: "Cost Of Sales",
        color: "#ED6D6E",
      },
      {
        type: "line",
        data: grossProfitData,
        color: "#FF9F43",
        label: "Gross Sales",
      },
    ];
  
    return (
      <MultiLineChart
        series={MultilineChartSeries}
        dates={dates}
        timeline={timeline} />
    );
};

const SalesDeductionChart = ({ data, timeline }) => {
  const dates = data.date.values
  
  const discountData = data.discount.values
  const cashRefundData = data.cashRefund.values
  const creditNoteData = data.creditNote.values

  const MultilineChartSeries = [
    {
      type: "bar",
      data: discountData,
      label: "Discount ",
      color: "#5F9DDD",
    },
    {
      type: "line",
      data: cashRefundData,
      label: "Cash Refund",
      color: "#28C76F",
    },
    {
      type: "line",
      data: creditNoteData,
      label: "Credit Note",
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
    const { data, error, isLoading  } = useFetchData(`/DashboardData/${timeline}`);

    if (isLoading) {
        return (
          <Box>
            <Typography>...Loading</Typography>
          </Box>
        );
      }
    
      if (error) {
        return (
          <Box>
            <Typography>{error}</Typography>
          </Box>
        );
      }

      
  if (!isLoading) {

  return (
    <Box mx={"16px"} ml={"85px"} mb={2} flex={1} display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"end"}
          mt={2.5}
          mx={1}
          height={65}
          bgcolor={'white'}
          borderRadius={1}
        >
          <SelectTimeline timeline={timeline} setTimeline={setTimeline} />
        </Box>

        <SalesSummaryInfo salesData={{"salesSummary": data.salesSummary, "salesSummaryoverTime": data.salesResultOverTime}} timeline={timeline} />

          <Box
            width={'100%'}
            display={"flex"}
            flex={1}
            flexDirection={{md:"row", xs:'column'}}
            justifyContent={"stretch"}
          >
            <SalesSummaryChart data={data.salesResultOverTime} timeline={timeline} />
            <TopEntitiesList/>
          </Box>    

        <SalesDeductionInfo salesData={{"salesDeduction": data.salesDeduction, "salesDeductionOverTime": data.salesDeductionOverTime}} timeline={timeline} />
        <Box
          display={"flex"}
          width={'100%'}
          flexDirection={{md:"row", xs:'column'}}
          justifyContent={"stretch"}
        >
          <SalesDeductionChart data={data.salesDeductionOverTime} timeline={timeline} />
          <TopEntitiesList/>
        </Box>
    </Box> 
  )
    }
}


export default Dashboard
