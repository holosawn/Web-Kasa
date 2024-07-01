import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, {useEffect, useLayoutEffect, useState } from "react"
import CurrentItemCard from "../../ReusableComponents/CurrentItemCard";
import CartItemCard from "../../ReusableComponents/CartItemCard";
import { t } from "i18next";
import { useLanguage } from "../../contexts/LangContext";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../ReusableComponents/LoadingButton";
import useAlert from "../../CustomHooks/useAlert";
import CartTotal from "../../ReusableComponents/CartTotal";
import useFetchData from "../../CustomHooks/useFetchData";
import { FiberManualRecord } from "@mui/icons-material";
import { useShiftStatus } from "../../contexts/ShiftContext";
import useSize from "../../CustomHooks/useSize";
import useSessionStorage from "../../CustomHooks/useSessionStorage";


function get3Pay2(Items) {
  const updatedItems = Items.map((item) => {
    const isPiece = item.product.unit === "piece";
    // Set the divide number based on whether the item is a piece or not
    const divideNum = isPiece ? 3 : 3000;

    // Change number to closest power of divideNum
    const qtyToApply = Math.floor(item.qty / divideNum) * divideNum;

    const isAppliable =
      (item.offersApplied === undefined ||
        item.defaultPrice !== item.computedPrice + item.saved) &&
      qtyToApply >= divideNum;

    // Create a new object with updated computed price and offers applied
    const updatedItem = {
      ...item,
      computedPrice: isAppliable
        ? item.defaultPrice - item.product.price * (qtyToApply / divideNum)
        : item.computedPrice,
      offersApplied: {
        ...(item.offersApplied || {}),
        "3/2": {
          saved: item.product.price * (qtyToApply / divideNum),
          name: "3 Al 2 Öde",
        },
      },
      qty: item.qty,
    };

    return updatedItem;
  });

  return updatedItems;
}

function resetOffers(items) {
  const updatedItems = items.map(item => ({
    ...item,
    computedPrice: item.defaultPrice,
    offersApplied: null,
  }));

  return updatedItems
}

const offers = {
  "3/2": {
    key:'3/2',
    name: "3 al 2 öde",
    displayNames:{
      'en':'Get 3 pay 2',
      'tr':'3 al 2 öde',
      'ru':'Купи 3, плати за 2'
    },
    offerFunc: get3Pay2,
  },
  'none': {
    key:'none',
    name: 'No Offer',
    displayNames:{
      'en':'No Offer',
      'tr':'Kampanya yok',
      'ru':'Нет предложения'
    },
    offerFunc: resetOffers,
  },
};

