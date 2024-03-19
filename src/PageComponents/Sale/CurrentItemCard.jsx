import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { useTheme } from "@emotion/react";

const CurrentItemCard=({Item, setItem, cartItems, setCartItems, setNumpadFocus}) =>{
    const theme = useTheme();
    const textFieldRef = useRef(null);
  
    useEffect(() => { 
      if (textFieldRef.current) {
        textFieldRef.current.focus();
      }
    }, [Item]);
  
    const onTextfieldChange = (e) => {
      const inputValue = e.target.value;
      // Check if the input value consists of only numeric characters
      if (/^\d*$/.test(inputValue)) {
          setItem(prev => ({
            ...prev, 
            qty: inputValue
          }))
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
      setNumpadFocus('products');
    
      // Check if the item is a piece
      const isPiece = Item.product.unit === 'piece';
    
      // Check if the item has any properties
      if (Object.keys(Item.product).length === 0) return;
    
      // Find the index of the existing item in the cart
      const existingItemIndex = cartItems.findIndex(item => item.product.code === Item.product.code);
    
      // Calculate the discounts
      let discounts;
      if (Item.discount && Item.product.discount) {
        discounts = [Item.discount, Item.product.discount];
      } else if (Item.discount || Item.product.discount) {
        discounts = [Item.discount || Item.product.discount];
      } else {
        discounts = [];
      }
    
      // Calculate the computed price
      let defaultPrice = (isPiece ? Item.qty : Item.qty / 1000) * Item.product.price;
      let computedPrice = defaultPrice
    
      // Apply the discounts
      discounts.sort((a, b) => a.amount - b.amount).forEach((discount) => {
        computedPrice = Math.min(computedPrice, computedPrice * (1 - parseFloat(discount.amount.replace('%', '')) / 100));
      });
    
      // Update the cart items
      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, update its quantity and computed price
        const updatedCartItems = cartItems.map((cartItem, index) => {
          if (index === existingItemIndex) {
            return {
              ...cartItem,
              qty: parseInt(cartItem.qty) + parseInt(Item.qty),
              defaultPrice: cartItem.defaultPrice + defaultPrice,
              computedPrice: cartItem.computedPrice + computedPrice
            };
          }
          return cartItem;
        });
    
        setCartItems(updatedCartItems);
      } else {
        // If the item does not exist in the cart, add it to the cart
        setCartItems(prev => [{
          ...Item,
          qty: parseInt(Item.qty),
          defaultPrice: defaultPrice,
          computedPrice: computedPrice
        }, ...prev]);
      }
    
      // Reset the item state
      setItem({
        product: {},
        qty: 0,
        computedPrice: 0,
        defaultPrice: 0
      });
    };
    
    const isThereItem = Object.keys(Item.product).length !==0
    const inputLabel = Item.product.unit === 'piece' ? 'Quantity' : 'Gram'
    return(
      <Box
      display={"flex"}
      flexDirection={'column'}
      sx={{
        border: "1px solid gray",
        borderRadius: 1,
        width: "100%",
        height: 142,
        overflow:'visible',
        // backgroundColor:Item.product.color
      }}
      >
        <Box display={'flex'} flexDirection={'row'} mx={2} mt={0.5} justifyContent={'space-between'} alignItems={'center'} >
  
          <Typography variant="h7" mr={2} fontWeight={550} color={"primary"}>
            {isThereItem ? Item.product.name : 'No Item Selected'}
          </Typography>
          <Typography color={'secondary'} variant="subtitle2">{isThereItem ? Item.product.price : 0} TRY</Typography>
        </Box>
        <Box display={'flex'} flexDirection={'row'} mx={2} justifyContent={'space-between'} alignItems={'center'} >
          
          <Typography color={'gray'} variant="body2" fontSize={11} >{isThereItem ? Item.product.barcode : 'Barcode'}</Typography>
          <Typography color={'gray'} variant="body2" fontSize={11} >{isThereItem ? Item.product.tax : null} Tax</Typography>
          
        </Box>
  
        <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} mb={0.5} mt={1} alignItems={'center'} textAlign={'center'} >
           {/* handleCHange will check if it's integer */}
          <TextField variant='outlined' autoFocus size="small" label={inputLabel} focused value={Item.qty} onChange={onTextfieldChange}
            disabled={Object.keys(Item.product).length === 0}
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
        <Box display={'flex'} flexDirection={'row'} width={'92%'} mx={2} justifyContent={'space-between'} alignItems={'center'} >
          <Button variant="contained" size="large" disabled={!isThereItem} sx={{width:'50%', mr:1}} onClick={onAddIconClick} >
            <AddShoppingCartSharpIcon/>
          </Button>
          <Button variant="contained" size='large' disabled={!isThereItem} color="error" sx={{width:'50%', mr:1}} onClick={onDeleteIconClick} >
            <DeleteForeverSharpIcon/>
          </Button>
        </Box>
  
      </Box>
    )
  }

export default CurrentItemCard
