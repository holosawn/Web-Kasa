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

  
const CartItemCard = ({ Item, setCartItems, setItemInRegister }) => {
    const isPiece = Item.product.unit === "piece";
    const amount = isPiece ? Item.qty : Item.qty / 1000;
  


    const formattedQty =
      amount.toFixed(isPiece ? 0: 3).toLocaleString("fullwide", {
        maximumFractionDigits: 2,
        useGrouping: false,
      }).replace(".", ",") + (isPiece ? "" : "kg");
  
    const formattedPrice = Item.computedPrice
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
          (cartItem) => cartItem.product.code !== Item.product.code
        );
        return updatedCartItems;
      });
    }, [Item, setCartItems]);
  
    const onEditIconClick = () => {
      setItemInRegister(Item);
      setCartItems((prev) => {
        const filteredCartItems = prev.filter(
          (cartItem) => cartItem.product.code !== Item.product.code
        );
        return filteredCartItems;
      });
    };
  
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
          minHeight: 80, // Set the minimum height
          height: 80, // Set the height to the maximum content height
          maxHeight: 80, // Set the height to the maximum content height
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
            <HighlightOffSharpIcon sx={{ fontSize: 30 }} />
          </IconButton>
  
          <IconButton
            variant="contained"
            color="primary"
            onClick={onEditIconClick}
            sx={{ p: 0 }}
          >
            <EditIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
  
        <Box
          width={"calc(100% - 45px)"}
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
        >
          <Box
            width={"100%"}
            sx={{ height: "max-content" }}
            display={"flex"}
            alignItems={"center"}
            fontWeight={700}
          >
            <Typography variant="h7" fontSize={15} color={"primary"}>
              {Item.product.name}
              {"\u00A0"}
            </Typography>
            <Typography
              color={"gray"}
              sx={{ height: "max-content" }}
              flexWrap={"wrap"}
            >
              x {formattedQty}
              {formattedQty.length > 15 && "..."}
            </Typography>
            <Typography
              variant="h7"
              fontSize={12}
              color={"primary"}
              ml={"auto"}
            >
              {Item.defaultPrice?.toFixed(3).replace(".", ",")}
              {Item.defaultPrice?.length > 10 && "..."} TRY
            </Typography>
          </Box>
  
          <Box
            width={"100%"}
            sx={{ height: 18, minHeight: 18 }}
            display={"flex"}
            alignItems={"center"}
            flexWrap={"wrap"}
            fontWeight={700}
          >
            {Item.offersApplied &&
              Object.values(Item.offersApplied).map((offer) => (
                offer.saved > 0 && (
                <React.Fragment key={offer.name} >
                  <Typography
                    variant="h7"
                    fontSize={12}
                    color={"warning.main"}
                  >{offer.name}</Typography>
                  <Typography
                    variant="h7"
                    fontSize={12}
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
            <Typography variant="h7" fontSize={12} color={"secondary"}>
              Total
            </Typography>
            <Typography variant="h7" fontSize={12} color={"secondary"}>
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
            <Typography fontSize={11} variant="body2">
              {Item.product.barcode}
            </Typography>
            <Typography fontSize={11} variant="body2">
              {Item.product.price} TRY
            </Typography>
            <Typography fontSize={11} variant="body2">
              {Item.product.tax} TAX
            </Typography>
          </Box>
        </Box>
      </Box>
      </Grow>
    );
  };

export default CartItemCard
