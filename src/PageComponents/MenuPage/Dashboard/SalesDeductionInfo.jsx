import React from 'react';
import { Grid } from '@mui/material';
import discountIcon from '../../../assets/discount.svg';
import refundIcon from '../../../assets/refund.svg';
import creditNoteIcon from '../../../assets/creditNote.svg';
import SaleInfoCard from '../../../PageComponents/MenuPage/Dashboard/SaleInfoCard';

const SalesDeductionInfo = ({ salesData, timeline }) => {
  console.log(salesData);
  return(
  <Grid
    container
    width={'100%'}
    columnSpacing={2}
    rowSpacing={0}
    justifyContent="space-around"
    alignItems="center"
    overflow="hidden"
    flexWrap={{ xs: "wrap", md: "noWrap" }}
  >
    <Grid item xs={12} md={4}>
      <SaleInfoCard
        label={"Discount"}
        currentValue={salesData.salesDeduction.discount}
        iconSrc={discountIcon}
        iconSx={{
          backgroundColor:"#EEEDFD",
        }}
        imgSx={{
          height:35,
        }}
        chartXaxisData={salesData.salesDeductionOverTime.date.values}
        chartYaxisData={salesData.salesDeductionOverTime.discount.values}
        timeline={timeline}
      />
    </Grid>
    <Grid item xs={12} md={4}>
      <SaleInfoCard
        label={"Cash Refund"}
        currentValue={salesData.salesDeduction.cashRefund}
        iconSrc={refundIcon}
        iconSx={{
          backgroundColor:"#E5F8ED",
        }}
        imgSx={{
          height:35,
          color:'gray'
        }}
        chartXaxisData={salesData.salesDeductionOverTime.date.values}
        chartYaxisData={salesData.salesDeductionOverTime.cashRefund.values}
        timeline={timeline}
      />
    </Grid>
    <Grid item xs={12} md={4}>
      <SaleInfoCard
        label={"Credit Note"}
        currentValue={salesData.salesDeduction.creditNote}
        iconSrc={creditNoteIcon}
        iconSx={{
          backgroundColor:"#FCEAEA",
        }}
        imgSx={{
          height:35,
        }}
        chartXaxisData={salesData.salesDeductionOverTime.date.values}
        chartYaxisData={salesData.salesDeductionOverTime.creditNote.values}
        timeline={timeline}
      />
    </Grid>
  </Grid>
)};

export default SalesDeductionInfo;
