import React, { useEffect, useRef, useState } from "react";
import Categories from "../../PageComponents/Sale/Categories";
import { Box, Stack, useMediaQuery, Button, Drawer } from "@mui/material";
import Products from "../../PageComponents/Sale/Products";
import Numpad from "../../ReusableComponents/Numpad.jsx";
import CustomTextField from "../../PageComponents/Sale/CustomTextField";
import Cart from "../../PageComponents/Sale/Cart";
import tomatoImg from "../../assets/tomatoes.webp";
import {
  ActionButtons,
  SysControlButtons,
} from "../../PageComponents/Sale/ActionButtons";
import wallmartData from "../../Data/WallmartCompatibleData.json";
import {productArrHandler} from '../../utils/helpers.js'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SmallScreenCurrentItemCard from "../../PageComponents/Sale/SmallScreenCurrentItemCard.jsx";

const exampleProducts = [
  {
    name: "Freshness Guaranteed Chocolate Cake Square with Chocolate Icing, 6 oz (Mini/Refrigerated)  ",
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
    discount: "10%",
  },
  {
    name: "Cake",
    mainCategory: "Snack",
    subCategory: "Cakes",
    code: "10002",
    price: 10,
    tax: "%18",
    stock: 100,
    color: "Yellow",
    cost: 5,
    barcode: "BAR10002",
    unit: "piece",
  },
  {
    name: "Kek",
    mainCategory: "Snack",
    subCategory: "Cakes",
    code: "10003",
    price: 5,
    tax: "%18",
    stock: 100,
    color: "Brown",
    cost: 2.5,
    barcode: "BAR10003",
    unit: "piece",
    discount: "10%",
  },
  {
    name: "Tomato",
    mainCategory: "Vegetables",
    subCategory: "Red",
    code: "10004",
    price: 3,
    tax: "%18",
    stock: 100,
    color: "Red",
    bgImg: `url(${tomatoImg})`,
    cost: 1.8,
    barcode: "BAR10004",
    unit: "kg",
  },
  {
    name: "Garlic",
    mainCategory: "Vegetables",
    subCategory: "White",
    code: "10005",
    price: 1.5,
    tax: "%18",
    stock: 100,
    color: "Gray",
    cost: 0.8,
    barcode: "BAR10005",
    unit: "kg",
  },
  {
    name: "Red Pepper",
    mainCategory: "Vegetables",
    subCategory: "Red",
    code: "10006",
    price: 2,
    tax: "%18",
    stock: 100,
    color: "Red",
    cost: 1.1,
    barcode: "BAR10006",
    unit: "kg",
    discount: "10%",
  },
  {
    name: "Spinach",
    mainCategory: "Vegetables",
    subCategory: "Green",
    code: "10007",
    price: 2.2,
    tax: "%18",
    stock: 100,
    color: "DarkGreen",
    cost: 1.3,
    barcode: "BAR10007",
    unit: "kg",
  },
  {
    name: "Green Pepper",
    mainCategory: "Vegetables",
    subCategory: "Green",
    code: "10008",
    price: 2.2,
    tax: "%18",
    stock: 100,
    color: "Green",
    cost: 1.3,
    barcode: "BAR10008",
    unit: "kg",
  },
  {
    name: "Milka",
    mainCategory: "Snack",
    subCategory: "Chocolate",
    code: "10009",
    price: 2.2,
    tax: "%18",
    stock: 100,
    color: "Green",
    cost: 1.3,
    barcode: "BAR10009",
    unit: "piece",
  },
  {
    name: "Çokonat",
    mainCategory: "Snack",
    subCategory: "Chocolate",
    code: "10010",
    price: 2.2,
    tax: "%18",
    stock: 100,
    color: "Green",
    cost: 1.3,
    barcode: "BAR10010",
    unit: "piece",
  },
  {
    name: "Dido",
    mainCategory: "Snack",
    subCategory: "Chocolate",
    code: "10011",
    price: 2.2,
    tax: "%18",
    stock: 100,
    color: "Green",
    cost: 1.3,
    barcode: "BAR10011",
    unit: "piece",
  },
];
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
  defaultPrice: 12.5,
  computedPrice: 10,
  discount: {
    amount: "%25",
    color: "yellow",
  },
};
const exampleCartItems = [
  exampleCartItem,
  // exampleCartItem,
  // exampleCartItem,
];

const storedCartItems = JSON.parse(sessionStorage.getItem("cart"))?.cartItems;

const Sale = () => {
  //todo first key is total price
  //todo categories section xs my
  //Charhe on collapsable screen needs mb
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [products, setProducts] = useState(wallmartData);
  const productsRef = useRef(null)
  const [cartItems, setCartItems] = useState( storedCartItems || []); //empty or not array should be passed
  const [itemInRegister, setItemInRegister] = useState({
    product: {},
    qty: 0,
  });
  const [numpadFocus, setNumpadFocus] = useState("products");
  const [isCartVisible, setIsCartVisible] = useState(false)
  const [size, setSize] = useState({x:window.innerWidth, y: window.innerHeight})

  const isWide = useMediaQuery('(min-width:1000px)')

  useEffect(() => {
    function handleResize() {
      setSize({x:window.innerWidth, y:window.innerHeight})
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function onQtyFocus(setVal) {
    setItemInRegister((prev) => ({
      ...prev,
      qty: setVal(itemInRegister.qty),
    }));
  }

  const filteredProducts = productArrHandler(wallmartData).filter((product) => {
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

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      height={"100%"}
      width={"100%"}
      minHeight={375}
      minWidth={600}
      alignItems={"start"}
      position={'relative'}
    >
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
        <ActionButtons />
        <Categories
          filterCategories={filterCategories}
          setFilterCategories={setFilterCategories}
        />
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
          sendToRegister={setItemInRegister}
          setNumpadFocus={setNumpadFocus}
          containerRef = {productsRef}
        />
        <Numpad
          setValue={numpadFocus === "products" ? setFilterValue : onQtyFocus}
          scrollRef={productsRef}
        />
      </Box>
      
      {size.x > 750 ? 
        <Box sx={{width:'28%', m:1, ml:2,  height: '98vh', display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'flex-start' }}>
          <Cart cartItems={cartItems} setCartItems={setCartItems} itemInRegister={itemInRegister} setItemInRegister={setItemInRegister} setNumpadFocus={setNumpadFocus}/>
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
            {/* <KeyboardArrowDown sx={{ transform: `rotate(${isCartVisible ? 270 : 90}deg)` }} /> */}
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

            {/* <Box position={'relative'} width={30} height={30}>
              <ShoppingCartIcon fontSize="small" />
              <Box bgcolor={'primary'} position={'absolute'} top={0} right={0} width={15} height={15} fontSize={10} >
                5
              </Box>
            </Box> */}
          </Button>}
          <Drawer
            keepMounted
            anchor={'right'}
            open={isWide || isCartVisible}
            variant= {isWide ? 'persistent' : 'temporary' } 
          >
            <Box height={'100%'} width={400} pl={0.5} pr={5}  >
              <Cart cartItems={cartItems} setCartItems={setCartItems} itemInRegister={itemInRegister} setItemInRegister={setItemInRegister} setNumpadFocus={setNumpadFocus} onProductEditClick={()=>setIsCartVisible(false)} />
            </Box>
          </Drawer>
        </Box>
      }

      <SmallScreenCurrentItemCard open={size.x < 750  && Object.keys(itemInRegister.product).length > 1} currentItem={itemInRegister} setCurrentItem={setItemInRegister} cartItems={cartItems} setCartItems={setCartItems} />

    </Box>
  );
};


export default Sale;
