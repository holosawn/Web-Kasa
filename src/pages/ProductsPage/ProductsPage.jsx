import { Badge, Box, Button, Stack, Typography } from '@mui/material'
import React, { useCallback, useRef, useState } from 'react'
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
import useSessionStorage from '../../CustomHooks/useSessionStorage.js'

const ProductsPage = () => {
  const [products, productsFetchLoading, productsFetchError] = useFetchData('/products')
  const [categories, categoriesFetchLoading, categoriesFetchError] = useFetchData('/categories')
  const [itemInRegister, setItemInRegister] = useState({
    product: {},
    qty: 0,
  });
  const [cartItems, setCartItems] = useSessionStorage('cartItems', []);
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const navigate = useNavigate();
  const productsRef = useRef(null);
  const [showAlert, AlertComponent] = useAlert();

  // Callback function to send an item to the register
  const sendToRegister = useCallback((item) => {
    setItemInRegister(item);
  }, []);


  // Sets product as itemInRegister 
  const onAddClick = () => {
    const searchedProduct = products.find(
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
        flex={1}
        minWidth={300}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        mx={1}
      >
        <Stack direction={'row'} sx={{width:'100%', alignItems:'center'}}>
          <CustomTextField 
            value={filterValue}
            setValue={setFilterValue}
          />
          <Button onClick={onAddClick} variant='contained'  color='success' sx={{ ml:{xs:0.5, md:2}, minWidth:{xs:70, md:100}, height:'90%' ,mb:{xs:0, md:1}}} >
            <Typography textTransform={'none'} fontSize={{xs:12, md:14, lg:16}}>{t('products.add')}</Typography> 
          </Button>

          <Button onClick={()=>navigate('/sale')} variant='contained' color='warning' sx={{fontSize:{xs:15, md:22, lg:22},ml:{xs:0.5, md:2}, minWidth:{xs:70, md:100}, height:'90%' ,mb:{xs:0, md:1}}}  >
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
        <Products filterValue={filterValue} filterCategories={filterCategories} products={products} sendToRegister={sendToRegister} containerRef={productsRef} />
      </Box>
      <AlertComponent/>
      <SmallScreenCurrentItemCard open={Object.keys(itemInRegister.product).length > 0} currentItem={itemInRegister} setCurrentItem={setItemInRegister} cartItems={cartItems} setCartItems={setCartItems} />
    </Box>
  )
}

export default ProductsPage
