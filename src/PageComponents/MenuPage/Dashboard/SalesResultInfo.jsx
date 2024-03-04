import { Grid } from '@mui/material';
import React from 'react';
import SaleInfoCard from './SaleInfoCard';
import grossSalesIcon from '../../../assets/CoinGraph.svg';
import netSalesIcon from '../../../assets/PriceTag.svg';
import costOfSalesIcon from '../../../assets/Coin.svg';
import grossProfitIcon from '../../../assets/Graph.svg';

const SalesResultInfo = ({ salesData, timeline }) => (
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
        currentValue={salesData.salesResult.grossSales}
        iconSrc={grossSalesIcon}
        iconSx={{
          backgroundColor:"#EEEDFD",
        }}
        chartXaxisData={salesData.salesResultoverTime.date.values}
        chartYaxisData={salesData.salesResultoverTime.grossSales.values}
        timeline={timeline}
      />
    </Grid>
    <Grid item xs={6} md={3}>
      <SaleInfoCard
        label={"Net Sales"}
        currentValue={salesData.salesResult.netSales}
        iconSrc={netSalesIcon}
        iconBgcolor={"#E5F8ED"}
        chartXaxisData={salesData.salesResultoverTime.date.values}
        chartYaxisData={salesData.salesResultoverTime.netSales.values}
        timeline={timeline}
      />
    </Grid>
    <Grid item xs={6} md={3}>
      <SaleInfoCard
        label={"Cost of Sales"}
        currentValue={salesData.salesResult.costOfSales}
        iconSrc={costOfSalesIcon}
        iconBgcolor={"#FCEAEA"}
        chartXaxisData={salesData.salesResultoverTime.date.values}
        chartYaxisData={salesData.salesResultoverTime.costOfSales.values}
        timeline={timeline}
      />
    </Grid>
    <Grid item xs={6} md={3}>
      <SaleInfoCard
        label={"Gross Profit"}
        currentValue={salesData.salesResult.grossProfit}
        iconSrc={grossProfitIcon}
        iconBgcolor={"#FFF3E8"}
        chartXaxisData={salesData.salesResultoverTime.date.values}
        chartYaxisData={salesData.salesResultoverTime.grossProfit.values}
        timeline={timeline}
      />
    </Grid>
  </Grid>
);

export default SalesResultInfo;
