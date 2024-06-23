import { Box, Divider, Stack, Typography, Paper, Grid, Button } from '@mui/material';
import React from 'react';
import './ReportPreview.css'
import { formatDateTimeString } from '../../utils/helpers';
import { t } from 'i18next';


const ReportPreview = ({ currentReport }) => {

  return currentReport == null ? (
    <Paper elevation={0}  sx={{ position:'relative', width: '80%', height:'100%', borderRadius: 3, display:'flex', justifyContent:'center', alignItems:'center' }} className='print-container'>
      <Typography variant='h6' color={'text.secondary'} mb={10}>{t('reports.chooseReport')} </Typography>
    </Paper>

  ) : (
    <Paper elevation={0}  sx={{ position:'relative', width: '80%', height:'100%', minHeight:220, py: {xs:1, md:4}, borderRadius: 3,  }} className='print-container'>
      <Stack direction={'column'} width={'100%'} alignItems={'center'} sx={{ displayPrint:'block', overflowY:'scroll', height:'100%', px:4}} className='print-wrapper' >
        <Typography variant="h6" fontWeight={700} align="center">
          {t('reports.zReport')}
        </Typography>
        <Typography variant="subtitle1" fontWeight={700} align="center">
          ÖZTÜRK MARKET A.Ş
        </Typography>

        <Divider sx={{ my: 2, width: '100%' }} />

        <Typography variant="body1">{t('reports.shop')}: {currentReport.shop}</Typography>
        <Typography variant="body1">{currentReport.location}</Typography>
        <Typography variant="body1">{t('reports.cashier')}: {currentReport.cashier}</Typography>
        <Typography variant="body1">{t('reports.date')}: {formatDateTimeString(new Date(currentReport.date))}</Typography>
        {/* <Typography variant="body1">{currentReport.dateRangeStr}</Typography> */}


        <Grid container mt={3} sx={{ width: '100%' }}>

          <Grid item xs={12}  >
            <Typography align='center' variant="h6" fontWeight={700} >{t('reports.transactions')}</Typography>
            <Divider sx={{ mt:0.5, mb:1,width: '100%' }} />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">{t('reports.cash')}:</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" align='center'>{currentReport.transactions.cashTransactions}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" align="right">{currentReport.transactions.cashTotal}</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography variant="body2">{t('reports.card')}:</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" align='center'>{currentReport.transactions.cardTransactions}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" align="right">{currentReport.transactions.cardTotal}</Typography>
          </Grid>

          <Grid item xs={12} >
            <Divider sx={{ my:0.5,width: '100%' }} />
          </Grid>

          <Grid item xs={4} >
          <Typography variant="body2" >{t('reports.total')}:</Typography>
          </Grid>

          <Grid item xs={4} >
          <Typography variant="body2" align="center">{currentReport.transactions.cashTransactions + currentReport.transactions.cardTransactions }</Typography>
          </Grid>

          <Grid item xs={4} >
          <Typography variant="body2" align="right">{currentReport.transactions.cashTotal + currentReport.transactions.cardTotal }</Typography>
          </Grid>





          <Grid item xs={12} mt={3} >
            <Typography align='center' variant="h6" fontWeight={700} >{t('reports.totalTax')}</Typography>
            <Divider sx={{ mt:0.5, mb:1,width: '100%' }} />
          </Grid>

          <Grid item xs={6} >
          <Typography variant="body2" align="left">{t('reports.totalTax')}:</Typography>
          </Grid>

          <Grid item xs={6} >
          <Typography variant="body2" align="right">{currentReport.totalTaxAmount.toFixed(2)}</Typography>
          </Grid>







          <Grid item xs={12} mt={3} >
            <Typography align='center' variant="h6" fontWeight={700} >{t('reports.drawerTotal')}</Typography>
            <Divider sx={{ mt:0.5, mb:1,width: '100%' }} />
          </Grid>

          {/* //TODO Values will be added */}
          <Grid item xs={6}>
            <Typography variant="body2">{t('reports.openingBalance')}:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" align="right">{currentReport.drawerActions.openingBalance}</Typography> 
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2">{t('reports.removeTender')}:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" align="right">{currentReport.drawerActions.removals}</Typography> 
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2">{t('reports.floatEntry')}:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" align="right">{currentReport.drawerActions.additions}</Typography> 
          </Grid>

          <Grid item xs={12} >
            <Divider sx={{ my:0.5,width: '100%' }} />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2">{t('reports.total')}:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" align="right">{currentReport.drawerActions.total}</Typography> 
          </Grid>






          <Grid item xs={12} mt={3} >
            <Typography align='center' variant="h6" fontWeight={700} >{t('reports.saleSummary')}</Typography>
            <Divider sx={{ mt:0.5, mb:1,width: '100%' }} />
          </Grid>


          <Grid item xs={6}>
            <Typography variant="body2">{t('reports.grossSales')}:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" align="right">{currentReport.saleSummary.grossSales.toFixed(2)}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2">{t('reports.discount')}:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" align="right">-{currentReport.saleSummary.totalDiscount.toFixed(2)}</Typography>
          </Grid>

          {/* // Values will be added */}
          <Grid item xs={6}>
            <Typography variant="body2">{t('reports.offer')}:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" align="right">-{currentReport.saleSummary.totalSavedByOffers.toFixed(2)}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2">{t('reports.coupon')}:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" align="right">{currentReport.saleSummary.totalCouponsSaved.toFixed(2)}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my:0.5,width: '100%' }} />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2">{t('reports.totalNetSales')}:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" align="right">{currentReport.saleSummary.totalNetSales.toFixed(2)}</Typography>
          </Grid>







          <Grid item xs={12} mt={3}  >
            <Typography align='center' variant="h6" fontWeight={700} >{t('reports.salesByCategories')}</Typography>
            <Divider sx={{ mt:0.5, mb:1,width: '100%' }} />
          </Grid>

          {Object.entries(currentReport.categorySales).map(([key, value]) => (
            <Grid container key={key} item xs={12}>
              <Grid item xs={6}>
                <Typography variant="body2" >{key} :</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" align="right">{value}</Typography>
              </Grid>
            </Grid>
          ))}


{/* 
          <Grid item xs={12} >
            <Divider sx={{ my:0.5,width: '100%' }} />
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2">Total Sales:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" align="right">*Total Value</Typography> 
          </Grid> */}





          <Grid item xs={6} mt={6}>
            <Typography variant="body2">Z NO: {currentReport.ZNO}</Typography>
          </Grid>
          <Grid item xs={6} mt={6}>
            <Typography variant="body2" align="right">EKO NO: {currentReport.id}</Typography> 
          </Grid>
          {/* <Grid item xs={12}>
            <Typography variant="body2" align="center">YN07033105</Typography> 
          </Grid> */}
        </Grid>




        <Divider sx={{ my: 2, mt:1, width: '100%' }} />

        <Typography variant="body2" align="center">{t('reports.thanks')}!</Typography>
      </Stack>

      <Button variant='contained' color='warning' sx={{position:'absolute', top:5, right:15, displayPrint:'none'}} onClick={()=> window.print()}  >
        {t('reports.print')}
      </Button>
    </Paper>
  );
};

export default ReportPreview;
