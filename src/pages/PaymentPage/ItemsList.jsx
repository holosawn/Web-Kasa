import { Box, Button, IconButton, Typography, Stack, Divider } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import CartItemCard from '../../ReusableComponents/CartItemCard'
import { ArrowBack } from '@mui/icons-material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CardTotal from '../../ReusableComponents/CardTotal'
import { useNavigate } from 'react-router-dom'
import useSize from '../../CustomHooks/useSize'
import { get3Pay2, offers, resetOffers } from '../../Data/Offers';



const ItemsList = ({amountToPay, activeCoupons, subTotal, total, discount, cartItems, setCartItems, setTotal, setSubTotal, setActiveCoupons, setAmountToPay, activeOffer, setActiveOffer, savedByOffers, setSavedByOffers}) => {
    //todo drwaer amount can not be empty alert on currentItemCard
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

  const setItems = (updateFunc) => {
        const prevIds = cartItems.map(item => item.product.id);

        const newItems = updateFunc(cartItems)
        const newIds = newItems.map(item => item.product.id);
        const deletedId = prevIds.find(id => !newIds.includes(id));
        const deletedElement = cartItems.find(item => item.product.id === deletedId);


        setSubTotal(subTotal - deletedElement.defaultPrice)

        
        const updatedCartItems = activeOffer.offerFunc(cartItems.filter(item => item.product.id !== deletedId ), setCartItems) || []
        const newSavedByOfferss = updatedCartItems.reduce((total, curr) => {
          const saved = curr?.offersApplied?.[activeOffer.key]?.saved || 0; // Proper use of optional chaining and default value
          return total + saved; // Add the saved value to the total
        }, 0);
        setSavedByOffers(newSavedByOfferss)
        

        const tempTotal = (updatedCartItems.reduce((total,curr) => total + curr.defaultPrice ,0) - newSavedByOfferss )  * (1 - discount/100);
        
        // Initialize total and amountToPay with initial values
        let newTotal = tempTotal;
        
        // Create a new list of valid coupons
        const validCoupons = [];
        
        // Loop through active coupons and process them
        for (const coupon of activeCoupons) {
          const activeCouponFunc = coupon.func || (()=>0) ;
        
          if (activeCouponFunc) {
            const priceDiff = activeCouponFunc(newTotal);
        
            // Validate the price difference
            if (priceDiff < 0) {
              newTotal += priceDiff;        
              // Keep the valid coupon in the list
              validCoupons.push(coupon);
            }
          }
        }
        setActiveCoupons(validCoupons)        
        setTotal(newTotal)

        let newAmountToPay =newTotal ;
        const pastTransactions = JSON.parse(sessionStorage.getItem('pastTransactions')) || []
        for (const Transactions of pastTransactions) {
          newAmountToPay = newAmountToPay - Transactions.amount
        }
        setAmountToPay(newAmountToPay)

        setCartItems(updatedCartItems)
        sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
    };

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
        pb={1}
        minWidth={220}
        borderRadius={2}
        display={'flex'}
        flexDirection={'column'}
      >
        <Stack direction={'row'} justifyContent={'center'} height={size.y < 800 ? 35 : 45 } alignItems={'end'} width={'100%'} ml={'auto'} p={1} mb={0} position={'relative'} >
            <Button variant='contained' size={size.y < 800 ? 'small' : 'large'} color='error' onClick={onBackClick} sx={{mr:'auto', position:'absolute', left:0}} >
                <ArrowBack fontSize={size.y < 800 ? 'small' : 'medium'} />
            </Button>
            <Typography
            sx={{ml:3}}
              variant='h5' color={'primary'} fontWeight={700} fontSize={{xs:18, md:18, lg:23, xl:28}} >
                Bill Total
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
    <CardTotal
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
