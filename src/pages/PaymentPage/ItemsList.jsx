import { Box, Button, Typography, Stack, Divider } from '@mui/material'
import React, { useRef, } from 'react'
import CartItemCard from '../../ReusableComponents/CartItemCard'
import { ArrowBack } from '@mui/icons-material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CartTotal from '../../ReusableComponents/CartTotal'
import { useNavigate } from 'react-router-dom'
import useSize from '../../CustomHooks/useSize'
import { t } from 'i18next';



const ItemsList = ({coupons, amountToPay, activeCoupons, subTotal, total, discount, cartItems, setCartItems, setTotal, setSubTotal, setActiveCoupons, setAmountToPay, activeOffer, savedByOffers, setSavedByOffers}) => {
  const [size, setSize] = useSize()
  const scrollRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const navigate = useNavigate()

  const scroll = (scrollVal)=>{
    const currPos = scrollRef.current.scrollTop;
    scrollRef.current.scrollTo({left:0, top:(currPos + scrollVal), behavior:'auto'})
  }

  const startScroll = (scrollVal) => {
    if(scrollIntervalRef.current === null){
      scrollIntervalRef.current = setInterval(() => {
        scroll(scrollVal);
      }, 1);
    }
  };

  const stopScroll = () => {
    clearInterval(scrollIntervalRef.current);
    scrollIntervalRef.current = null
  };

  // Update items and make necessary updates on subtotal, active coupons etc.
  const setItems = (updateFunc) => {
    // Get updated items and get removed element
    const prevIds = cartItems.map(item => item.product.id);
    const newItems = updateFunc(cartItems);
    const newIds = newItems.map(item => item.product.id);
    const deletedId = prevIds.find(id => !newIds.includes(id));
    const deletedElement = cartItems.find(item => item.product.id === deletedId);

    setSubTotal(subTotal - deletedElement.defaultPrice);

    // Use the active offer and deleted item to calculate the new list of items and the new saved amount 
    const updatedCartItems = activeOffer.offerFunc(cartItems.filter(item => item.product.id !== deletedId ), setCartItems) || [];
    const newSavedByOffers = updatedCartItems.reduce((total, curr) => {
      const saved = curr?.offersApplied?.[activeOffer.key]?.saved || 0; 
      return total + saved; 
    }, 0);
    setSavedByOffers(newSavedByOffers);

    // Calculate the new total by subtracting the amount saved from the subtotal and applying the discount
    const tempTotal = (updatedCartItems.reduce((total, curr) => total + curr.defaultPrice ,0) - newSavedByOffers)  * (1 - discount/100);

    let newTotal = tempTotal;

    const validCoupons = [];

    // Loop through coupons to find appliable coupons after change on items and compute new total value
    for (const coupon of activeCoupons) {
      const activeCouponFunc = coupons[coupon.key].func || (()=>0) ;

      if (activeCouponFunc) {
        const priceDiff = activeCouponFunc(newTotal);

        if (priceDiff < 0) {
          validCoupons.push({...coupon, saved: priceDiff});
        }
      }
    }

    setActiveCoupons(validCoupons);
    setTotal(newTotal)
    // Calculate the new amount to pay by subtracting the amount paid with past transactions
    let newAmountToPay = newTotal;
    const pastTransactions = JSON.parse(sessionStorage.getItem('pastTransactions')) || [];
    for (const Transactions of pastTransactions) {
      newAmountToPay = newAmountToPay - Transactions.amount;
    }
    setAmountToPay(newAmountToPay);

    // Update the state with the updated list of items 
    setCartItems(updatedCartItems);
  };

  const onCartItemDelete =  (item) => {
    setItems((prevCartItems) => {
      // Filter out the item with the given ID
      const updatedCartItems = prevCartItems.filter(
        (cartItem) => cartItem.product.code !== item.product.code
      );
      return updatedCartItems || [];
    });
  }


  const onBackClick=()=>{
  navigate('/Sale')
  }

  
  return (
    <Box
        sx={{
          height: "100%",
          width: "50%",
          overflowY: "hidden",
          overflowX: "hidden",
        }}
        bgcolor={"background.paper"}
        p={1}
        pt={2}
        minWidth={220}
        borderRadius={2}
        display={'flex'}
        flexDirection={'column'}
      >
        <Stack direction={'row'} justifyContent={'center'} height={size.y < 800 ? 35 : 45 } alignItems={'end'} width={'100%'} ml={'auto'} p={1} pb={0.5} mb={0} position={'relative'} >
            <Button variant='contained' size={size.y < 800 ? 'small' : 'large'} color='error' onClick={onBackClick} sx={{mr:'auto', mb:0.5, position:'absolute', left:0}} >
                <ArrowBack fontSize={size.y < 800 ? 'small' : 'medium'} />
            </Button>
            <Typography
            sx={{ml:3}}
              variant='h5' color={'primary'} fontWeight={700} fontSize={{xs:18, md:18, lg:23, xl:28}} >
                {t('payment.billTotal')}
            </Typography>
        </Stack>

        <Divider sx={{width:'100%',my:1, mt:0.5}} />

        <Box flex={1} minHeight={0} position={'relative'} width={'98%'} sx={{ml:'auto',}} >
        <Box ref={scrollRef}  height={'100%'}width={'100%'} sx={{display:'flex', flexDirection:'column' , pr:'7%', overflowY:'scroll', }} >

          {cartItems?.map((item) => (
            <CartItemCard
                item={item}
                setCartItems={setItems}
                key={item.product.code}
                onDeleteClick={onCartItemDelete}
            />
            ))}

          <Button
            variant='contained'
            color={'warning'}
            sx={{position:'absolute', top:0, right:0, mr:{xs:1, lg:1, xl:2}, my:{xs:0.2, md:0.5}, borderRadius:'100%', width:{xs:20, md:30, lg:45}, height:{xs:30, lg:45}, minWidth:20, minHeight:20 }}
            onMouseDown={()=>startScroll(-7)}
            onMouseUp={stopScroll}
          >
            <KeyboardArrowUpIcon/>
          </Button>

          <Button
            variant='contained'
            color={'warning'}
            sx={{position:'absolute', bottom:0, right:0, mr:{xs:1, lg:1, xl:2}, my:{xs:0.2, md:0.5}, borderRadius:'100%', width:{xs:20, md:30, lg:45}, height:{xs:30, lg:45}, minWidth:20, minHeight:20 }}
            onMouseDown={()=>startScroll(7)}
            onMouseUp={stopScroll}
          >
            <KeyboardArrowDownIcon/>
          </Button>
          
        </Box>
        </Box>
        <Balance amountToPay={amountToPay} discount={discount} savedByOffers={savedByOffers} subTotal={subTotal} total={total} activeCoupons={activeCoupons} />
      </Box>
  )
}

const Balance = ({amountToPay, discount, savedByOffers, subTotal, total, activeCoupons}) => {
  const coupons = activeCoupons.map(coupon => ({
    'key':coupon.key,
    saved : coupon.saved
  }))


  return (
    <CartTotal
      subTotal={subTotal}
      total = {total}
      discount={discount}
      savedByOffers={savedByOffers}
      amountToPay={amountToPay}
      coupons={coupons}
    />
  );
};

export default ItemsList
