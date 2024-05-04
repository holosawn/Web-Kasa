import { Box, Button, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import ItemsList from "./ItemsList";
import Actions from "./Actions";
import Transactions from "./Transactions";
import ReceiptModal from "./ReceiptModal";
import { useNavigate } from "react-router-dom";
import { offers } from "../../Data/Offers";
import useSize from "../../CustomHooks/useSize";
import { t } from "i18next";
import TagCustomerModal from "./TagCustomerModal";

const Payment = () => {
  // todo no new products on sale page
  // todo sale page has modal lang problems, also no puschase before register 
  const [cartItems, setCartItems] = useState(JSON.parse(sessionStorage.getItem('cartItems')) || [])
  const [subTotal, setSubTotal] = useState(JSON.parse(sessionStorage.getItem('subTotal')) || 0)
  const [savedByOffers, setSavedByOffers] = useState(JSON.parse(sessionStorage.getItem('savedByOffers')) || 0)
  const [amountToPay, setAmountToPay] = useState(JSON.parse(sessionStorage.getItem('amountToPay')) || 0)  
  const [discount, setDiscount] = useState(JSON.parse(sessionStorage.getItem('discount')) || 0)
  const [total, setTotal] = useState(JSON.parse(sessionStorage.getItem('total')) || 0)
  const [activeCoupons, setActiveCoupons] = useState(JSON.parse(sessionStorage.getItem('activeCoupons')) || [])
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false)
  const [activeOffer, setActiveOffer] = useState(offers[JSON.parse(sessionStorage.getItem('offerName'))] || {})
  const [taggedCustomer, setTaggedCustomer] = useState(JSON.parse(sessionStorage.getItem('taggedCustomer')) || {})
  const [size] = useSize();
  const navigate= useNavigate()


  useEffect(()=>{
    sessionStorage.setItem('activeCoupons', JSON.stringify(activeCoupons))
  },[activeCoupons.length])

  useEffect(()=>{
    sessionStorage.setItem('amountToPay', JSON.stringify(amountToPay))
  },[amountToPay])

  useEffect(()=>{
    sessionStorage.setItem('total', JSON.stringify(total))
  },[total])


  const onFinishButtonClick =()=>{
    setIsReceiptModalOpen(true)
  }

  const onFinish =()=>{
    sessionStorage.setItem('activeCoupons',JSON.stringify([]))
    sessionStorage.setItem('amountToPay',JSON.stringify(0))
    sessionStorage.setItem('total',JSON.stringify(0))
    sessionStorage.setItem('cartItems', JSON.stringify([]))
    sessionStorage.setItem("discount", JSON.stringify(0));
    sessionStorage.setItem("subTotal", JSON.stringify(0));
    sessionStorage.setItem("savedByOfferss", JSON.stringify(0));
    sessionStorage.setItem('offerName', JSON.stringify('none'))
    sessionStorage.setItem('email', JSON.stringify(''))
    sessionStorage.setItem('pastTransactions', JSON.stringify(''))
    sessionStorage.setItem('taggedCustomer', JSON.stringify({}))

    navigate('/Sale')
  }

  const onCloseReceiptModal = ()=>{
    setIsReceiptModalOpen(false)
  }


  
  return (
    <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', height: size.y < 500 ? '98vh' : '96vh', pt: size.y < 500 ? '1vh' : '2vh', minHeight:370, minWidth:667, overflow:'visible'}} >
      <ItemsList amountToPay={amountToPay} total={total} subTotal={subTotal} activeCoupons={activeCoupons} cartItems={cartItems} setCartItems={setCartItems} setTotal={setTotal} setSubTotal={setSubTotal} discount={discount} savedByOffers={savedByOffers} setSavedByOffers={setSavedByOffers} setActiveCoupons={setActiveCoupons} setAmountToPay={setAmountToPay} activeOffer={activeOffer} setActiveOffer={setActiveOffer} />
      <Stack direction={'column'} bgcolor={"background.paper"} alignItems={'center'} sx={{borderRadius:2, ml:1, height:'100%',  px:0.5, minWidth:250, pt:0.5 }}>
        <Actions taggedCustomer={taggedCustomer} setTaggedCustomer={setTaggedCustomer} cartItems={cartItems} setCartItems={setCartItems} total={total} activeCoupons={activeCoupons} setActiveCoupons={setActiveCoupons} amountToPay={amountToPay} setAmountToPay={setAmountToPay} setTotal={setTotal} />
        <Transactions cartItems={cartItems} amountToPay={amountToPay} setAmountToPay={setAmountToPay} />
        <Button onClick={onFinishButtonClick} disabled={amountToPay > 0 || !cartItems.length > 0} variant='contained' size="large" color='success'  sx={{textTransform:'uppercase', mt:0.5, mx:'1%', mb:size.y < 500 ? 1 : 2, width:'98%', height: size.y < 400 ? 30 : size.y < 600 ? 45 : 60, fontSize:{xs:12, md:14, lg:18, xl:20}}} >
          {t('payment.finish')}
        </Button>
      </Stack>
      <ReceiptModal cartItems={cartItems} subTotal={subTotal} savedByOffers={savedByOffers} amountToPay={amountToPay} discount={discount} total={total} activeCoupons={activeCoupons} open={isReceiptModalOpen} onClose={onCloseReceiptModal} onFinish={onFinish} />
    </Box>
  );
};

export default Payment;
