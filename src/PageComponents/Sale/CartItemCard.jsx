import {
    Box,
    Grow,
    IconButton,
    Stack,
    Typography,
  } from "@mui/material";
  import React, { useCallback } from "react";
  import EditIcon from "@mui/icons-material/Edit";
  import HighlightOffSharpIcon from "@mui/icons-material/HighlightOffSharp";
import { t } from "i18next";

  
const CartItemCard = ({ item, setCartItems, setItemInRegister=null,
   onEditClick
   }) => {
    const isPiece = item.product.unit === "piece";
    const amount = isPiece ? item.qty : item.qty / 1000;

    const formattedQty =
      amount.toFixed(isPiece ? 0: 3).toLocaleString("fullwide", {
        maximumFractionDigits: 2,
        useGrouping: false,
      }).replace(".", ",") + (isPiece ? "" : "kg");
  
    const formattedPrice = item.computedPrice
      .toFixed(3)
      .toLocaleString("fullwide", {
        maximumFractionDigits: 3,
        useGrouping: false,
      })
      .replace(".", ",")
      .slice(0, 18);
  
    const onDeleteIconClick = useCallback(() => {
      setCartItems((prevCartItems) => {
        // Filter out the item with the given ID
        const updatedCartItems = prevCartItems.filter(
          (cartItem) => cartItem.product.code !== item.product.code
        );
        return updatedCartItems;
      });
    }, [item, setCartItems]);
  
    const onEditIconClick = setItemInRegister ?( () => {
      setItemInRegister({
        ...item,
        qty:item.qty.toLocaleString('fullwide', {
          maximumFractionDigits: 0,
          useGrouping: true
      }).replace(/,/g, '.')
      });
      setCartItems((prev) => {
        const filteredCartItems = prev.filter(
          (cartItem) => cartItem.product.code !== item.product.code
        );
        return filteredCartItems;
      });
      if(onEditClick) onEditClick();
    })
    : null
  
    return (
      <Grow in={true} translate="yes" appear={true} >
      <Box
        display={"flex"}
        alignItems={"center"}
        my={0.5}
        position={"relative"}
        sx={{
          border: "1px solid gray",
          borderRadius: 3,
          width: "97%",
          minHeight: {xs:65, md:85}, // Set the minimum height
          height: {xs:65, md:85}, // Set the height to the maximum content height
          maxHeight: 90, // Set the height to the maximum content height
          py: 0.5,
        }}
      >
        <Stack
          direction={"column"}
          justifyContent={"space-around"}
          height={"100%"}
          mx={0.5}
        >
          <IconButton
            variant="contained"
            color="error"
            onClick={onDeleteIconClick}
            sx={{ p: 0 }}
          >
            <HighlightOffSharpIcon sx={{ fontSize: {xs:20, md:30} }} />
          </IconButton>
  
          { 
            setItemInRegister && <IconButton
              variant="contained"
              color="primary"
              onClick={onEditIconClick}
              sx={{ p: 0 }}
            >
              <EditIcon sx={{ fontSize: {xs:20, md:30} }} />
            </IconButton>
          }
        </Stack>
  
        <Box
          width={"calc(100% - 45px)"}
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Box
            width={"100%"}
            sx={{ height: {xs:14, md:18} }}
            display={"flex"}
            alignItems={"center"}
            fontWeight={700}
          >
            <Typography variant="h7" textOverflow={'ellipsis'} noWrap fontSize={{xs:10,md:14}} width={'50%'} color={"primary"}>
              {item.product.name}
              {"\u00A0"}
            </Typography>
            <Typography
              color={"gray"}
              sx={{ height: "max-content" }}
              flexWrap={"wrap"}
              fontSize={{xs:10,md:14}}
            >
              x {formattedQty}
              {formattedQty.length > 15 && "..."}
            </Typography>
            <Typography
              variant="h7"
              fontSize={{xs:9, md:11}}
              color={"primary"}
              ml={"auto"}
            >
              {item.defaultPrice?.toFixed(3).replace(".", ",")}
              {item.defaultPrice?.length > 10 && "..."} TRY
            </Typography>
          </Box>
  
          <Box
            width={"100%"}
            sx={{ height: {xs:17, md:18}, minHeight: 10 }}
            display={"flex"}
            alignItems={"center"}
            flexWrap={"wrap"}
            fontWeight={700}
          >
            {item.offersApplied &&
              Object.values(item.offersApplied).map((offer) => (
                offer.saved > 0 && (
                <React.Fragment key={offer.name} >
                  <Typography
                    variant="h7"
                    // fontSize={12}
                    fontSize={{xs:9,md:12}}
                    color={"warning.main"}
                  >{offer.name}</Typography>
                  <Typography
                    variant="h7"
                    fontSize={{xs:9,md:12}}
                    color={"warning.main"}
                    ml={"auto"}
                  >
                    -{offer.saved.toFixed(3).replace(".", ",")} TRY
                  </Typography>
                </React.Fragment>
                )
              ))}
          </Box>
  
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            width={"100%"}
            flexWrap={"wrap"}
            fontWeight={700}
            mt={"auto"}
          >
            <Typography variant="h7" fontSize={{xs:9,md:12}} color={"secondary"}>
              {t('sale.total')}
            </Typography>
            <Typography variant="h7" fontSize={{xs:9,md:12}} color={"secondary"}>
              {formattedPrice}
              {formattedPrice.length > 10 && "..."} TRY
            </Typography>
          </Stack>
  
          <Box
            width={"100%"}
            height={18}
            color={"gray"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            m={0}
            mt={"auto"}
          >
            <Typography fontSize={{xs:8,md:12}} variant="body2">
              {item.product.barcode}
            </Typography>
            <Typography fontSize={{xs:8,md:12}} variant="body2">
              {item.product.price} TRY
            </Typography>
            <Typography fontSize={{xs:8,md:12}} variant="body2">
              {item.product.tax} TAX
            </Typography>
          </Box>
        </Box>
      </Box>
      </Grow>
    );
  };

export default CartItemCard
