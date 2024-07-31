import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import ItemsList from "./ItemsList";
import Actions from "./Actions";
import Transactions from "./Transactions";
import ReceiptModal from "./ReceiptModal";
import { useNavigate } from "react-router-dom";
import useSize from "../../CustomHooks/useSize";
import { t } from "i18next";
import useSessionStorage from '../../CustomHooks/useSessionStorage'

const PaymentPage = () => {
  const [cartItems, setCartItems] = useSessionStorage('cartItems', [])
  const [subTotal, setSubTotal] = useSessionStorage('subTotal', 0)
  const [savedByOffers, setSavedByOffers] = useSessionStorage('savedByOffers', 0)
  const [amountToPay, setAmountToPay] = useSessionStorage('amountToPay', 0)
  const [discount, setDiscount] = useSessionStorage('discount', 0)
  const [total, setTotal] = useSessionStorage('total', 0)
  const [activeCoupons, setActiveCoupons] = useSessionStorage('activeCoupons', []) 
  const [activeOffer, setActiveOffer] = useSessionStorage('offerName', {})
  const [taggedCustomer, setTaggedCustomer] = useSessionStorage('taggedCustomer', {})
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false)
  const [size] = useSize();
  const navigate= useNavigate()

  // Create sale object and store it on session
  const onFinish =()=>{

    const transactions = JSON.parse(sessionStorage.getItem("pastTransactions"))

    const sale = {
      "date" : new Date(),
      "items": cartItems,
      "transactions": transactions,
      "subTotal" : subTotal,
      "total" : total,
      "coupons" : activeCoupons,
      "savedByOffers" : savedByOffers,
      "discount" : discount,
      "change" : amountToPay >= 0 ? 0 : amountToPay,
    }


    sessionStorage.setItem("sales", JSON.stringify([]))
    const pastSales = JSON.parse(sessionStorage.getItem("sales")) || []
    sessionStorage.setItem("sales", JSON.stringify([...pastSales, sale]))

    localStorage.setItem('reports', JSON.stringify([]))

    // Set spending score based on sale amount
    if (Object.keys(taggedCustomer).length > 0) {
      let storedCustomers = JSON.parse(localStorage.getItem('customers')) || []
      const customerIndex = storedCustomers.findIndex((customer) => customer.id === taggedCustomer.id)

      if (customerIndex !== -1) {
        storedCustomers[customerIndex].spendingScore = parseFloat(((storedCustomers[customerIndex].spendingScore || 0) + parseInt(sale.total) / 100).toFixed(2))
        localStorage.setItem('customers', JSON.stringify(storedCustomers))
      }
    }

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
    setActiveCoupons([]);
    setAmountToPay(0);
    setTotal(0);
    setCartItems([]);
    setDiscount(0);
    setSubTotal(0);
    setSavedByOffers(0);
    setActiveOffer('none');

    navigate('/sale')
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
      <ItemsList coupons={coupons} amountToPay={amountToPay} total={total} subTotal={subTotal} activeCoupons={activeCoupons} cartItems={cartItems} setCartItems={setCartItems} setTotal={setTotal} setSubTotal={setSubTotal} discount={discount} savedByOffers={savedByOffers} setSavedByOffers={setSavedByOffers} setActiveCoupons={setActiveCoupons} setAmountToPay={setAmountToPay} activeOffer={activeOffer}  />
      
      <Stack direction={'column'} bgcolor={"background.paper"} alignItems={'center'} sx={{borderRadius:2, ml:1, height:'100%',  px:0.5, minWidth:250, pt:0.5 }}>
        
        {/* Customer actions, cancel sale, coupon actions */}
        <Actions coupons={coupons} taggedCustomer={taggedCustomer} setTaggedCustomer={setTaggedCustomer} cartItems={cartItems} setCartItems={setCartItems} total={total} activeCoupons={activeCoupons} setActiveCoupons={setActiveCoupons} amountToPay={amountToPay} setAmountToPay={setAmountToPay} setTotal={setTotal} />
        
        {/* Payment actions */}
        <Transactions cartItems={cartItems} amountToPay={amountToPay} setAmountToPay={setAmountToPay} />
        
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
      if (taggedCustomer && Object.keys(taggedCustomer).length > 0) {
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
