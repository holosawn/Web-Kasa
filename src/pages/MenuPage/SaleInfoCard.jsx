import React from "react";
import { Box, Icon, Paper, Typography } from "@mui/material";
import TinyLineChart from "./TinyLineChart";

// CurrentValue will also be shown as text
// ChartXaxisData and chartYaxisData is needed for tiny chart in card
const SaleInfoCard = ({ currentValue, label, iconBgColor, chartXaxisData, chartYaxisData, timeline, iconSrc, iconSx, imgSx }) => {
  const isMonthly = timeline === 'thisMonth' || timeline === 'lastMonth'
  const isWeekly = timeline === 'thisWeek' || timeline === 'lastWeek'
  
  const chartContainerStyle = {
    width: isMonthly ? "calc(102%)" : isWeekly? "calc(116%)":  "calc(114%)",
    left: isMonthly ? "calc(-1%)" :  isWeekly? "calc(-8%)": 'calc(-7%)'
  };

  return(
  <Paper
    elevation={1}
    sx={{
      width: "100%",
      height: 190,
      borderRadius: 2,
      my: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      overflow: "visible",
      position: 'relative'
    }}
  >
    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'} mt={2}>
      <Box>
        <Typography fontSize={30} fontWeight={500}>
          {currentValue}
        </Typography>
        <Typography fontSize={14}>{label}</Typography>
      </Box>
      <Icon
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 46,
          height: 46,
          border: "1px solid white",
          borderRadius: 100,
          backgroundColor: iconBgColor,
          ...iconSx,
        }}
      >
        <img src={iconSrc} style={{ height: 25, ...imgSx, }} />
      </Icon>
    </Box>
    <Box position={'absolute'} height={'100px'} overflow={'visible'} {...chartContainerStyle} bottom={0}>
      <TinyLineChart xData={chartXaxisData} yData={chartYaxisData} dataLabel={label} timeline={timeline} />
    </Box>
  </Paper>
)};

export default SaleInfoCard;
