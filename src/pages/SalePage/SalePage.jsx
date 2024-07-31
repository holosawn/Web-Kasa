import React, { useEffect, useRef, useState } from "react";
import Categories from "../../ReusableComponents/Categories.jsx";
import { Box, Stack} from "@mui/material";
import Products from "../../ReusableComponents/Products.jsx";
import Numpad from "../../ReusableComponents/Numpad.jsx";
import CustomTextField from "../../ReusableComponents/CustomTextField.jsx";
import Cart from "./Cart.jsx";
import {
  ActionButtons,
  SysControlButtons,
} from "./ActionButtons.jsx";
import CurrentItemCardModal from "../../ReusableComponents/CurrentItemCardModal.jsx";
import useSize from "../../CustomHooks/useSize.js";
import useFetchData from "../../CustomHooks/useFetchData.js";
import LoadingPage from '../ErrorAndLoadingPages/LoadingPage.jsx'
import ErrorPage from "../ErrorAndLoadingPages/ErrorPage.jsx";
import CartDrawer from "./CartDrawer.jsx";
import useSessionStorage from "../../CustomHooks/useSessionStorage.js";


const SalePage = () => {
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [products, productsFetchLoading, productsFetchError ] = useFetchData('/products')
  const [categories, categoriesFetchLoading, categoriesFetchError ] = useFetchData('/categories')
  const [marketStatus, marketStatusLoading, marketStatusError] = useFetchData('/marketStatus')
  // Ref of products container for scrolling via buttons
  const productsRef = useRef(null)
  const [cartItems, setCartItems] = useSessionStorage('cartItems', []);
  // Current item to add cart after specify it's quantity
  const [itemInRegister, setItemInRegister] = useSessionStorage('itemInRegister', {
    product: {},
    qty: 0,
  });
  const [numpadFocus, setNumpadFocus] = useState("products");
  // Collabsible cart component visibility on small screens
  const [isCartVisible, setIsCartVisible] = useState(false)
  const [size] = useSize();


// Sets the output of given function with prev quantity value passed as new quantity of item in register
  function onQtyFocus(setVal) {
    setItemInRegister((prev) => {
      const updatedItemInRegister = {
      ...prev,
      qty: setVal(itemInRegister.qty),
    }
    return updatedItemInRegister
    });
  }
  
  return productsFetchLoading || categoriesFetchLoading || marketStatusLoading ? (
    <LoadingPage/>
  )
  : productsFetchError || categoriesFetchError || marketStatusError? (
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
          filterValue={filterValue}
          filterCategories={filterCategories}
          products={products}
          sendToRegister={setItemInRegister}
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
          <Cart cartItems={cartItems} setCartItems={setCartItems} itemInRegister={itemInRegister} setItemInRegister={setItemInRegister} setNumpadFocus={setNumpadFocus} isMarketOpen={marketStatus.isOpen}/>
        </Box>
      :
        <CartDrawer open={isCartVisible} setOpen={setIsCartVisible} itemAmount={cartItems.length} >
          <Cart cartItems={cartItems} setCartItems={setCartItems} itemInRegister={itemInRegister} setItemInRegister={setItemInRegister} setNumpadFocus={setNumpadFocus} isMarketOpen={marketStatus.isOpen} additionalItemEditClick={()=>setIsCartVisible(false)} />
        </CartDrawer>
      }

      <CurrentItemCardModal open={size.x < 750  && Object.keys(itemInRegister.product).length > 1} currentItem={itemInRegister} setCurrentItem={setItemInRegister} cartItems={cartItems} setCartItems={setCartItems} />

    </Box>
  );
};


export default SalePage;
