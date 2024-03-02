import React, { useState } from 'react'
import MultiLineChart from '../../ReusableComponents/MultiLineChart';
import DiscountIcon from '../../assets/discount.svg'
import SaleInfoCard from '../../PageComponents/MenuPage/SaleInfoCard';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import useFetchData from '../../CustomHooks/useFetchData'
import SalesSummaryInfo from '../../PageComponents/MenuPage/SalesSummaryInfo';

const exampleSeries=[
    {
        "type": "bar",
        "data": [20000, 22000, 18000, 21000, 19000, 23000, 22000, 21000],
        "label": "Gross Sales",
        "color": "#5F9DDD"
    },
    {
        "type": "line",
        "data": [18000, 20000, 16000, 19000, 17000, 21000, 20000, 19000],
        "label": "Net Sales",
        "color": "#28C76F"
    },
    {
        "type": "line",
        "data":[12000, 14000, 11000, 13000, 11500, 14000, 13500, 13000],
        "label": "Cost Of Sales",
        "color": "#ED6D6E"
    },
    {
        "type": "line",
        "data": [6000, 8000, 5000, 6000, 5500, 7000, 6500, 7000],
        "color": "#FF9F43",
        "label": "Gross Sales"
    }
  ]
  
  const exampleDates = [
    "2024-08-29T07:00:00.594Z",
    "2024-08-29T09:00:00.594Z",
    "2024-08-29T11:00:00.594Z",
    "2024-08-29T13:00:00.594Z",
    "2024-08-29T15:00:00.594Z",
    "2024-08-29T17:00:00.594Z",
    "2024-08-29T19:00:00.594Z",
    "2024-08-29T21:00:00.594Z"
  ];
  
  const exampleTimeline = 'today';
  
  const exampleSingleLineData = [
    20000,
    22000,
    18000,
    21000,
    19000,
    23000,
    22000,
    21000
  ];

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

const ExampleSaleInfoCard= () => (
    <SaleInfoCard
    label={"Discount"}
    currentValue={1200}
    iconSrc={DiscountIcon}
    iconSx={{
        backgroundColor:"#EEEDFD",
    }}
    imgSx={{
        height:35,
    }}
    chartXaxisData={exampleDates}
    chartYaxisData={exampleSingleLineData}
    timeline={'today'}
    />
)

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
    <Box mx={"16px"} ml={"85px"} mb={2} flex={1}>
        <Box
          width={"auto"}
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

        <SalesSummaryInfo salesData={{"salesSummary": data.salesSummary, "salesSummaryoverTime": data.salesResults}} timeline={timeline} />

        <MultiLineChart series={exampleSeries} dates={exampleDates} timeline={exampleTimeline}/> 
    </Box> 
  )
    }
}


export default Dashboard
