import React from "react";
import { Box, Icon, Paper, Typography } from "@mui/material";
import TinyLineChart from "../../../ReusableComponents/TinyLineChart";

const SaleInfoCard = ({ currentValue, label, iconBgcolor, chartXaxisData, chartYaxisData, timeline, iconSrc, iconSx, imgSx }) => {
  const isMonthly = timeline === 'thisMonth' || timeline === 'lastMonth'
  
  const tinyLineChartStyle = {
    width: isMonthly ? "calc(102%)" : "calc(114%)",
    left: isMonthly ? "calc(-1%)" : 'calc(-7%)'
  };

  return(
  <Paper
    elevation={1}
    sx={{
      backgroundColor: "white",
      width: "100%",
      height: 190,
      borderRadius: 2,
      m: 2,
      mx: 1.1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      overflow: "visible",
      position: 'relative'
    }}
  >
    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'} mt={2}>
      <Box color={"#5E5873"}>
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
          backgroundColor: iconBgcolor,
          ...iconSx,
        }}
      >
        <img src={iconSrc} style={{ height: 25, ...imgSx, }} />
      </Icon>
    </Box>
    <Box position={'absolute'} height={'100px'} overflow={'visible'} {...tinyLineChartStyle} bottom={0}>
      <TinyLineChart xData={chartXaxisData} yData={chartYaxisData} dataLabel={label} timeline={timeline} />
    </Box>
  </Paper>
)};

export default SaleInfoCard;
