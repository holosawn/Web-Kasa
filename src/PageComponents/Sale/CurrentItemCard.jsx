import { Alert, AlertTitle, Box, Button, Grow, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { useTheme } from "@emotion/react";

const CurrentItemCard=({item, setItem, cartItems, setCartItems, setNumpadFocus, boxSx}) =>{
    const theme = useTheme();
    const textFieldRef = useRef(null);
    const [alert, setAlert] = useState({
      open: false,
      severity: 'info',
      title: '',
      content: ''
    });
    const [size, setSize] = useState({x:window.innerWidth, y: window.innerHeight})

    const showAlert = (severity, title, content) => {
      setAlert({
        open: true,
        severity: severity,
        title: title,
        content: content
      });

      setTimeout(() => {
        setAlert({
          open: false,
          severity: 'info',
          title: '',
          content: ''
        });
      }, 3000);
    };

    useEffect(() => {
      if (textFieldRef.current) {
        textFieldRef.current.focus();
      }
    }, [item]);

    useEffect(() => {
      function handleResize() {
        setSize({x:window.innerWidth, y:window.innerHeight})
      }
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

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

      console.log(parseInt('1000.2'.replace(/\s/g, '').replace(/[.\s]/g, '')));
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
        showAlert('warning', 'Non-valid Amount', 'Drawer amount cannot be empty')
        return;
      }
      setNumpadFocus('products');
      const convertedQty = parseInt(item.qty.replace(/\s/g, '').replace(/[.\s]/g, ''));
      console.log(convertedQty);

      // Check if the item is a piece
      const isPiece = item.product.unit === 'piece';

      // Check if the item has any properties
      if (Object.keys(item.product).length === 0) return;

      // Find the index of the existing item in the cart
      const existingItemIndex = cartItems.findIndex(existingItem => existingItem.product.code === item.product.code);

      // Calculate the discounts
      let discounts;
      if (item.discount && item.product.discount) {
        discounts = [item.discount, item.product.discount];
      } else if (item.discount || item.product.discount) {
        discounts = [item.discount || item.product.discount];
      } else {
        discounts = [];
      }

      // Calculate the computed price
      let defaultPrice = (isPiece ? convertedQty : convertedQty / 1000) * item.product.price;
      let computedPrice = defaultPrice

      // Update the cart items
      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, update its quantity and computed price
        const updatedCartItems = cartItems.map((cartItem, index) => {
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
      } else {
        // If the item does not exist in the cart, add it to the cart
        setCartItems(prev => [{
          ...item,
          qty: convertedQty,
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

    const isThereItem = Object.keys(item.product).length !==0
    const inputLabel = item.product.unit === 'piece' ? 'Quantity' : 'Gram'
    return(
      <Box
      display={"flex"}
      flexDirection={'column'}
      sx={{
        border: "1px solid gray",
        borderRadius: 1,
        width: "100%",
        height: size.y < 500 ? 120 : size.y < 800 ? 135 : 170 ,
        overflow:'visible',
        // backgroundColor:item.product.color
        ...boxSx,
      }}
      >
        <Box display={'flex'} width={'100%'} flexDirection={'row'} px={2} mt={0.5} justifyContent={'space-between'} alignItems={'center'} >

          <Typography variant="h7" fontSize={{xs:10, md:14, xl:16}} mr={2} fontWeight={550} color={"primary"} width={'80%'} sx={{flexWrap:'nowrap', textWrap:'nowrap', textOverflow:'ellipsis', overflow:'hidden'}} >
            {isThereItem ? item.product.name : 'No Item Selected'}
          </Typography>
          <Typography fontSize={{xs:10, md:14, xl:16}} color={'secondary'} variant="subtitle2" sx={{textWrap:'nowrap'}} >
            {isThereItem ? item.product.price.toLocaleString().replace(/\./, '.') : 0} TRY
          </Typography>
        </Box>
        <Box display={'flex'} width={'100%'} flexDirection={'row'} px={2} justifyContent={'space-between'} alignItems={'center'} >

          <Typography color={'gray'} variant="body2" fontSize={{xs:8, md:12, xl:14}} >{isThereItem ? item.product.barcode : 'Barcode'}</Typography>
          <Typography color={'gray'} variant="body2" fontSize={{xs:8, md:12, xl:14}} >{isThereItem ? item.product.tax : null} Tax</Typography>

        </Box>

        <Box display={'flex'} width={'100%'} flexDirection={'row'} justifyContent={'center'} mb={0.5} mt={1} alignItems={'center'} textAlign={'center'} >
           {/* handleCHange will check if it's integer */}
          <TextField variant='outlined' size={size.y < 800 ? 'small' : 'medium'} label={inputLabel} focused value={item.qty} onChange={onTextfieldChange}
            onKeyUp={e =>{
              e.key === 'Enter' && onAddIconClick()
            }}
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

        <Box display={'flex'} flexDirection={'row'} width={'92%'} mx={2} my={size.y > 800 ? 0.7 :0} justifyContent={'space-between'} alignItems={'center'} >
          <Button variant="contained" size={size.y < 900 ? 'medium' : 'large'}  disabled={!isThereItem} sx={{width:'50%', mr:1}} onClick={onAddIconClick} >
            <AddShoppingCartSharpIcon fontSize={size.y < 600 ? 'small' : size.y < 900 ? 'medium' : 'large'}/>
          </Button>
          <Button variant="contained" size={size.y < 900 ? 'medium' : 'large'} disabled={!isThereItem} color="error" sx={{width:'50%', mr:1}} onClick={onDeleteIconClick} >
            <DeleteForeverSharpIcon fontSize={size.y < 600 ? 'small' : size.y < 900 ? 'medium' : 'large'}/>
          </Button>
        </Box>

       { alert.open &&  (
        <Grow in={alert.open} >
          <Alert sx={{position:'absolute', top:'3%', right:0, translate:'(-50%, -50%)', width:'400px', height:'100px', zIndex:999 }}
              severity={alert.severity}
            >
              {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
              {alert.content}
          </Alert>
        </Grow>
        )}
      </Box>
    )
  }

export default CurrentItemCard
