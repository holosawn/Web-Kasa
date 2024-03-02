import { Box } from '@mui/material';
import React from 'react'
import SaleInfoCard from './SaleInfoCard';
import grossSalesIcon from '../../../assets/CoinGraph.svg'
import netSalesIcon from '../../../assets/PriceTag.svg'
import costOfSalesIcon from '../../../assets/Coin.svg'
import grossProfitIcon from '../../../assets/Graph.svg'

const SalesSummaryInfo = ({ salesData, timeline }) => (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"row"}
      alignItems={"stretch"}
      overflow={"visible"}
      flexWrap={{ xs: "wrap", md: "noWrap" }}
    >
      <Box display={"flex"} flexDirection={"row"} width={"100%"}>
        <SaleInfoCard
          label={"Gross Sales"}
          currentValue={salesData.salesSummary.grossSales}
          iconSrc={grossSalesIcon}
          iconSx={{
            backgroundColor:"#EEEDFD",
          }}
          chartXaxisData={salesData.salesSummaryoverTime.date.values}
          chartYaxisData={salesData.salesSummaryoverTime.grossSales.values}
          timeline={timeline}
          />
        <SaleInfoCard
          label={"Net Sales"}
          currentValue={salesData.salesSummary.netSales}
          iconSrc={netSalesIcon}
          iconBgcolor={"#E5F8ED"}
          chartXaxisData={salesData.salesSummaryoverTime.date.values}
          chartYaxisData={salesData.salesSummaryoverTime.netSales.values}
          timeline={timeline}
           />
      </Box>
      <Box display={"flex"} flexDirection={"row"} width={"100%"}>
        <SaleInfoCard
          label={"Cost of Sales"}
          currentValue={salesData.salesSummary.costOfSales}
          iconSrc={costOfSalesIcon}
          iconBgcolor={"#FCEAEA"}
          chartXaxisData={salesData.salesSummaryoverTime.date.values}
          chartYaxisData={salesData.salesSummaryoverTime.costOfSales.values}
          timeline={timeline}
          />
        <SaleInfoCard
          label={"Gross Profit"}
          currentValue={salesData.salesSummary.grossProfit}
          iconSrc={grossProfitIcon}
          iconBgcolor={"#FFF3E8"}
          chartXaxisData={salesData.salesSummaryoverTime.date.values}
          chartYaxisData={salesData.salesSummaryoverTime.grossProfit.values}
          timeline={timeline}
          />
      </Box>
    </Box>
  );

export default SalesSummaryInfo
