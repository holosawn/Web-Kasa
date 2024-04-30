import React from 'react'
import {Box, Stack, Typography} from '@mui/material'
import { t } from 'i18next'

const CardTotal=({subTotal, discount, savedByOffers, total=null, amountToPay=null, coupons=null})=>{
  
  const additionalxsHeight = (((amountToPay || amountToPay === 0) && 15 ) || 0) + (coupons?.length || 0) * 15;  
  const additionalmdHeight = (((amountToPay || amountToPay === 0) && 20 ) || 0) + (coupons?.length || 0) * 20;  

  const savedByDiscount = (subTotal - savedByOffers)* ((discount ||0) / 100);

  return(
    <Box display={'flex'} fontSize={{xs:10, md:12, lg:14, xl:16}} flexDirection={'column'} justifyContent={'center'} border={'1px solid gray'} borderRadius={3} p={1} height={{xs:(65 + additionalxsHeight), md:(95 + additionalmdHeight)}} width={'100%'} >
      <Stack direction={'row'} width={'100%'} >
        <Typography variant="h7" fontWeight={700} color={'primary'} >{t('sale.subTotal')}:</Typography>
        <Typography variant="h7" fontWeight={700} color={'primary'}  ml={'auto'} >{(subTotal || 0).toFixed(3).replace(".", ",")}</Typography>
        <Typography variant="h7" fontWeight={700} color={'primary'}>&nbsp;TRY</Typography>
      </Stack>
      <Stack direction={'row'} width={'100%'} >
        <Typography variant="h7" fontWeight={700} color={'success.main'} >{t('sale.offers')}:</Typography>
        <Typography variant="h7" fontWeight={700} color={'success.main'}  ml={'auto'} >-{(savedByOffers || 0).toFixed(3).replace(".", ",")} TRY</Typography>
      </Stack>
      <Stack direction={'row'} width={'100%'} >
        <Typography variant="h7" fontWeight={700} color={'success.main'} >{t('sale.discounts')}:</Typography>
        <Typography variant="h7" fontWeight={700} color={'success.main'}  ml={'auto'} >-{(savedByDiscount.toFixed(2)).replace(".", ",")} TRY</Typography>
      </Stack>
      {(coupons && coupons.length !== 0) && coupons.map(coupon => (
        <Stack key={coupon.key} direction={'row'} width={'100%'} >
          <Typography variant="h7" fontWeight={700} color={'success.main'} >{coupon.key}:</Typography>
          <Typography variant="h7" fontWeight={700} color={'success.main'}  ml={'auto'} >{coupon.saved.toFixed(3).replace(".", ",")}</Typography>
          <Typography variant="h7" fontWeight={700} color={'success.main'}>&nbsp;TRY</Typography>
        </Stack>
      ))}
      <Stack direction={'row'} width={'100%'} >
        <Typography variant="h7" fontWeight={700} color={'secondary'} >{t('sale.total')}:</Typography>
        <Typography variant="h7" fontWeight={700} color={'secondary'}  ml={'auto'} >{(total || (((subTotal||0)-(savedByOffers||0)) * (100 - (discount||0))/100)).toFixed(3).replace(".", ",")}</Typography>
        <Typography variant="h7" fontWeight={700} color={'primary'}>&nbsp;TRY</Typography>
      </Stack>
      {(amountToPay || amountToPay === 0) && <Stack direction={'row'} width={'100%'} >
        <Typography variant="h7" fontWeight={700} color={'secondary'} >Remaining Amount:</Typography>
        <Typography variant="h7" fontWeight={700} color={'secondary'}  ml={'auto'} >{amountToPay.toFixed(3).replace(".", ",")}</Typography>
        <Typography variant="h7" fontWeight={700} color={'primary'}>&nbsp;TRY</Typography>
      </Stack>}

    </Box>
  )};

export default CardTotal
