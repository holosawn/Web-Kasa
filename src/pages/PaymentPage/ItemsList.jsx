import { Box, Button, IconButton, Typography, Stack, Divider } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import CartItemCard from '../../PageComponents/Sale/CartItemCard'
import { ArrowBack } from '@mui/icons-material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CardTotal from '../../ReusableComponents/CardTotal'
import { useNavigate } from 'react-router-dom'
import useSize from '../../CustomHooks/useSize'

const ItemsList = ({amountToPay}) => {
    const [cartItems, setCartItems] = useState(JSON.parse(sessionStorage.getItem("cartItems")))
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
      setCartItems(prev => {
        const newItems = updateFunc(prev)
        console.log(newItems);

        sessionStorage.setItem('cartItems', JSON.stringify(newItems))
        return newItems
      })
    };

    console.log(sessionStorage.getItem('cartItems'));

  return (
    <Box
        sx={{
          height: "100%",
          my:'2vh',
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
            <Button variant='contained' size={size.y < 800 ? 'small' : 'large'} color='error' onClick={() => navigate('/Sale')} sx={{mr:'auto', position:'absolute', left:0}} >
                <ArrowBack fontSize={size.y < 800 ? 'small' : 'medium'} />
            </Button>
            <Typography
            sx={{ml:3}}
              variant='h5' color={'primary'} fontWeight={700} fontSize={{xs:18, md:18, lg:23, xl:28}} >
                Bill Total
            </Typography>
        </Stack>

        <Divider sx={{width:'100%',mb:0}} />

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
        <Balance amountToPay={amountToPay} />
      </Box>
  )
}

const Balance = ({amountToPay}) => {
  const [subTotal, setSubTotal] = useState(JSON.parse(sessionStorage.getItem('subTotal')));
  const [discount, setDiscount] = useState(JSON.parse(sessionStorage.getItem('discount')));
  const [savedByOffers, setSavedByOffers] = useState(JSON.parse(sessionStorage.getItem('savedByOffer')));

  return (
    <CardTotal
      subTotal={subTotal}
      discount={discount}
      savedByOffers={savedByOffers}
      amountToPay={amountToPay}
    />
  );
};

export default ItemsList
