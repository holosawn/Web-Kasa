import { Box, Button, Divider, Fade, Modal, Stack, Typography } from '@mui/material'
import React from 'react'
import { ArrowBack } from '@mui/icons-material'
import useSize from '../../CustomHooks/useSize'
import '../PaymentPage/ReceiptModal.css'
import { t } from 'i18next'

const getCurrentDateTimeFormatted = () => {
    const now = new Date(); // Get the current date and time
    const year = now.getFullYear(); // Get the full year
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Get the month, with leading zero
    const day = String(now.getDate()).padStart(2, '0'); // Get the day, with leading zero
    
    const hour = String(now.getHours()).padStart(2, '0'); // Get the hour, with leading zero
    const minute = String(now.getMinutes()).padStart(2, '0'); // Get the minute, with leading zero
    
    const dateStr = `${year}-${month}-${day}`
    const hourStr = `${hour}-${minute}`

    return [dateStr, hourStr];
  };

const ReceiptModal = ({cartItems, subTotal, savedByOffers, amountToPay, discount, total, activeCoupons, open, onClose, onFinish=null}) => {
    //todo print shows extra pages rarely
    const [size] = useSize();

    const marketName = "Öztürk Market A.Ş.";
    const detailedAddress = "Kahraman sk./ Cumhuriyet mah.";
    const address = " Kapaklı/ Tekirdağ";
    const [date, hour] = getCurrentDateTimeFormatted();
    const receiptNo = "001";
    const totalDiscount = (subTotal - savedByOffers) * discount/100
    const savedByCoupons = activeCoupons.reduce((total,item)=>{
        return total + item.saved
    },0)
    const totalTax = cartItems.reduce((accumulatedTax, item) => {
        const taxRate = parseFloat(item.product.tax) / 100; // Convert the tax rate to a decimal
        const itemTax = item.computedPrice * taxRate; // Calculate the tax for the item
        return accumulatedTax + itemTax; // Accumulate the total tax
      }, 0) * ((100 -discount)/100) ; // Initialize with 0

    const payments = JSON.parse(sessionStorage.getItem('pastTransactions'))

    const onPrintClick=(e)=>{
        window.print();
    }


  return (
    <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{
          zIndex:9999,
        }}
        className='print-container'
      >
        <Fade in={open}>
            
          <Box
          className='print-wrapper'
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              width: 'fit-content',
              height:size.y < 570 ? '90%' : size.y < 1000 ? '80%' : size.y < 2000 ? '70%' : '30%',
            //   height:'fit-content',
            //   minHeight:500,
              minWidth:500,
              maxWidth:900,
              pt: {xs:1,md:2},
              p:2,
              borderRadius: 3,
            }}
          >
            <Box width={'100%'} height={'100%'} position={'relative'} sx={{display:'flex', flexDirection:'column', alignItems:'center'}} >
                <Button className='hide-print' onClick={onClose} color='error' size='large' variant='contained' sx={{top:0, left:0, position:'absolute', fontSize:{xs:12, md:14, lg:18, xl:20}, height: size.y < 500 ? 37 : size.y < 700 ? 40 : size.y < 900 ? 43 : size.y < 1200 ? 46 : 50 }} >
                    <ArrowBack sx={{mx:{xs:1, md:1.5, xl: 2}}} /> 
                </Button>
                <Button className='hide-print' onClick={onPrintClick} color='warning' size='large' variant='contained' sx={{ top:0, right:0, position:'absolute', fontSize:{xs:12, md:14, lg:18, xl:20}}} >
                    {t('common.print')}
                </Button>
                {onFinish && <Button className='hide-print' onClick={onFinish} color='success' size='large' variant='contained' sx={{ bottom:0, right:0, position:'absolute', fontSize:{xs:12, md:14, lg:18, xl:20}}} >
                    {t('common.finish')}
                </Button>}
                
                <Box className='overflow-print' width={'100%'} height={'95%'} sx={{ display:'flex', flexDirection:'column', alignItems:'center', overflow:'auto', }} >
                    <Receipt
                    marketName={marketName}
                    address={address}
                    detailedAddress={detailedAddress}
                    date={date}
                    hour={hour}
                    receiptNo={receiptNo}
                    items={cartItems}
                    subTotal={subTotal}
                    savedByOffers={savedByOffers}
                    totalDiscount={totalDiscount}
                    savedByCoupons={savedByCoupons}
                    totalTax={totalTax}
                    total={total}
                    payments={payments}
                    changeAmount={amountToPay}
                    />
                </Box>
            </Box>
          </Box>
        </Fade>
    </Modal>
  )
}

