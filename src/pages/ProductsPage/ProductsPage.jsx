import { Badge, Box, Button, Container, Stack, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Categories from '../../ReusableComponents/Categories'
import { useNavigate } from 'react-router-dom'
import Products from '../../ReusableComponents/Products.jsx'
import CustomTextField from '../../ReusableComponents/CustomTextField.jsx'
import Actions from './Actions.jsx'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useAlert from '../../CustomHooks/useAlert.js'
import SmallScreenCurrentItemCard from '../../ReusableComponents/SmallScreenCurrentItemCard.jsx'
import { t } from 'i18next'
import useFetchData from '../../CustomHooks/useFetchData.js'
import LoadingPage from '../ErrorAndLoadingPages/LoadingPage.jsx'
import ErrorPage from '../ErrorAndLoadingPages/ErrorPage.jsx'

const ProductsPage = () => {
  const [products, productsFetchError, productsFetchLoading] = useFetchData('/Products')
  const [categories, categoriesFetchError, categoriesFetchLoading] = useFetchData('/Categories')
  const [itemInRegister, setItemInRegister] = useState({
    product: {},
    qty: 0,
  });
  const [cartItems, setCartItems] = useState(JSON.parse(sessionStorage.getItem("cartItems")) || []);
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const navigate = useNavigate();
  const productsRef = useRef(null);
  const [showAlert, AlertComponent] = useAlert();

  // Callback function to send an item to the register
  const sendToRegister = useCallback((item) => {
    setItemInRegister(item);
    // sessionStorage.setItem('itemInRegister', JSON.stringify(item))
  }, []);

  // Memoized function to filter the products based on the filter categories and value
  const filteredProducts = useMemo(() => {
    // If there are no filter categories, return all products
    if (filterCategories.length < 0) return products;
    // Filter the products based on the filter categories and value
    else {
      return products.filter((product) => {
        if (filterCategories.includes("Favorites")) {

          // If the Favorites filter is selected, only include products that are marked as favorites
          if (product.isFavorite === false) return false;
        } else if (filterCategories.includes("Alphabetically")) {

          // If the Alphabetically filter is selected, only include products that start with the selected letter or 'a' as default
          const letterToLook =
            filterCategories.length > 1
              ? filterCategories[filterCategories.length - 1].toLowerCase()
              : "a";
          const isFirstLetterCompatible =
            product.name[0].toLowerCase() === letterToLook;
          if (isFirstLetterCompatible === false) return false;
        } else {
          // If a specific category is selected, only include products that belong to that category
          for (const category of filterCategories) {
            if (!product.categories.includes(category)) {
              return false;
            }
          }
        }
        if (filterValue !== "") {
          // If there is a filter value, only include products whose name, barcode, or code match that value
          if (
            !product.name
              .toLowerCase()
              .includes(filterValue.toLowerCase()) &&
            !product.barcode.toLowerCase().includes(filterValue.toLowerCase()) &&
            !product.code.toLowerCase().includes(filterValue.toLowerCase())
          )
            return false;
        }
        // If the product passes all the filters, include it
        return true;
      });
    }
  }, [products, filterValue, filterCategories]);

  // Sets product as itemInRegister 
  const onAddClick = () => {
    const searchedProduct = filteredProducts.find(
      (product) =>
        (product.barcode !== "" && product.barcode === filterValue) ||
        product.name === filterValue
    );
    if (searchedProduct) {
      const item = {
        product: searchedProduct,
        qty: "",
      };
      sendToRegister(item);
    } else {
      showAlert("warning", t("products.noItemFound"), t("products.noItemDesc"));
    }
  };

  // Callback function to change the cart items
  // in input is func sets the ouput value with prev cartItems as parameter if it isn't sets the input directly
  const updateCartItems = (input) => {
    if (typeof input === "function") {
      setCartItems((prev) => {
        sessionStorage.setItem('cartItems', JSON.stringify(input(prev)))
        return input(prev);
      });
    } else {
      setCartItems((prev) => {
        sessionStorage.setItem('cartItems', JSON.stringify(input))
        return input;
      });
    }
  }
  

  return productsFetchLoading || categoriesFetchLoading ? (
    <LoadingPage/>
  )
  : productsFetchError || categoriesFetchError ? (
    <ErrorPage/>
  )
  :
   (
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
        <Categories categoryData={categories} filterCategories={filterCategories} setFilterCategories={setFilterCategories} />
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
        // mr={size.x < 750 ? 6 : 1}
      >
        <Stack direction={'row'} sx={{width:'100%', alignItems:'center'}}>
          <CustomTextField 
            value={filterValue}
            setValue={setFilterValue}
          />
          <Button onClick={onAddClick} variant='contained'  color='success' sx={{ ml:{xs:0.5, md:2}, minWidth:{xs:70, md:100}, height:'90%' ,mb:{xs:0, md:1}}} >
            <Typography textTransform={'none'} fontSize={{xs:12, md:14, lg:16}}>{t('products.add')}</Typography> 
          </Button>

          <Button onClick={()=>navigate('/Sale')} variant='contained' color='warning' sx={{fontSize:{xs:15, md:22, lg:22},ml:{xs:0.5, md:2}, minWidth:{xs:70, md:100}, height:'90%' ,mb:{xs:0, md:1}}}  >
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
              <ShoppingCartIcon fontSize="medium" sx={{fontSize:{xs:'15px', md:'22px', lg:'22px'}}} />
            </Badge>
          </Button>
        </Stack>
        <Products products={filteredProducts} sendToRegister={sendToRegister} containerRef={productsRef} />
      </Box>
      <AlertComponent/>
      <SmallScreenCurrentItemCard open={Object.keys(itemInRegister.product).length > 0} currentItem={itemInRegister} setCurrentItem={setItemInRegister} cartItems={cartItems} setCartItems={updateCartItems} />
    </Box>
  )
}

export default ProductsPage
