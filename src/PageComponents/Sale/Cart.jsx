import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, {useEffect, useState } from "react"
import CurrentItemCard from "./CurrentItemCard";
import CartItemCard from "../../ReusableComponents/CartItemCard";
import { t } from "i18next";
import { useLanguage } from "../../contexts/LangContext";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../ReusableComponents/LoadingButton";
import useAlert from "../../CustomHooks/useAlert";
import CardTotal from "../../ReusableComponents/CardTotal";
import useFetchData from "../../CustomHooks/useFetchData";
import { FiberManualRecord } from "@mui/icons-material";
import { useShiftStatus } from "../../contexts/ShiftContext";

const exampleCartItem = {
  product: {
    name: "Chocolate Bar",
    mainCategory: "Snack",
    subCategory: "Chocolate",
    code: "10001",
    price: 2.5,
    tax: "%18",
    stock: 100,
    color: "Brown",
    cost: 1.2,
    barcode: "BAR10001",
    unit: "piece",
    discount: {
      amount: "%15",
      color: "red",
    },
  },
  qty: 5,
  computedPrice: 12.5,
  discount: {
    amount: "%25",
    color: "yellow",
  },
};

function get3Pay2(Items) {
  const updatedItems = Items.map((item) => {
    const isPiece = item.product.unit === "piece";
    const divideNum = isPiece ? 3 : 3000;

    const qtyToApply = Math.floor(item.qty / divideNum) * divideNum;

    const isAppliable =
      (item.offersApplied === undefined ||
        item.defaultPrice !== item.computedPrice + item.saved) &&
      qtyToApply >= divideNum;

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

const Cart = ({ cartItems, setCartItems, itemInRegister, setItemInRegister, setNumpadFocus, onProductEditClick=null}) => {
  const [offerName, setofferName] = useState("none");
  const [discount, setDiscount] = useState(0);
  const [marketStatus, statusError, statussLoading] = useFetchData('/MarketStatus')
  const [showAlert, AlertComponent] = useAlert(); // Use the custom hook
  const [isChargeButtonLoading, setIsChargeButtonLoading] = useState(false)
  const [size, setSize] = useState({x:window.innerWidth, y:window.innerHeight})
  const {shiftStatus, setShiftStatus} = useShiftStatus()
  const navigate = useNavigate();

  const subTotal = cartItems.reduce((acc, curr) => {
    return acc + curr.defaultPrice
  },0)

  const savedByOffers = cartItems.reduce((acc, curr) => {
    return acc + ((curr.offersApplied?.[offerName]?.saved) ? curr.offersApplied[offerName].saved : 0);
  },0)

  useEffect(() => {
    if (offers[offerName].offerFunc) setCartItems(offers[offerName].offerFunc(cartItems));
  }, [offerName, cartItems.length, subTotal]);

  useEffect(()=>{
    const itemsStored = JSON.parse(sessionStorage.getItem('cartItems'))
    if(itemsStored) setCartItems(itemsStored)

    const discountStored = parseInt(sessionStorage.getItem('discount')) 
    if(discountStored) setDiscount(discountStored)

    const offerNameStored = JSON.parse(sessionStorage.getItem('offerName'))
    if (offerNameStored) setofferName(offerNameStored)
    },[])
  

  useEffect(() => {
    function handleResize() {
      setSize({x:window.innerWidth, y:window.innerHeight})
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const onChargeClick = async () => {
    setIsChargeButtonLoading(true);
  
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!marketStatus) {
      setIsChargeButtonLoading(false);
      showAlert('warning', t('sale.closedMarket'), t('sale.closedMarketDesc'));
    }
    else if (cartItems.length > 0) {
      
      const pastTransactions = JSON.parse(sessionStorage.getItem('pastTransactions')) || []
      const computedTotalPrice = (((subTotal||0)-(savedByOffers||0)) * ((100 - (discount||0))/100))

      if (pastTransactions.length > 0) {
        const totalTransactionAmount = pastTransactions.reduce((acc, curr) => {
          return acc + curr.amount
        } ,0)
        sessionStorage.setItem("amountToPay", JSON.stringify(computedTotalPrice - totalTransactionAmount));
      }
      else{  
        sessionStorage.setItem("amountToPay", JSON.stringify(computedTotalPrice));
        sessionStorage.setItem('activeCoupons', JSON.stringify([]))
      }


      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
      sessionStorage.setItem("subTotal", JSON.stringify(subTotal));
      sessionStorage.setItem("total", JSON.stringify(computedTotalPrice));
      sessionStorage.setItem("savedByOffers", JSON.stringify(savedByOffers));
      sessionStorage.setItem('offerName', JSON.stringify(offerName))
      sessionStorage.setItem("discount", JSON.stringify(discount));
      setIsChargeButtonLoading(false);
      navigate('/Payment');

    }
    else {
      setIsChargeButtonLoading(false);
      showAlert('warning', t('sale.noItemsTitle'), t('sale.noItemsContent'));
    }
  };

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
      <CartActions offerName={offerName} setofferName={setofferName} discount= {discount} setDiscount= {setDiscount} />
      
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
            setCartItems={setCartItems}
            setItemInRegister={setItemInRegister}
            key={cartItem.product.code}
            onEditClick={onProductEditClick}
          />
        ))}
      </Stack>
      <CardTotal subTotal={subTotal} discount={discount} savedByOffers={savedByOffers} />
      <LoadingButton onClick={onChargeClick} isLoading={isChargeButtonLoading} variant="contained" size={`${size.y < 600 ? 'medium':'large'}`} disabled={ isChargeButtonLoading ||  !shiftStatus.isOpen || shiftStatus.clockedOut || cartItems.length<=0} fullWidth  sx={{mt:1, mb:0.5, height: 50, display:'flex', flexDirection:'column', alignItems:'center'}} >
          <Typography fontSize={{xs:10, md:15}} >{t('sale.charge')} </Typography>

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


const CartActions = ({ offerName, setofferName, discount, setDiscount }) => {
  const [size, setSize] = useState({x:window.innerWidth, y: window.innerHeight})
  const {lang, setLang} = useLanguage();

  const numbers = Array.from({ length: 101 }, (_, i) => parseInt(i));
    
  const handleofferNameChange = (e) => {
    setofferName(e.target.value);
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