// CartItems are displayed and can be edited on deleted from card
// itemInRegistes can be set as a cartItem or can be canceled
// additionalItemEditClick To make cart sidebar visible in small screens
const Cart = ({ cartItems, setCartItems, itemInRegister, setItemInRegister, setNumpadFocus, additionalItemEditClick=null}) => {
  const [offerName, setOfferName] = useSessionStorage('offerName', 'none')
  const [discount, setDiscount] = useSessionStorage('discount', 0)
  const [marketStatus, statusError, statussLoading] = useFetchData('/marketStatus')
  const [showAlert, AlertComponent] = useAlert(); // Use the custom hook
  const [isChargeButtonLoading, setIsChargeButtonLoading] = useState(false)
  const [size, setSize] = useSize()
  const {shiftStatus, setShiftStatus} = useShiftStatus()
  const navigate = useNavigate();

  const subTotal = (cartItems || []).reduce((acc, curr) => {
    return acc + curr.defaultPrice
  },0)

  const savedByOffers = (cartItems || []).reduce((acc, curr) => {
    return acc + ((curr.offersApplied?.[offerName]?.saved) ? curr.offersApplied[offerName].saved : 0);
  },0)



  // Items in cart should be updated on every change related to item amount or offer 
  // We use useLayoutEffect to re-calculate values like savedByOffers before page painted
  useLayoutEffect(() => {
    if (offers[offerName].offerFunc) setCartItems(offers[offerName].offerFunc(cartItems));
  }, [offerName, cartItems.length, subTotal]);

  // Computes total price, if there is any payment made for this sale already decrements the payment amount and sets values related to sale into sessionStorage
  const onChargeClick = async () => {
    setIsChargeButtonLoading(true);
  
    await new Promise(resolve => setTimeout(resolve, 500));

    if (cartItems.length > 0) {
      
      let computedTotalPrice = (((subTotal||0)-(savedByOffers||0)) * ((100 - (discount||0))/100))
      const pastTransactions = JSON.parse(sessionStorage.getItem('pastTransactions')) || []

      const tempActiveCoupons = JSON.parse(sessionStorage.getItem('activeCoupons'))
      // Update total price if there are active coupons
      if (tempActiveCoupons) {
        for (const index in tempActiveCoupons) {
          // computedTotalPrice += tempActiveCoupons[index].saved 
          tempActiveCoupons[index].saved = 0
        }
      }
      sessionStorage.setItem('activeCoupons', JSON.stringify(tempActiveCoupons))

      console.log("Before set amountToPay",pastTransactions);
      // If there are already made transactions set calculated amount
      if (pastTransactions.length > 0) {
        const totalTransactionAmount = pastTransactions.reduce((acc, curr) => {
          return parseInt(acc) + parseInt(curr.amount)
        } ,0)
        sessionStorage.setItem("amountToPay", JSON.stringify(computedTotalPrice - totalTransactionAmount));
      }
      else{  
        sessionStorage.setItem("amountToPay", JSON.stringify(computedTotalPrice));
      }

      sessionStorage.setItem("total", JSON.stringify(computedTotalPrice));
      sessionStorage.setItem("subTotal", JSON.stringify(subTotal));
      sessionStorage.setItem("savedByOffers", JSON.stringify(savedByOffers));

      setIsChargeButtonLoading(false);
      navigate('/payment');

    }
    else {
      setIsChargeButtonLoading(false);
      showAlert('warning', t('sale.noItemsTitle'), t('sale.noItemsContent'));
    }
  };

  const onCartItemEdit = setItemInRegister !== null // If the setItemInRegister function is provided
    ? (item) => {
        setItemInRegister({
          ...item,
          qty: item.qty.toLocaleString("fullwide", {
            maximumFractionDigits: 0, // Format the quantity to have no decimal places
            useGrouping: true, // Enable grouping of digits
          }).replace(/,/g, "."),
        });
        // Delete the item with given code
        setCartItems((prev) => {
          const filteredCartItems = prev.filter(
            (cartItem) => cartItem.product.code !== item.product.code
          );
          return filteredCartItems;
        });
        if (additionalItemEditClick) additionalItemEditClick();
      }
    : null;

    const onCartItemDelete =  (item) => {
      setCartItems((prevCartItems) => {
        // Filter out the item with the given ID
        const updatedCartItems = prevCartItems.filter(
          (cartItem) => cartItem.product.code !== item.product.code
        );
        return updatedCartItems || [];
      });
    }

  return (
    <Box
      bgcolor={"background.paper"}
      // m={1}
      p={1}
      pb={0}
      height={"100%"}
      width={"100%"}
      minWidth={220}
      borderRadius={2}
      display={'flex'}
      flexDirection={'column'}
      sx={{ overflowY: "hidden", overflowX: "hidden" }}
    >
      {/* Offer and discount Select Component */}
      <CartActions offerName={offerName} setOfferName={setOfferName} discount= {discount} setDiscount= {setDiscount} />
      
      {/* If screen is small SmallScreenCurrentItemCard will be rendered instead */}
      {(window.innerWidth > 750) && 
        <CurrentItemCard
          item={itemInRegister}
          setItem={setItemInRegister}
          setNumpadFocus={setNumpadFocus}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      }

      <Stack
        direction={"column"}
        // height={"54%"}
        flex={1}
        justifyContent={"start"}
        alignItems={'center'}
        sx={{ overflowY: "scroll", my: 1 }}
      >
        {cartItems.map((cartItem) => (
          <CartItemCard
            item={cartItem}
            onDeleteClick={onCartItemDelete}
            key={cartItem.product.code}
            onEditClick={onCartItemEdit}
          />
        ))}
      </Stack>
      <CartTotal subTotal={subTotal} discount={discount} savedByOffers={savedByOffers} />
      <LoadingButton onClick={onChargeClick} isLoading={isChargeButtonLoading}  variant='contained' size={`${size.y < 600 ? 'medium' : 'large'}`} disabled={isChargeButtonLoading || !shiftStatus.isOpen || shiftStatus.clockedOut || cartItems.length <=0} fullWidth sx={{mt:1, mb:0.5, height: 50, display:'flex', flexDirection:'column', alignItems:'center'}} >  

          <Typography fontSize={{xs:10, md:15}} >{t('sale.charge')}</Typography>

            <Stack direction={'row'} alignItems={'center'} >
              <FiberManualRecord sx={{color: marketStatus ? 'green' : 'red', width:0.10, mr:1}}  />
              <Typography variant='subtitle2' fontSize={{xs:8, sm:11}} >
                  {t('menu.statusStr')}{marketStatus ? t('menu.online') : t('menu.offline')}
              </Typography>
            </Stack>

      </LoadingButton>
      <AlertComponent/>
    </Box>
  );
};


