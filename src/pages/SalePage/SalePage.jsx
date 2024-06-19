import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Categories from "../../ReusableComponents/Categories.jsx";
import { Box, Stack, useMediaQuery, Button, Drawer, Container, Typography } from "@mui/material";
import Products from "../../ReusableComponents/Products.jsx";
import Numpad from "../../ReusableComponents/Numpad.jsx";
import CustomTextField from "../../ReusableComponents/CustomTextField.jsx";
import Cart from "./Cart.jsx";
import {
  ActionButtons,
  SysControlButtons,
} from "./ActionButtons.jsx";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SmallScreenCurrentItemCard from "../../ReusableComponents/SmallScreenCurrentItemCard.jsx";
import useSize from "../../CustomHooks/useSize.js";
import useFetchData from "../../CustomHooks/useFetchData.js";
import LoadingPage from '../ErrorAndLoadingPages/LoadingPage.jsx'
import ErrorPage from "../ErrorAndLoadingPages/ErrorPage.jsx";


const SalePage = () => {
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [products, productsFetchLoading, productsFetchError ] = useFetchData('/Products')
  const [categories, categoriesFetchLoading, categoriesFetchError ] = useFetchData('/Categories')
  // Ref of products container for scrolling via buttons
  const productsRef = useRef(null)
  const [cartItems, setCartItems] = useState( JSON.parse(sessionStorage.getItem("cartItems")) || []);
  // Current item to add cart after specify it's quantity
  const [itemInRegister, setItemInRegister] = useState(
     JSON.parse(sessionStorage.getItem('itemInRegister'))|| {
    product: {},
    qty: 0,
  });
  const [numpadFocus, setNumpadFocus] = useState("products");
  // Collabsible cart component visibility on small screens
  const [isCartVisible, setIsCartVisible] = useState(false)
  const [size] = useSize();

  const isWide = useMediaQuery('(min-width:1000px)')


  // function to update value in sessionStorage on every state change
  // It will be passed instead of setItemInRegister function
  const updateItemInRegister = (input) =>{
    setItemInRegister(prev => {
      if (typeof input === 'function') {
        sessionStorage.setItem('itemInRegister', JSON.stringify(input(prev)))
        return input(prev)
      }
      else{
        sessionStorage.setItem('itemInRegister', JSON.stringify(input))
        return input
      }
    })
  }

  const updateCartItems =(input)=>{
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


// Sets the output of given function with prev quantity value passed as new quantity of item in register
  function onQtyFocus(setVal) {
    updateItemInRegister((prev) => {
      const updatedItemInRegister = {
      ...prev,
      qty: setVal(itemInRegister.qty),
    }
    return updatedItemInRegister
    });
  }




  // Memoize filtered products while any of data, filterValue or filterCategories not changed
  const filteredProducts = useMemo(()=> {
    return products.filter((product) => {
      // If a search query is entered, only return products that match the query in their name, barcode, or code
      if (filterValue !== "") {
        if (
          !product.name
            .toLowerCase()
            .includes(filterValue.toLowerCase()) &&
          !product.barcode.toLowerCase().includes(filterValue.toLowerCase()) &&
          !product.code.toLowerCase().includes(filterValue.toLowerCase())
        )
          return false;
      }
      
      // If there are no filter categories, return true for all products
      if (filterCategories.length < 1) return true;
      else {
        // If "Favorites" is selected, only return products that are marked as favorites
        if (filterCategories.includes("Favorites")) {
          if (!product.isFavorite) {
            return false;
          }
        }
        // If "Alphabetically" is selected, only return products that start with the selected letter. If no letter selected return according to 'a'
        else if (filterCategories.includes("Alphabetically")){
          const letterToLook = filterCategories.length > 1 ? filterCategories[filterCategories.length-1].toLowerCase() : "a"
          const isFirstLetterCompatible = product.name[0].toLowerCase() === letterToLook;
          if (isFirstLetterCompatible === false) return false
        }
        // If specific categories are selected, only return products that belong to those categories
        else {
          for (const category of filterCategories) {
            if (!product.categories.includes(category)){
              return false ;
            };
          }
        }

        // If all conditions are met, can return true for the product
        return true;
      }
    })
  }, [products, filterValue, filterCategories]);

  return productsFetchLoading || categoriesFetchLoading ? (
    <LoadingPage/>
  )
  : productsFetchError || categoriesFetchError ? (
    <ErrorPage/>
  )
  : (
    <Box
      display={"flex"}
      flexDirection={"row"}
      height={"100%"}
      width={"100%"}
      minHeight={375}
      minWidth={600}
      position={'relative'}
    >
      <Stack
        direction={"column"}
        bgcolor={"background.paper"}
        mx={{xs:0,md:1}}
        mt={{xs:1}}
        py={{xs:0.5, md:0}}
        height={"98vh"}
        minHeight={'365px'}
        borderRadius={2}
        alignItems={"center"}
        width={"25%"}
        minWidth={'200px'}
      >
        {/* Buttons to navigate or some other actions */}
        <ActionButtons />
        <Categories
         categoryData={categories}
          filterCategories={filterCategories}
          setFilterCategories={setFilterCategories}
        />
        {/* Buttons to navigate or some other actions */}
        <SysControlButtons/>
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
        <CustomTextField
          value={filterValue}
          setValue={setFilterValue}
          setNumpadFocus={setNumpadFocus}
        />
        <Products
          products={filteredProducts}
          sendToRegister={updateItemInRegister}
          setNumpadFocus={setNumpadFocus}
          containerRef = {productsRef}
        />
        <Numpad
          setValue={numpadFocus === "products" ? setFilterValue : onQtyFocus}
          scrollRef={productsRef}
        />
      </Box>

       {/* Rendering Cart component as a collapsable sidebar or as normal according to screen size */}
      {size.x > 750 ? 
        <Box sx={{width:'28%', mt:1, ml:2,  height: '98vh', display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'flex-start' }}>
          <Cart cartItems={cartItems} setCartItems={updateCartItems} itemInRegister={itemInRegister} setItemInRegister={updateItemInRegister} setNumpadFocus={setNumpadFocus}/>
        </Box>
      :
        <Box sx={{ position: 'absolute', right:0, height: '100%', minHeight:365, display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'flex-start' }}>
          { !isWide &&  
          <Button
            onClick={() => setIsCartVisible(prev => !prev)}
            variant="contained"
            color="warning"
            sx={{
              height: '100%',
              minWidth: 40,
              width: '5%',
              borderRadius: 0,
              pr:1.5,
              zIndex: 2999,
              ml:'auto'
            }}
          >
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

          </Button>}
          <Drawer
            keepMounted
            anchor={'right'}
            open={isWide || isCartVisible}
            variant= {isWide ? 'persistent' : 'temporary' } 
          >
            <Box height={'100%'} width={400} pl={0.5} pr={5}  >
              <Cart cartItems={cartItems} setCartItems={updateCartItems} itemInRegister={itemInRegister} setItemInRegister={updateItemInRegister} setNumpadFocus={setNumpadFocus} additionalItemEditClick={()=>setIsCartVisible(false)} />
            </Box>
          </Drawer>
        </Box>
      }

      <SmallScreenCurrentItemCard open={size.x < 750  && Object.keys(itemInRegister.product).length > 1} currentItem={itemInRegister} setCurrentItem={updateItemInRegister} cartItems={cartItems} setCartItems={updateCartItems} />

    </Box>
  );
};


export default SalePage;
