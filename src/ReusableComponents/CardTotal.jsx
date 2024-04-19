import React from 'react'
import {Box, Stack, Typography} from '@mui/material'
import { t } from 'i18next'

const CardTotal=({subTotal, discount, savedByOffers, amountToPay=null})=>(
    <Box display={'flex'} fontSize={{xs:10, md:12, lg:14, xl:16}} flexDirection={'column'} justifyContent={'center'} border={'1px solid gray'} borderRadius={3} p={1} height={{xs:(65 + (amountToPay && 15)), md:(95 + (amountToPay && 20))}} width={'100%'} >
      <Stack direction={'row'} width={'100%'} >
        <Typography variant="h7" fontWeight={700} color={'primary'} >{t('sale.subTotal')}:</Typography>
        <Typography variant="h7" fontWeight={700} color={'primary'}  ml={'auto'} >{(subTotal || 0).toFixed(3).replace(".", ",")}</Typography>
        <Typography variant="h7" fontWeight={700} color={'primary'}>&nbsp;TRY</Typography>
      </Stack>
      <Stack direction={'row'} width={'100%'} >
        <Typography variant="h7" fontWeight={700} color={'success.main'} >{t('sale.offers')}:</Typography>
        <Typography variant="h7" fontWeight={700} color={'success.main'}  ml={'auto'} >{(savedByOffers || 0).toFixed(3).replace(".", ",")} TRY</Typography>
      </Stack>
      <Stack direction={'row'} width={'100%'} >
        <Typography variant="h7" fontWeight={700} color={'success.main'} >{t('sale.discounts')}:</Typography>
        <Typography variant="h7" fontWeight={700} color={'success.main'}  ml={'auto'} >{((discount || 0) % 1 === 0 ? (discount||0).toFixed(0) : discount.toFixed(2)).replace(".", ",")}%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
      </Stack>
      <Stack direction={'row'} width={'100%'} >
        <Typography variant="h7" fontWeight={700} color={'secondary'} >{t('sale.total')}:</Typography>
        <Typography variant="h7" fontWeight={700} color={'secondary'}  ml={'auto'} >{(((subTotal||0)-(savedByOffers||0)) * (100 - (discount||0))/100).toFixed(3).replace(".", ",")}</Typography>
        <Typography variant="h7" fontWeight={700} color={'primary'}>&nbsp;TRY</Typography>
      </Stack>
      {amountToPay && <Stack direction={'row'} width={'100%'} >
        <Typography variant="h7" fontWeight={700} color={'secondary'} >Remaining Amount:</Typography>
        <Typography variant="h7" fontWeight={700} color={'secondary'}  ml={'auto'} >{amountToPay.toFixed(3).replace(".", ",")}</Typography>
        <Typography variant="h7" fontWeight={700} color={'primary'}>&nbsp;TRY</Typography>
      </Stack>}
    </Box>
  );

export default CardTotal