const CartActions = ({ offerName, setOfferName, discount, setDiscount }) => {
  const [size, setSize] = useSize()
  const {lang, setLang} = useLanguage();

  const numbers = Array.from({ length: 101 }, (_, i) => parseInt(i));
    
  const handleofferNameChange = (e) => {
    setOfferName(e.target.value);
  };
  
  const handleDiscountChange = (e) =>{
    setDiscount(e.target.value)
  }


  return (
    <Stack direction={'row'} mb={{xs:0.5, lg:1}} mt={{xs:0, md:1}} justifyContent={'space-around'} position={'relative'} >
      <FormControl color="primary" sx={{width:'45%'}} variant='filled'>
      <InputLabel htmlFor="selectComponent">{t('sale.chooseOffer')}</InputLabel>
        <Select
          value={offerName}
          onChange={handleofferNameChange}
          label='Choose Offer'
          style={{backgroundColor:'primary.main'}}
          size={size.y > 600 ? 'medium' : 'small'}
          sx={{
            width: { xs: '100%', sm: 'auto' }, // Adjust the width based on breakpoints
            fontSize: { xs: 12, md: '16' },
            mt:{xs:0.5}
          }}
        >
          <MenuItem value={"none"}>{offers['none'].displayNames[lang]}</MenuItem>
          <MenuItem value={"3/2"}>{offers['3/2'].displayNames[lang]}</MenuItem>
        </Select>
      </FormControl >

      <FormControl color="primary" sx={{width:'45%'}} variant='filled'>
      <InputLabel htmlFor="selectComponent">{t('sale.totalDiscount')}</InputLabel>
        <Select
          value={discount}
          onChange={handleDiscountChange}
          label='Total Discount'
          style={{ backgroundColor: 'primary.main' }}
          size={size.y > 600 ? 'medium' : 'small'}
          sx={{
            width: { xs: '100%', sm: 'auto' }, // Adjust the width based on breakpoints
            fontSize: { xs: 12, md: '16' },
            mt:{xs:0.5}
          }}
        >
          {numbers.map(number => (
            <MenuItem value={number} key={number}>{number}%</MenuItem>
          ))}
        </Select>
      </FormControl >
    </Stack>
  );
};
export default Cart;
