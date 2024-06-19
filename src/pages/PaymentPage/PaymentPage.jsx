import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import ItemsList from "./ItemsList";
import Actions from "./Actions";
import Transactions from "./Transactions";
import ReceiptModal from "./ReceiptModal";
import { useNavigate } from "react-router-dom";
import { offers } from "../../Data/Offers";
import useSize from "../../CustomHooks/useSize";
import { t } from "i18next";

const PaymentPage = () => {
  // TODO charge Amount goes crazy
  const [cartItems, setCartItems] = useState(JSON.parse(sessionStorage.getItem('cartItems')) || [])
  const [subTotal, setSubTotal] = useState(JSON.parse(sessionStorage.getItem('subTotal')) || 0)
  const [savedByOffers, setSavedByOffers] = useState(JSON.parse(sessionStorage.getItem('savedByOffers')) || 0)
  const [amountToPay, setAmountToPay] = useState(JSON.parse(sessionStorage.getItem('amountToPay')) || 0)  
  const [discount, setDiscount] = useState(JSON.parse(sessionStorage.getItem('discount')) || 0)
  const [total, setTotal] = useState(JSON.parse(sessionStorage.getItem('total')) || 0)
  const [activeCoupons, setActiveCoupons] = useState(JSON.parse(sessionStorage.getItem('activeCoupons')) || [])
  const [activeOffer, setActiveOffer] = useState(offers[JSON.parse(sessionStorage.getItem('offerName'))] || {})
  const [taggedCustomer, setTaggedCustomer] = useState(JSON.parse(sessionStorage.getItem('taggedCustomer')) || {})
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false)
  const [size] = useSize();
  const navigate= useNavigate()

  // Function to use instead of SetActiveCoupons
  const updateActiveCoupons = (input)=>{
    setActiveCoupons(prev => {
      if (typeof input === 'function') {
        sessionStorage.setItem('activeCoupons', JSON.stringify(input(prev)))
        return input(prev)
      }
      else{
        sessionStorage.setItem('activeCoupons', JSON.stringify(input))
        return input
      }
    })
  }

  // Function to use instead of setAmountToPay
  const updateAmountToPay =(input)=>{
    setAmountToPay(prev => {
      if (typeof input === 'function') {
        sessionStorage.setItem('amountToPay', JSON.stringify(input(prev)))
        return input(prev)
      }
      else{
        sessionStorage.setItem('amountToPay', JSON.stringify(input))
        return input
      }
    })
  }

  // Function to use instead of setTotal
  const updateTotal = (input)=>{
    setTotal(prev => {
      if (typeof input === 'function') {
        sessionStorage.setItem('total', JSON.stringify(input(prev)))
        return input(prev)
      }
      else{
        sessionStorage.setItem('total', JSON.stringify(input))
        return input
      }
    })
  }

  // Function to use instead of setCartItems
  const updateCartItems = (input)=>{
    setCartItems(prev => {
      if (typeof input === 'function') {
        sessionStorage.setItem('cartItems', JSON.stringify(input(prev)))
        return input(prev)
      }
      else{
        sessionStorage.setItem('cartItems', JSON.stringify(input))
        return input
      }
    })
  }

  const onFinish =()=>{

    const transactions = JSON.parse(sessionStorage.getItem("pastTransactions"))

    const sale = {
      "date" : new Date(),
      "items": cartItems,
      "transactions": transactions,
      "total" : total,
      "coupons" : activeCoupons,
      "savedByOffers" : savedByOffers,
      "discount" : discount,
      "change" : amountToPay >= 0 ? 0 : amountToPay,
    }

    const pastSales = JSON.parse(sessionStorage.getItem("sales")) || []
    sessionStorage.setItem("sales", JSON.stringify([...pastSales, sale]))

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

  const onFinishButtonClick =()=>{
    setIsReceiptModalOpen(true)
  }

  const closeReceiptModal = ()=>{
    setIsReceiptModalOpen(false)
  }

  return  (
    <Box sx={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', height: size.y < 500 ? '98vh' : '96vh', pt: size.y < 500 ? '1vh' : '2vh', minHeight:370, minWidth:667, overflow:'visible'}} >
      {/* Renders cartItems and cardTotal */}
      <ItemsList coupons={coupons} amountToPay={amountToPay} total={total} subTotal={subTotal} activeCoupons={activeCoupons} cartItems={cartItems} setCartItems={updateCartItems} setTotal={updateTotal} setSubTotal={setSubTotal} discount={discount} savedByOffers={savedByOffers} setSavedByOffers={setSavedByOffers} setActiveCoupons={updateActiveCoupons} setAmountToPay={updateAmountToPay} activeOffer={activeOffer}  />
      
      <Stack direction={'column'} bgcolor={"background.paper"} alignItems={'center'} sx={{borderRadius:2, ml:1, height:'100%',  px:0.5, minWidth:250, pt:0.5 }}>
        
        {/* Customer actions, cancel sale, coupon actions */}
        <Actions coupons={coupons} taggedCustomer={taggedCustomer} setTaggedCustomer={setTaggedCustomer} cartItems={cartItems} setCartItems={updateCartItems} total={total} activeCoupons={activeCoupons} setActiveCoupons={updateActiveCoupons} amountToPay={amountToPay} setAmountToPay={updateAmountToPay} setTotal={updateTotal} />
        
        {/* Payment actions */}
        <Transactions cartItems={cartItems} amountToPay={amountToPay} setAmountToPay={updateAmountToPay} />
        
        <Button onClick={onFinishButtonClick} disabled={amountToPay > 0.001 || !cartItems.length > 0} variant='contained' size="large" color='success'  sx={{textTransform:'uppercase', mt:size.y < 500 ? 0.5 : 1, mx:'1%', mb:size.y < 500 ? 0.5 : size.y < 700 ? 1 : 2, width:'98%', height: size.y < 400 ? 30 : size.y < 600 ? 45 : 60, fontSize:{xs:12, md:14, lg:18, xl:20}}} >
          {t('payment.finish')}
        </Button>
      </Stack>
      <ReceiptModal cartItems={cartItems} subTotal={subTotal} savedByOffers={savedByOffers} amountToPay={amountToPay} discount={discount} total={total} activeCoupons={activeCoupons} open={isReceiptModalOpen} onClose={closeReceiptModal} onFinish={onFinish} />
    </Box>
  );
};

export default PaymentPage;



  // Available coupons on application
  const coupons={
    'ABC123':{
      key:'ABC123',
      description:'20 TRY off on any purchase above 50 TRY',
      func:(num)=>{
        if (num > 50) {
          return -20
        }
        else {
          return 1
        }
      }
    },
    'PERCENT10':{
      key: 'PERCENT10',
      description: '10% off on your total purchase',
      func:(num) => {
        return - num* 0.10
      }
    },
    'CUSTOMER10': {
      key: 'CUSTOMER10',
      description: '10% off on purchases up to 100 TRY, 20% off on purchases over 100',
      func: (num) => {
        const taggedCustomer = JSON.parse(sessionStorage.getItem('taggedCustomer'))
        if (Object.keys(taggedCustomer).length > 0) {
          if (num <= 100) {
            return - num * 0.10
          } else {
            return - num * 0.20
          }
        }
        else{
          return 'noTaggedCustomer'
        }
      },
      check:'customer'
    }
  }

  export {coupons}
