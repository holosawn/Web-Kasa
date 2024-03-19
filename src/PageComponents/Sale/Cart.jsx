import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import EditIcon from "@mui/icons-material/Edit";
import CurrentItemCard from "./CurrentItemCard";
import CartItemCard from "./CartItemCard";
import { useCustomTheme } from "../../contexts/CutomThemeContext";

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

function get3Pay2(Items, setItems) {
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

  setItems(updatedItems);

  return updatedItems;
}

function resetOffers(items, setItems) {
  const updatedItems = items.map(item => ({
    ...item,
    computedPrice: item.defaultPrice,
    offersApplied: null,
  }));

  setItems(updatedItems);
}

const offers = {
  "3/2": {
    name: "3 al 2 öde",
    func: get3Pay2,
  },
  'none': {
    name: "No Offer",
    func: resetOffers,
  },
};

const Cart = ({ cartItems, setCartItems, itemInRegister, setItemInRegister, setNumpadFocus}) => {
  const [offerName, setofferName] = useState("none");
  const [discount, setDiscount] = useState(0);

  const subTotal = cartItems.reduce((acc, curr) => {
    return acc + curr.qty
  },0)

  useEffect(() => {
    if (offers[offerName].func) offers[offerName].func(cartItems, setCartItems);
  }, [offerName, cartItems.length, subTotal]);


  return (
    <Box
      bgcolor={"background.paper"}
      m={1}
      p={1}
      pb={0}
      height={"95vh"}
      width={350}
      borderRadius={2}
      sx={{ overflowY: "hidden", overflowX: "hidden" }}
    >
      <Actions offerName={offerName} setofferName={setofferName} discount= {discount} setDiscount= {setDiscount} />
      <Divider variant="center" key={1} />
      <CurrentItemCard
        Item={itemInRegister}
        setItem={setItemInRegister}
        setNumpadFocus={setNumpadFocus}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
      <Stack
        direction={"column"}
        height={"55%"}
        justifyContent={"start"}
        alignItems={'center'}
        sx={{ overflowY: "scroll", my: 1 }}
      >
        {cartItems.map((cartItem) => (
          <CartItemCard
            Item={cartItem}
            setCartItems={setCartItems}
            setItemInRegister={setItemInRegister}
            key={cartItem.product.code}
          />
        ))}
      </Stack>
      <CardTotal subTotal={subTotal} discount={discount} />
      <Button variant="contained" size="large" disabled={subTotal<=0} fullWidth sx={{mt:1}} >
          Charge
      </Button>
    </Box>
  );
};

const CardTotal=({subTotal, discount})=>{

  return (
  <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} border={'1px solid gray'} borderRadius={3} p={1} height={80} width={'100%'} >
    <Stack direction={'row'} width={'100%'} >
      <Typography variant="h7" fontWeight={700} color={'primary'} >Subtotal:</Typography>
      <Typography variant="h7" fontWeight={700} color={'primary'}  ml={'auto'} >{subTotal}</Typography>
      <Typography variant="h7" fontWeight={700} color={'primary'}>&nbsp;TRY</Typography>
    </Stack>
    <Stack direction={'row'} width={'100%'} >
      <Typography variant="h7" fontWeight={700} color={'success.main'} >Discount:</Typography>
      <Typography variant="h7" fontWeight={700} color={'success.main'}  ml={'auto'} >{discount}%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
    </Stack>
    <Stack direction={'row'} width={'100%'} >
      <Typography variant="h7" fontWeight={700} color={'secondary'} >Total:</Typography>
      <Typography variant="h7" fontWeight={700} color={'secondary'}  ml={'auto'} >{subTotal * (100 - discount)/100}</Typography>
      <Typography variant="h7" fontWeight={700} color={'primary'}>&nbsp;TRY</Typography>
    </Stack>
  </Box>
)}

const Actions = ({ offerName, setofferName, discount, setDiscount }) => {
  const numbers = Array.from({ length: 101 }, (_, i) => parseInt(i));
    
  const handleofferNameChange = (e) => {
    setofferName(e.target.value);
  };
  
  const handleDiscountChange = (e) =>{
    setDiscount(e.target.value)
  }


  return (
    <Stack direction={'row'} mb={0.5} mt={1} justifyContent={'space-around'} position={'relative'} >
      {/* {[
        // <EditIcon />,
        // <FeedOutlinedIcon />,
        <PriceChangeOutlinedIcon />,
        // <LocalOfferOutlinedIcon />,
        // <PersonAddAltOutlinedIcon />,
      ].map((obj) => (
        <ActionButton>{obj}</ActionButton>
      ))} */}
      <FormControl color="primary" sx={{width:'45%'}} variant='filled'>
      <InputLabel htmlFor="selectComponent">Choose Offer</InputLabel>
        <Select
          value={offerName}
          onChange={handleofferNameChange}
          label='Choose Offer'
          style={{backgroundColor:'primary.main'}}
        >
          <MenuItem value={"none"}>{offers['none'].name}</MenuItem>
          <MenuItem value={"3/2"}>{offers['3/2'].name}</MenuItem>
        </Select>
      </FormControl >

      <FormControl color="primary" sx={{width:'45%'}} variant='filled'>
      <InputLabel htmlFor="selectComponent">Total Discount</InputLabel>
        <Select
          value={discount}
          onChange={handleDiscountChange}
          label='Total Discount'
          style={{ backgroundColor: 'primary.main' }}
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
