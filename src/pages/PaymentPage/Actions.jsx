import { Box, Button,  Grid, IconButton,   Menu,   Stack,  Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MailModal from './MailModal';
import CouponModal from './CouponModal';
import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { useNavigate } from 'react-router-dom';
import { KeyboardArrowDown } from "@mui/icons-material";
import useSize from '../../CustomHooks/useSize';
import { t } from 'i18next';
import TagCustomerModal from './TagCustomerModal';


const Actions = ({coupons, cartItems, setCartItems, taggedCustomer, setTaggedCustomer, total, activeCoupons, setActiveCoupons,amountToPay, setAmountToPay, setTotal}) => {
  //todo finish, e fatura, preview, cancel
  const navigate = useNavigate()
  const [isMailModalOpen, setIsMailModalOpen ] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false)
  const [isTagCusModalOpen, setIsTagCusModalOpen] = useState(false);
  const [size] = useSize();

  const onCloseMailModal = ()=>{
    setIsMailModalOpen(false)
  }

  const onOpenMailModal = ()=>{
    setIsMailModalOpen(true)
  }

  const onCloseCouponModal = ()=>{
    setIsCouponModalOpen(false)
  }

  const onOpenCouponModal = ()=>{
    setIsCouponModalOpen(true)
  }

  // Check if activeCoupons are still valid and recalculate savings
  useEffect(()=>{

    if (activeCoupons) {

    let tempTotal = total;
    let tempActiveCoupons = activeCoupons

      for (const currCoupon of tempActiveCoupons) {
        const priceDiff = coupons[currCoupon.key].func(tempTotal)
        

        // Check if it should save different amount and calculate new tatol value
        if (priceDiff !== currCoupon.saved) {
          tempTotal += (priceDiff === 1 ? 0 : priceDiff) - currCoupon.saved
        }

        // delete coupons if its not valid anymore
        if (priceDiff === 1 || typeof priceDiff === 'string') {
          tempActiveCoupons = tempActiveCoupons.filter(coupon => coupon.key !== currCoupon.key )
        }
        
        else{
        // Update saved value if its still valid
          tempActiveCoupons = tempActiveCoupons.map(coup => {
            if (coup.key === currCoupon.key) {
              return { ...coup, saved: priceDiff };
            } else {
              return coup;
            }
          })
        }
      }

      setTotal(tempTotal)
      // Decrement amount to pay as much as total decremented
      setAmountToPay(prev => prev - (total - tempTotal))
      setActiveCoupons(tempActiveCoupons)
    }
  },[])

  // Delete coupon and make necessary updates on total and amount to pay
  const onDeleteCouponClick=(coupon)=>{
    setActiveCoupons(prev => {
      const disabledCoupon = prev.find(c => c.key === coupon.key)
      const newCoupons = prev.filter(c => c.key !== coupon.key);

      setTotal(prev => prev - disabledCoupon.saved)
      setAmountToPay(prev => prev - disabledCoupon.saved)

      return newCoupons
    })
  }

  // Clear sale related data from states and sessionStorage
  const onCancelButtonClick=()=>{
    setActiveCoupons([]);
    setAmountToPay(0);
    setTotal(0)
    setCartItems([])
    sessionStorage.setItem("discount", JSON.stringify(0));
    sessionStorage.setItem("subTotal", JSON.stringify(0));
    sessionStorage.setItem("savedByOffers", JSON.stringify(0));
    sessionStorage.setItem('offerName', JSON.stringify('none'))
    sessionStorage.setItem('activeOffers', JSON.stringify([]))
    sessionStorage.setItem('email', JSON.stringify(''))
    sessionStorage.setItem('pastTransactions', JSON.stringify(''))
    sessionStorage.setItem('taggedCustomer', JSON.stringify({}))
    sessionStorage.setItem('taggedCustomer', JSON.stringify({}))
    sessionStorage.setItem('cartItems', JSON.stringify([]))
    navigate('/sale')
  }

  const openCusModal=()=>{
    setIsTagCusModalOpen(true) 
  }

  const closeCusModal=()=>{
    setIsTagCusModalOpen(false)
  }

  return (
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%' , height:'auto', pt:0.5, mb:1 }}>
      <Grid container rowSpacing={0.5} sx={{width:'100%', minHeight:size.y < 600 ? 60: 150, height:size.y < 600 ? 80 : 150}} >
        
        <Grid item xs={6} sx={{display:'flex',justifyContent:'center', alignItems:'center'}} >
          <Button variant='contained' onClick={onOpenMailModal} color='warning' disabled={!cartItems.length > 0 } sx={{width:'94%',textTransform:'none', height:size.y < 400 ? '90%' :'80%', minHeight: 35, fontSize:{xs:12, md:14, lg:18, xl:20}}} >
            {t('payment.eFatura')}
          </Button>
        </Grid>

        <Grid item xs={6} sx={{display:'flex',justifyContent:'center', alignItems:'center'}} >
          <Button variant='contained' onClick={onOpenCouponModal} color='success' disabled={!cartItems.length > 0 } sx={{width:'94%',textTransform:'none', height:size.y < 400 ? '90%' :'80%', minHeight: 35, fontSize:{xs:12, md:14, lg:18, xl:20}}} >
          {t('payment.couponCode')}
          </Button>
        </Grid>

        <Grid item xs={6} sx={{display:'flex',justifyContent:'center', alignItems:'center'}} >
          <Button variant='contained' color='warning' onClick={openCusModal} sx={{width:'94%',textTransform:'none', height:size.y < 400 ? '90%' :'80%', minHeight: 35, fontSize:{xs:12, md:14, lg:18, xl:20}}} >
            {t('payment.tagCustomer')}
          </Button>
        </Grid>

        <Grid item xs={6} sx={{display:'flex',justifyContent:'center', alignItems:'center'}} >
          <Button variant='contained' onClick={onCancelButtonClick} color='error' sx={{width:'94%',textTransform:'none', height:size.y < 400 ? '90%' :'80%', minHeight: 35, fontSize:{xs:12, md:14, lg:18, xl:20}}} >
            {t('payment.cancel')}
          </Button>
        </Grid>
      { isMailModalOpen && <MailModal open={isMailModalOpen} onClose={onCloseMailModal} />}
      { isCouponModalOpen && <CouponModal coupons={coupons} open={isCouponModalOpen} onClose={onCloseCouponModal} activeCoupons={activeCoupons} setActiveCoupons={setActiveCoupons} setAmountToPay={setAmountToPay} total={total} setTotal={setTotal} />}
      { isTagCusModalOpen &&  <TagCustomerModal open={isTagCusModalOpen} onClose={closeCusModal} onDeleteCoupon={onDeleteCouponClick} activeCoupons={activeCoupons} taggedCustomer={taggedCustomer} setTaggedCustomer={setTaggedCustomer} />}
      </Grid>

      <CouponMenu activeCoupons={activeCoupons} onDeleteCouponClick={onDeleteCouponClick} />

    </Box>
  )
}

