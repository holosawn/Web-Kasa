import React, { useState } from 'react'
import Categories from '../../PageComponents/Sale/Categories'
import { Box } from '@mui/material'
import Products from '../../PageComponents/Sale/Products'
import Numpad from '../../PageComponents/Sale/Numpad'
import CustomTextField from '../../PageComponents/Sale/CustomTextField'

const exampleProducts = [
  {
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
    unit:"piece"
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
    unit:"piece"
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
    unit:"piece"
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
    cost: 1.8,
    barcode: "BAR10004",
    unit:"kg"
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
    unit:"kg"
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
    unit:"kg"
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
    unit:"kg"
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
    unit:"kg"
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
    unit:"piece"
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
    unit:"piece"
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
    unit:"piece"
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
    unit:'piece',
    discount:{
      amount:'%15',
      color:'red'
    }
  },
  qty: 5,
  discount:{
    amount:'%25',
    color:'yellow'
  }
};
const exampleCartItems = [
  exampleCartItem,
  exampleCartItem,
  // exampleCartItem,
];

const Sale = () => {
  const [filterCategories, setFilterCategories] = useState({
    main:'',
    sub:''
  });
  const [filterValue, setFilterValue] = useState('');
  const [products, setProducts] = useState(exampleProducts)




  return (
    <Box display={'flex'} flexDirection={'row'} height={'100vh'} width={'100vw'} alignItems={'center'} >
      <Categories currCategory={filterCategories}  setCurrCategories={setFilterCategories} />
      <Box
      height={"100vh"}
      py={"3vh"}
      width={650}
      minWidth={400}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <CustomTextField value={filterValue} setValue={setFilterValue} />
      <Products filterValue={filterValue} filterCategories={filterCategories} products={products} />
      <Box height={200} width={620}>
        <Numpad  setValue={setFilterValue} />
      </Box>
      </Box>
    </Box>
  )
}



export default Sale
