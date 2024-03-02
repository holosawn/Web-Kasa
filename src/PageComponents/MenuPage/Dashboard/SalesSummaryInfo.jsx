import { Grid } from '@mui/material';
import React from 'react';
import SaleInfoCard from './SaleInfoCard';
import grossSalesIcon from '../../../assets/CoinGraph.svg';
import netSalesIcon from '../../../assets/PriceTag.svg';
import costOfSalesIcon from '../../../assets/Coin.svg';
import grossProfitIcon from '../../../assets/Graph.svg';

const SalesSummaryInfo = ({ salesData, timeline }) => (
  <Grid
    container
    width={'99%'}
    columnSpacing={2}
    rowSpacing={0}
    justifyContent="space-around"
    alignItems="center"
    overflow="visible"
    flexWrap="wrap"
  >
    <Grid item xs={6} md={3}>
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
    </Grid>
    <Grid item xs={6} md={3}>
      <SaleInfoCard
        label={"Net Sales"}
        currentValue={salesData.salesSummary.netSales}
        iconSrc={netSalesIcon}
        iconBgcolor={"#E5F8ED"}
        chartXaxisData={salesData.salesSummaryoverTime.date.values}
        chartYaxisData={salesData.salesSummaryoverTime.netSales.values}
        timeline={timeline}
      />
    </Grid>
    <Grid item xs={6} md={3}>
      <SaleInfoCard
        label={"Cost of Sales"}
        currentValue={salesData.salesSummary.costOfSales}
        iconSrc={costOfSalesIcon}
        iconBgcolor={"#FCEAEA"}
        chartXaxisData={salesData.salesSummaryoverTime.date.values}
        chartYaxisData={salesData.salesSummaryoverTime.costOfSales.values}
        timeline={timeline}
      />
    </Grid>
    <Grid item xs={6} md={3}>
      <SaleInfoCard
        label={"Gross Profit"}
        currentValue={salesData.salesSummary.grossProfit}
        iconSrc={grossProfitIcon}
        iconBgcolor={"#FFF3E8"}
        chartXaxisData={salesData.salesSummaryoverTime.date.values}
        chartYaxisData={salesData.salesSummaryoverTime.grossProfit.values}
        timeline={timeline}
      />
    </Grid>
  </Grid>
);

export default SalesSummaryInfo;