// Renders current coupons 
// If screen size is small becomes a collapsable menu 
const CouponMenu = ({ activeCoupons, onDeleteCouponClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [size] = useSize()

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {activeCoupons.length > 1 ? (
          <Button
          variant="contained"
          color='warning'
          onClick={handleMenuOpen}
          disabled={!activeCoupons.length > 0}
          sx={{ textTransform: "none", width:'47%', mr:'1.5%', ml:'auto', mt:1,  height:size.y < 600 ? 40 : 60, minHeight: 35, fontSize:{xs:12, md:14, lg:18, xl:20}}}
          endIcon={<KeyboardArrowDown />}
        >
          {t('payment.activeCoupons')}
        </Button>

      ) : (
        <Stack direction={"column"} width={"100%"}  maxWidth={550} sx={{ overflowY: "scroll", overflowX:'hidden' }}>
          {activeCoupons.map((coupon) => (
            <CouponRow key={coupon.key} coupon={coupon} onDeleteClick={onDeleteCouponClick} />
          ))}
        </Stack>
      )}

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={isMenuOpen}
        onClose={handleMenuClose}
        color='primary'
        slotProps={{
          paper:{
            sx:{
              borderRadius:5,
              py:0
            }
          },
          
        }}
        MenuListProps={{
          sx:{
            p:0.5
          }
        }}
      >
        {activeCoupons.map((coupon) => (
          <CouponRow key={coupon.key} coupon={coupon} onDeleteClick={onDeleteCouponClick}/>
        ))}
      </Menu>
    </>
  );
};

const CouponRow = ({ coupon, onDeleteClick }) => {
  const [size] = useSize();

  return(
  <Box
    bgcolor={'background.paper'}
    sx={{
      // width: size.x < 700 ? 300 :  '96%',
      width:'96%',
      // maxWidth: size.x < 700 ? 330 : '100%',
      border:'1px gray solid',
      ml:'2%',
      mr:'2%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      // height:size.y < 400 ? 40 : 60,
      borderRadius: 3,
      px: 1,
      my: 0.5,
      position:'relative',
      textWrap:'wrap',

    }}
  >

    <IconButton
      variant="contained"
      color="error"
      onClick={()=> onDeleteClick(coupon)}
      sx={{ p: '1px', pl: 0, minWidth: 20, minHeight: 0, borderRadius: '50%', mr: 0.5 }}
    >
      <HighlightOffSharpIcon sx={{ fontSize: {xs:20, md:30} }} />
    </IconButton>
    <Stack direction={'column'} justifyContent={'center'} width={'auto'} flex={1} maxWidth={size.x < 700 ? 210 : 500} mr={0.5} minHeight={30} >

      <Typography
        width={'100%'}
        color={'primary'}
        fontWeight={700}
        fontSize={{ xs: 10, lg: '16px' }}
      >
        {coupon.key}
      </Typography>

 
      <Typography 
        width={'100%'}
        fontSize={{ xs: 10, lg: '16px' }}
        // noWrap
        overflow={'ellipsis'}
      >
        {coupon.description}
      </Typography>
    </Stack >
    
    <Typography
        color={'secondary'}
        fontWeight={700}
        fontSize={{ xs: 10, lg: '16px' }}
        // width={'30%'}
        // minWidth={60}
        // overflow={'visible'}
        // ml={'auto'}
        // noWrap
        sx={{position:'absolute', top:4, right:6}}
      >
        {coupon.saved.toFixed(2)} TRY
      </Typography>
  </Box>
)};


export default Actions
