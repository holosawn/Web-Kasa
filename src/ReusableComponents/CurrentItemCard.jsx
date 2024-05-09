import { Alert, AlertTitle, Box, Button, Grow, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { useTheme } from "@emotion/react";
import { t } from "i18next";
import useAlert from "../CustomHooks/useAlert";
import useSize from "../CustomHooks/useSize";

const CurrentItemCard=({item, setItem, cartItems, setCartItems, setNumpadFocus, boxSx}) =>{
    const theme = useTheme();
    const textFieldRef = useRef(null);
    const [showAlert, AlertComponent] = useAlert(); // Use the custom hook
    const [size, setSize] = useSize()

    useEffect(() => {
      if (textFieldRef.current) {
        textFieldRef.current.focus();
      }
    }, [item]);


    const onTextfieldChange = (e) => {
      const inputValue = e.target.value;       
      // Regular expression to match only numeric characters and commas
      const regex = /^[\d.\s]*$/;

      if (regex.test(inputValue)) {
        // If the input value is valid, update the state
        setItem(prev => ({
          ...prev,
          qty: inputValue
        }));
      }
    };

    
    const onDeleteIconClick=()=>{
      setNumpadFocus('products')
      setItem({
        product:{},
        qty:0
      })
    }

    const onAddIconClick = () => {
      // Set the focus to the numpad for products
      if (item.qty <= 0 ) {
        showAlert('warning', 'Non-valid Amount', 'Product amount in invalid')
        return;
      }
      setNumpadFocus('products');
      const convertedQty = parseInt(item.qty.replace(/\s/g, '').replace(/[.\s]/g, ''));
      // Check if the item is a piece
      const isPiece = item.product.unit === 'piece';

      // Check if the item has any properties
      if (Object.keys(item.product).length === 0) return;

      // Find the index of the existing item in the cart
      const existingItemIndex = cartItems.findIndex(existingItem => existingItem.product.code === item.product.code);
      
      // Calculate the computed price
      let defaultPrice = (isPiece ? convertedQty : convertedQty / 1000) * item.product.price;

      let computedPrice = defaultPrice

      let updatedCartItems = []
      // Update the cart items
      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, update its quantity and computed price
        updatedCartItems = cartItems.map((cartItem, index) => {
          if (index === existingItemIndex) {
            return {
              ...cartItem,
              qty: parseInt(cartItem.qty) + convertedQty,
              defaultPrice: cartItem.defaultPrice + defaultPrice,
              computedPrice: cartItem.computedPrice + computedPrice
            };
          }
          return cartItem;
        });

        setCartItems(updatedCartItems);
        sessionStorage.setItem('cartItems' , JSON.stringify(updatedCartItems))
      } else {
        // If the item does not exist in the cart, add it to the cart
        updatedCartItems = [{
          ...item,
          qty: convertedQty,
          defaultPrice: defaultPrice,
          computedPrice: computedPrice
        }, ...cartItems]

        setCartItems(updatedCartItems);
        sessionStorage.setItem('cartItems' , JSON.stringify(updatedCartItems))
      }

      // Reset the item state
      setItem({
        product: {},
        qty: 0,
        computedPrice: 0,
        defaultPrice: 0
      });
    };
    // To display placeholders or data of itemInRegister
    const isThereItem = Object.keys(item.product).length !==0
    const inputLabel = !item.product?.unit ? 'Quantity' : item.product.unit === 'piece' ? 'Quantity' : 'Gram'
    return(
      <Box
      display={"flex"}
      flexDirection={'column'}
      sx={{
        border: "1px solid gray",
        borderRadius: 1,
        width: "100%",
        // height: size.y < 500 ? 120 : size.y < 800 ? 140 : 170 ,
        height:'fit-content',
        overflow:'visible',
        ...boxSx,
      }}
      >
        <Box display={'flex'} width={'100%'} flexDirection={'row'} px={2} mt={0.5} justifyContent={'space-between'} alignItems={'center'} >

          <Typography variant="h7" fontSize={{xs:10, md:14, xl:16}} mr={2} fontWeight={550} color={"primary"} width={'80%'} sx={{flexWrap:'nowrap', textWrap:'nowrap', textOverflow:'ellipsis', overflow:'hidden'}} >
            {isThereItem ? item.product.name : t('sale.noItemSelected')}
          </Typography>
          <Typography fontSize={{xs:10, md:14, xl:16}} color={'secondary'} variant="subtitle2" sx={{textWrap:'nowrap'}} >
            {isThereItem ? item.product.price.toLocaleString().replace(/\./, '.') : 0} TRY
          </Typography>
        </Box>
        <Box display={'flex'} width={'100%'} flexDirection={'row'} px={2} justifyContent={'space-between'} alignItems={'center'} >

          <Typography color={'gray'} variant="body2" fontSize={{xs:8, md:12, xl:14}} >{isThereItem ? item.product.code : t('sale.code')}</Typography>
          <Typography color={'gray'} variant="body2" fontSize={{xs:8, md:12, xl:14}} >{isThereItem ? item.product.tax : null} {t('sale.tax')}</Typography>

        </Box>

        <Box display={'flex'} width={'100%'} flexDirection={'row'} justifyContent={'center'} mb={0.5} mt={1} alignItems={'center'} textAlign={'center'} >
           {/* handleCHange will check if it's integer */}
          <TextField variant='outlined' size={size.y < 800 ? 'small' : 'medium'} label={inputLabel} focused value={item.qty} onChange={onTextfieldChange}
            onKeyUp={e =>{
              e.key === 'Enter' && onAddIconClick()
            }}
            autoComplete="off"
            disabled={Object.keys(item.product).length === 0}
            inputRef={textFieldRef}
            onFocus={()=> setNumpadFocus('cart')}
           sx={{
            width: '90%',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.secondary.light, // Set the outline color here
              },
              '&:hover fieldset': {
                borderColor: theme.palette.secondary.light, // Set the outline color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.secondary.light, // Set the outline color when focused
              },
            },
          }}
          />
        </Box>

        <Box display={'flex'} flexDirection={'row'} width={'92%'} mx={2} height={'auto'} pb={0.5} my={size.y > 800 ? 0.7 :0} justifyContent={'space-between'} alignItems={'center'} >
          <Button variant="contained"  disabled={!isThereItem} sx={{width:'50%', mr:1, height:size.y < 500 ? 35 : 45}} onClick={onAddIconClick} >
            <AddShoppingCartSharpIcon fontSize={size.y < 600 ? 'small' : size.y <1100 ? 'medium' : 'large'}/>
          </Button>
          <Button variant="contained" disabled={!isThereItem} color="error" sx={{width:'50%', mr:1, height:size.y < 500 ? 35 : 45}} onClick={onDeleteIconClick} >
            <DeleteForeverSharpIcon fontSize={size.y < 600 ? 'small' : size.y <1100 ? 'medium' : 'large'}/>
          </Button>
        </Box>

        <AlertComponent/>
      </Box>
    )
  }

export default CurrentItemCard