const Receipt = ({ marketName, address, detailedAddress, date, hour, receiptNo, items, subTotal, totalDiscount, savedByOffers, savedByCoupons, totalTax, total, payments, changeAmount }) => {
    return (
        <Box sx={{width:'94%',ml:'3%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center',  }} textTransform={'uppercase'} >
            {/* Market Name */}
            <Typography variant="h6" fontWeight="bold" mb={1} textTransform={'none'}>
                {marketName}
            </Typography>
            {/* Address */}
            <Typography>{address}</Typography>
            <Typography mb={1.5} >{detailedAddress}</Typography>
            {/* Date and Hour */}
            <Typography mr={'auto'} ml={'5%'} width={'fit-content'} >Date: {date}</Typography>
            <Typography mr={'auto'} ml={'5%'} width={'fit-content'} >Hour: {hour}</Typography>
            {/* Receipt Number */}

            <Typography mb={2} mr={'auto'} ml={'5%'} width={'fit-content'} >Fiş No: {receiptNo}</Typography>
            {/* Items */}
            {items.map((item, index) => (
                item.product.unit === 'piece' ? (
                    <Stack key={`${item.product.id}-${item.qty}`} direction={'row'} sx={{width:'90%', my:0.5, height:'fit-content', alignItems:'end'}}>
                        <Typography sx={{maxWidth:'70%', flexWrap:'wrap', textAlign:'start'}} >{item.qty}X  {item.product.name}    {item.product.tax}</Typography>
                        <Typography ml={'auto'}>*{parseFloat(item.defaultPrice).toFixed(2)}</Typography>
                    </Stack>
                ) : (
                    <Stack direction={'column'} key={`${item.product.id}-${item.qty}`}  sx={{width:'90%', height:'fit-content', alignItems:'end'}} >
                        <Typography  mr={'auto'} mb={-1}>{item.quantity / 1000}KG x {item.product.price}TL </Typography>
                        <Stack direction={'row'} >
                            <Typography sx={{maxWidth:'70%', flexWrap:'wrap', textAlign:'start'}} >{item.product.name}    %{item.tax}</Typography>
                            <Typography ml={'auto'}>*{parseFloat(item.defaultPrice).toFixed(2)}</Typography>
                        </Stack>
                    </Stack>
                )
            ))}
            {/* Divider */}
            <Divider sx={{my:1, width:'100%', backgroundColor:'black', strokeWidth:1    }} />
            {/* Total Tax */}
            <Stack direction={'row'} width={'85%'}  >
                <Typography>Sub Total: </Typography>
                <Typography ml={'auto'} >*{subTotal.toFixed(2)}</Typography>
            </Stack>

            {savedByOffers > 0 && <Stack direction={'row'} width={'85%'}  >
                <Typography>Saved By Offers: </Typography>
                <Typography ml={'auto'} >*{savedByOffers.toFixed(2)}</Typography>
            </Stack>}

            {totalDiscount > 0 && <Stack direction={'row'} width={'85%'}  >
                <Typography>Saved By Discount: </Typography>
                <Typography ml={'auto'} >*{totalDiscount.toFixed(2)}</Typography>
            </Stack>}

            {savedByCoupons > 0 && <Stack direction={'row'} width={'85%'}  >
                <Typography>Saved By Coupons: </Typography>
                <Typography ml={'auto'} >*{savedByCoupons.toFixed(2)}</Typography>
            </Stack>}

            <Stack direction={'row'} width={'85%'}  >
                <Typography>Total: </Typography>
                <Typography ml={'auto'} >*{total.toFixed(2)}</Typography>
            </Stack>

            <Stack direction={'row'} width={'85%'}  >
                <Typography>Tax: </Typography>
                <Typography ml={'auto'} >*{totalTax.toFixed(2)}</Typography>
            </Stack>

            {/* Total Price */}
            {/* Divider */}
            <Divider sx={{my:1, width:'100%', backgroundColor:'black', strokeWidth:1    }} />
            {/* Payment Details */}
            {payments.map((payment, index) => (
                <Stack direction={'row'} key={index} width={'90%'} >
                    <Typography>{payment.type}</Typography>
                    <Typography ml={'auto'} >*{parseFloat(payment.amount).toFixed(2)}</Typography>
                </Stack>
            ))}
            {/* Change Amount */}
            <Stack direction={'row'} width={'90%'} mb={2} >
                <Typography>Change:</Typography>
                <Typography ml={'auto'} >*{parseFloat(changeAmount).toFixed(2)}</Typography>
            </Stack>
            {/* Additional Information */}
            
            <Typography mr={'auto'} ml={'5%'} >Kasiyer: Kasiyer1</Typography>
            <Typography mr={'auto'} ml={'5%'} >1425 Silivri</Typography>
            <Typography mr={'auto'} ml={'5%'} >001425/001/000007/990710/000282/</Typography>
            <Stack direction={'row'} width={'90%'} >
                <Typography>Z No:0707</Typography>
                <Typography ml={'auto'}>EKO No:0007</Typography>
            </Stack>
            <Typography>YN07033105</Typography>
        </Box>
    );
}

export default ReceiptModal
