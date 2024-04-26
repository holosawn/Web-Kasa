import { Badge, Box, Button, Container, Stack } from '@mui/material'
import React, { useCallback, useRef, useState } from 'react'
import Categories from '../../ReusableComponents/Categories'
import { useNavigate } from 'react-router-dom'
import Products from '../../ReusableComponents/Products.jsx'
import wallmartData from "../../Data/WallmartCompatibleData.json";
import {productArrHandler} from '../../utils/helpers.js'
import CustomTextField from '../../ReusableComponents/CustomTextField.jsx'
import Numpad from '../../ReusableComponents/Numpad.jsx'
import useSize from '../../CustomHooks/useSize.js'
import { onlyNumLayout } from '../../utils/Numpadlayouts.js'
import Actions from './Actions.jsx'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useAlert from '../../CustomHooks/useAlert.js'
import ActionButtons from '../../PageComponents/Sale/ActionButtons.jsx'
import SmallScreenCurrentItemCard from '../../PageComponents/Sale/SmallScreenCurrentItemCard.jsx'

const ProductsPage = () => {
  const [products, setProducts] = useState(wallmartData);
  const [itemInRegister, setItemInRegister] = useState({
    product: {},
    qty: 0,
  })
  const [cartItems, setCartItems] = useState(JSON.parse(sessionStorage.getItem('cartItems'))  || [])
  const [filterCategories, setFilterCategories] = useState([])
  const [filterValue, setFilterValue] = useState("");
  const navigate = useNavigate()
  const productsRef = useRef(null)
  const [size] = useSize();
  const [showAlert, AlertComponent] = useAlert();

  const sendToRegister=(item)=>{
    setItemInRegister(item)
    // sessionStorage.setItem('itemInRegister', JSON.stringify(item))
  }

  const filteredProducts = productArrHandler(products).filter((product) => {
    if (filterCategories.length < 0) return true;
    else {
      for (const category of filterCategories) {
        if (!product.categories.includes(category)){
          return false ;
        };
      }
      if (filterValue !== "") {
        if (
          !product.name
            .toLowerCase()
            .includes(filterValue.toLowerCase()) &&
          !product.barcode.toLowerCase().includes(filterValue)
        )
          return false;
      }
      return true;
    }
  });

  const onAddClick=()=>{
    const searchedProduct = filteredProducts.find(product => product.barcode === filterValue || product.name === filterValue )
    if (searchedProduct) {
      const item = {
        product:searchedProduct,
        qty: ""
      }
      sendToRegister(item)
    }
    else{
      showAlert('warning', 'No Item Found', 'There is no item with given value')
    }
  }

  const changeCartItems = useCallback((updateFunc)=>{
    setCartItems(prev => {
      const updatedCartItems = updateFunc(prev)
      // const storedCartItems = JSON.parse(sessionStorage.getItem('cartItems')) || []
      sessionStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
      return updatedCartItems
    })
  }, [setCartItems])


  return (
    <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}} >
      <Stack
        direction={"column"}
        bgcolor={"background.paper"}
        m={{xs:0,md:1}}
        my={2}
        py={{xs:0.5, md:0}}
        height={"96vh"}
        minHeight={'350px'}
        borderRadius={2}
        alignItems={"center"}
        width={"25%"}
        minWidth={'200px'}
      >
        <Actions/>
        <Categories filterCategories={filterCategories} setFilterCategories={setFilterCategories} />
      </Stack>

      <Box
        height={"100vh"}
        py={"2vh"}
        // width={'50%'}
        flex={1}
        minWidth={300}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        mx={1}
        mr={size.x < 750 ? 6 : 1}
      >
        <Stack direction={'row'} sx={{width:'100%'}}>
          <CustomTextField 
            value={filterValue}
            setValue={setFilterValue}
            setNumpadFocus={()=>{}}
          />
          <Button onClick={onAddClick} variant='contained' color='success' sx={{ml:2, minWidth:100, height:55}} >
            Add 
          </Button>

          <Button onClick={()=>navigate('/Sale')} variant='contained' color='warning' sx={{ml:2, minWidth:100, height:55}}  >
          <Badge badgeContent={cartItems.length} color="primary" anchorOrigin={{vertical: 'top', horizontal: 'left'}} 
            sx={{
              '.MuiBadge-standard':{
                padding:0,
                minWidth:10,
                width:15,
                minHeight:10,
                height:15
                
              }
            }}
            >
              <ShoppingCartIcon fontSize="medium" />
            </Badge>
          </Button>
        </Stack>
        <Products products={filteredProducts} sendToRegister={sendToRegister} setNumpadFocus={()=>{}} containerRef={productsRef} />
      </Box>
      <AlertComponent/>
      <SmallScreenCurrentItemCard open={Object.keys(itemInRegister.product).length > 0} currentItem={itemInRegister} setCurrentItem={setItemInRegister} cartItems={cartItems} setCartItems={changeCartItems} />
    </Box>
  )
}

export default ProductsPage