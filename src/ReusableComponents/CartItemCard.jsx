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


  // A component renders data of items in cart. It can have delete and edit functionality if related functions passed
  // Cart item is not always needs to be editable so if onEditClick is null there won't be edit icon 
  const CartItemCard = ({item, onDeleteClick, onEditClick, boxSx, boxProps }) => {

    const isPiece = item.product.unit === "piece"; 
    const amount = isPiece ? item.qty : item.qty / 1000; // Calculate the amount based on the unit

    const isIconButtonsActive = onEditClick || onDeleteClick
  
    const formattedQtyString =
      amount
        .toFixed(isPiece ? 0 : 3) // Format the quantity to have 3 decimal places for non-piece items
        .toLocaleString("fullwide", {
          maximumFractionDigits: 2, // Set the maximum number of decimal places to 2
          useGrouping: false, // Disable grouping of digits
        })
        .replace(".", ",") + (isPiece ? "" : "kg"); // Add the unit to the formatted quantity
  
    const formattedPriceString = item.computedPrice
      .toFixed(3) // Format the price to have 3 decimal places
      .toLocaleString("fullwide", {
        maximumFractionDigits: 3, // Set the maximum number of decimal places to 3
        useGrouping: false, // Disable grouping of digits
      })
      .replace(".", ",")
      .slice(0, 18); // Limit the length of the formatted price
  
    return (
      <Grow in={true} translate="yes" appear={true} >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={ isIconButtonsActive ? 'start' : 'center'}
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
          ...boxSx,
        }}
        {...boxProps}
      >
        { isIconButtonsActive &&  <Stack
          direction={"column"}
          justifyContent={"space-around"}
          height={"100%"}
          mx={0.5}
        >
          { onDeleteClick && <IconButton
            variant="contained"
            color="error"
            onClick={()=>onDeleteClick(item)}
            sx={{ p: 0 }}
          >
            <HighlightOffSharpIcon sx={{ fontSize: {xs:20, md:30} }} />
          </IconButton>}
  
          { 
            onEditClick && <IconButton
              variant="contained"
              color="primary"
              onClick={() => onEditClick(item)}
              sx={{ p: 0 }}
            >
              <EditIcon sx={{ fontSize: {xs:20, md:30} }} />
            </IconButton>
          }
        </Stack>
        }
  
        <Box
          width={`calc(100% - ${isIconButtonsActive ? '4' : '2'}5px)`}
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
              x {formattedQtyString}
              {formattedQtyString.length > 15 && "..."}
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
              {formattedPriceString}
              {formattedPriceString.length > 10 && "..."} TRY
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
              {item.product.tax} {t('payment.tax')}
            </Typography>
          </Box>
        </Box>
      </Box>
      </Grow>
    );
  };

export default CartItemCard
