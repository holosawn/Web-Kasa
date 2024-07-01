import React from 'react'
import {Box, Stack, Typography} from '@mui/material'
import { t } from 'i18next'

// total, amountToPay and coupons are optional
const CartTotal=({subTotal, discount, savedByOffers, total, amountToPay, coupons, boxProps, stackProps, typographyProps})=>{

  const CustomTypography = ({children, ...props})=>(
    <Typography variant="h7" fontWeight={700} {...props} {...typographyProps} >
      {children}
    </Typography>
  )

  const CustomStack = ({children, ...props}) =>(
    <Stack direction={'row'} width={'100%'} {...props} {...stackProps}>
      {children}
    </Stack>
  )

  const savedByDiscount = (subTotal - savedByOffers)* ((discount ||0) / 100);
  
  return(
    <Box display={'flex'} fontSize={{xs:10, md:12, lg:14, xl:16}} flexDirection={'column'} justifyContent={'center'} border={'1px solid gray'} borderRadius={3} p={1} height={'fit-content'} width={'100%'} {...boxProps} >
      <CustomStack>
        <CustomTypography color={'primary'} >{t('sale.subTotal')}:</CustomTypography>
        <CustomTypography color={'primary'}  ml={'auto'} >{(subTotal || 0).toFixed(3).replace(".", ",")}</CustomTypography>
        <CustomTypography color={'primary'}>&nbsp;TRY</CustomTypography>
      </CustomStack>
      <CustomStack>
        <CustomTypography color={'success.main'} >{t('sale.offers')}:</CustomTypography>
        <CustomTypography color={'success.main'}  ml={'auto'} >-{(savedByOffers || 0).toFixed(3).replace(".", ",")} TRY</CustomTypography>
      </CustomStack>
      <CustomStack>
        <CustomTypography color={'success.main'} >{t('sale.discounts')}:</CustomTypography>
        <CustomTypography color={'success.main'}  ml={'auto'} >-{(savedByDiscount.toFixed(2)).replace(".", ",")} TRY</CustomTypography>
      </CustomStack>
      {(coupons && coupons.length !== 0) && coupons.map(coupon => (
        <CustomStack key={coupon.key} >
          <CustomTypography color={'success.main'} >{coupon.key}:</CustomTypography>
          <CustomTypography color={'success.main'}  ml={'auto'} >{coupon.saved.toFixed(3).replace(".", ",")}</CustomTypography>
          <CustomTypography color={'success.main'}>&nbsp;TRY</CustomTypography>
        </CustomStack>
      ))}
      <CustomStack>
        <CustomTypography color={'secondary'} >{t('sale.total')}:</CustomTypography>
        <CustomTypography color={'secondary'}  ml={'auto'} >{(total || (((subTotal||0)-(savedByOffers||0)) * (100 - (discount||0))/100)).toFixed(3).replace(".", ",")}</CustomTypography>
        <CustomTypography color={'primary'}>&nbsp;TRY</CustomTypography>
      </CustomStack>
      {(amountToPay || amountToPay === 0) && <CustomStack>
        <CustomTypography color={'secondary'} >{t('payment.remainingAmount')}:</CustomTypography>
        <CustomTypography color={'secondary'}  ml={'auto'} >{(!(amountToPay < 0) ? amountToPay : 0).toFixed(3).replace(".", ",")}</CustomTypography>
        <CustomTypography color={'primary'}>&nbsp;TRY</CustomTypography>
      </CustomStack>
      }
      {(amountToPay < 0) && <CustomStack>
        <CustomTypography color={'secondary'} >{t('payment.changeAmount')}:</CustomTypography>
        <CustomTypography color={'secondary'}  ml={'auto'} >{(-amountToPay).toFixed(3).replace(".", ",")}</CustomTypography>
        <CustomTypography color={'primary'}>&nbsp;TRY</CustomTypography>
      </CustomStack>
      }

    </Box>
  )};

export default CartTotal
