import { Box, Button, Fade, Grid, ListItemIcon, ListItemText, Menu, MenuItem, Modal, Stack, TextField, Typography, colors } from '@mui/material'
import React, { useState } from 'react'
import MailModal from './MailModal';
import CouponModal from './CouponModal';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { KeyboardArrowDown } from "@mui/icons-material";
import useSize from '../../CustomHooks/useSize';


const Actions = ({cartItems, setCartItems, total, activeCoupons, setActiveCoupons,amountToPay, setAmountToPay, setTotal}) => {
  //todo finish, e fatura, preview, cancel
  const navigate = useNavigate()
  const [isMailModalOpen, setIsMailModalOpen ] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false)
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

  const onDeleteCouponClick=(coupon)=>{
    setActiveCoupons(prev => {
      const disabledCoupon = prev.find(c => c.key === coupon.key)
      const newCoupons = prev.filter(c => c.key !== coupon.key);

      setTotal(prev => prev - disabledCoupon.saved)
      setAmountToPay(prev => prev - disabledCoupon.saved)

      return newCoupons
    })
  }


  const onCancelButtonClick=()=>{
    setActiveCoupons([]);
    setAmountToPay(0);
    setTotal(0)
    setCartItems([])
    sessionStorage.setItem('cartItems', JSON.stringify([]))
    sessionStorage.setItem("discount", JSON.stringify(0));
    sessionStorage.setItem("subTotal", JSON.stringify(0));
    sessionStorage.setItem("amountToPay", JSON.stringify(0));
    sessionStorage.setItem("savedByOffers", JSON.stringify(0));
    sessionStorage.setItem('offerName', JSON.stringify('none'))
    sessionStorage.setItem('activeOffers', JSON.stringify([]))
    sessionStorage.setItem('activeCoupons', JSON.stringify([]))
    sessionStorage.setItem('email', JSON.stringify(''))
    sessionStorage.setItem('pastTransactions', JSON.stringify(''))
    navigate('/Sale')
  }

  return (
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%' , height:'auto', pt:0.5 }}>
      <Grid container rowSpacing={0.5} sx={{width:'100%', minHeight:size.y < 600 ? 60: 150, height:size.y < 600 ? 80 : 150}} >
        
        <Grid item xs={6} sx={{display:'flex',justifyContent:'center', alignItems:'center'}} >
          <Button variant='contained' onClick={onOpenMailModal} color='warning' disabled={!cartItems.length > 0 } sx={{width:'94%',textTransform:'none', height:size.y < 400 ? '90%' :'80%', minHeight: 35, fontSize:{xs:12, md:14, lg:18, xl:20}}} >
            E-Fatura
          </Button>
        </Grid>

        <Grid item xs={6} sx={{display:'flex',justifyContent:'center', alignItems:'center'}} >
          <Button variant='contained' onClick={onOpenCouponModal} color='success' disabled={!cartItems.length > 0 } sx={{width:'94%',textTransform:'none', height:size.y < 400 ? '90%' :'80%', minHeight: 35, fontSize:{xs:12, md:14, lg:18, xl:20}}} >
            Kupon Kodu
          </Button>
        </Grid>

        <Grid item xs={6} sx={{display:'flex',justifyContent:'center', alignItems:'center'}} >
          <Button variant='contained' color='warning' disabled={!cartItems.length > 0 || amountToPay > 0 } sx={{width:'94%',textTransform:'none', height:size.y < 400 ? '90%' :'80%', minHeight: 35, fontSize:{xs:12, md:14, lg:18, xl:20}}} >
            Cüzdan
          </Button>
        </Grid>

        <Grid item xs={6} sx={{display:'flex',justifyContent:'center', alignItems:'center'}} >
          <Button variant='contained' onClick={onCancelButtonClick} color='error' sx={{width:'94%',textTransform:'none', height:size.y < 400 ? '90%' :'80%', minHeight: 35, fontSize:{xs:12, md:14, lg:18, xl:20}}} >
            Cancel
          </Button>
        </Grid>
      <MailModal open={isMailModalOpen} onClose={onCloseMailModal} />
      <CouponModal open={isCouponModalOpen} onClose={onCloseCouponModal} activeCoupons={activeCoupons} setActiveCoupons={setActiveCoupons} setAmountToPay={setAmountToPay} total={total} setTotal={setTotal} />
      </Grid>

      {size.y < 500 ?
        <Stack direction={'row'} width={'100%'} justifyContent={'end'} my={0.5} >
          <CouponMenu activeCoupons={activeCoupons} onDeleteCouponClick={onDeleteCouponClick} />
        </Stack>
        :
        <CouponMenu activeCoupons={activeCoupons} onDeleteCouponClick={onDeleteCouponClick} />

      }
    </Box>
  )
}

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
      {size.y > 500 ? (
        <Stack direction={"column"} width={"100%"} sx={{ overflowY: "scroll" }}>
          {activeCoupons.map((coupon) => (
            <CouponRow key={coupon.key} coupon={coupon} onDeleteClick={onDeleteCouponClick} />
          ))}
        </Stack>
      ) : (
        <Button
          variant="contained"
          color='warning'
          onClick={handleMenuOpen}
          disabled={!activeCoupons.length > 0}
          sx={{ textTransform: "none", width:'47%', mr:'1.5%', ml:'1.5%',  height:35, minHeight: 30, fontSize:{xs:12, md:14, lg:18, xl:20}}}
          endIcon={<KeyboardArrowDown />}
        >
          Active Coupons
        </Button>
      )}

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={isMenuOpen}
        onClose={handleMenuClose}
        color='primary'
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
      // maxWidth: size.x < 700 ? 330 : '100%',
      border:'1px gray solid',
      ml:'2%',
      mr:'2%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height:size.y < 400 ? 40 : 60,
      borderRadius: 3,
      px: 1,
      my: 0.5,
      position:'relative'
    }}
  >
    <Button
      variant='contained'
      onClick={() => onDeleteClick(coupon)}
      color='error'
      sx={{ p: '1px', pr: 0, minWidth: 20, minHeight: 0, borderRadius: '50%', mr: 0.5 }}
      disableRipple
    >
      <ClearIcon sx={{ fontSize: { xs: '20px', lg: '25px' } }} />
    </Button>
    <Stack direction={'column'} justifyContent={'center'} width={'auto'} flex={1} maxWidth={size.x < 700 ? 210 : 500} mr={0.5} minHeight={30} >

      <Typography
        textOverflow={'ellipsis'}
        noWrap
        color={'primary'}
        fontWeight={700}
        fontSize={{ xs: 10, lg: '16px' }}
      >
        {coupon.key}
      </Typography>

 
      <Typography 
        width={'100%'}
        fontSize={{ xs: 10, lg: '16px' }}
        noWrap
        overflow={'ellipsis'}
      >
        {coupon.description}
        {/* kjhkjhlklhjhlkhhjfgfjhfjhgfjhgfjhfgjfkjhkjhlklhjhlkhhjfgfjhfjhgfjhgfjhfgjfkjhkjhlklhjhlkhhjfgfjhfjhgfjhgfjhfgjfkjhkjhlklhjhlkhhjfgfjhfjhgfjhgfjhfgjfkjhkjhlklhjhlkhhjfgfjhfjhgfjhgfjhfgjf  */}
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
