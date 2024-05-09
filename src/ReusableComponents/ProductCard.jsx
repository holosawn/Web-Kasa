import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import NoImg from "../assets/NoImage.jpg";

// Renders image and data of product
// onBadgeClick will be called when badge-like button clicked
// sx: an object containing additional styles to be applied to the Paper component
// ...props: any additional props to be passed to the Paper component
const ProductCard = ({ product, onClick, onBadgeclick, sx, ...props }) => {
  
    const theme = useTheme();
    const discount = product.discount
      ? product.discount
      : false;
  
    const handleCardClick = () => {
      onClick(product);
    };

    const handleBadgeClick = (event,product)=>{
        event.stopPropagation()
        onBadgeclick(product)
    }
  
    return (
      <Paper
        onClick={() => handleCardClick(product)}
        elevation={0}
        sx={{
          ...sx,
          backgroundColor: "background.paper",
          width: "99%",
          maxWidth:{xs:140, md:200},
          maxHeight: 180,
          height:'25vh',
          minHeight:130,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          p: 0,
          position: "relative",
          transition:
            "transform 0.2s ease" /* Add a transition for smooth scaling */,
          "&:hover": {
            cursor: "pointer",
            transform: "scale(1.05)",
          },
          "&:active": {
            transform: "scale(0.95)" /* Reduce the scale slightly on click */,
          },
        }}
        {...props}
      >
        <Box
          width={"100%"}
          height={{xs:'45%', md:"55%"}}
          overflow={"visible"}
          position={"relative"}
        >
          <div>
            <img src={`https://picsum.photos/id/${parseInt(product.code)}/300/170.webp`} style={{  position:'absolute', width:'100%', height:'100%'}} 
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = NoImg ; // Replace with the path to your fixed image
              }} 
            />
          </div>
          <Button
            onClick={(event) =>handleBadgeClick(event, product)}
            sx={{
              boxSizing: "border-box",
              position: "absolute",
              top: {xs:-1,md:-3}, // Adjust top position to center the badge
              right: {xs:0,md:-2}, // Adjust right position to center the badge
              width: {xs:17, md:27},
              height: {xs:17, md:27},
              minWidth: 0,
              minHeight: 0,
              borderRadius: "100%", // Make the Button circular to resemble a badge
              fontSize: 15,
              fontWeight: 600,
              textTransform: "none",
              zIndex: 999,
              boxShadow: `0 0 0 1.5px ${theme.palette.primary.dark}`, // Adjust the alpha value (0.5) for transparency
              backgroundColor: "background.paper",
              transition:
                "transform 0.3s ease" /* Add a transition for smooth scaling */,
              "&:hover": {
                transform:
                  "scale(1.1)" /* Scale up the object by 10% when hovered */,
                backgroundColor: "background.paper", // Prevent button from becoming transparent on hover
              },
              "&:focus": {
                backgroundColor: "background.paper", // Prevent button from becoming transparent on focus
              },
              "&:active": {
                backgroundColor: "background.paper", // Prevent button from becoming transparent on click
                transform: "scale(1)" /* Reduce the scale slightly on click */,
              },
            }}
          >
            i
          </Button>
          <Box
            position={"absolute"}
            color={"white"}
            bottom={0}
            height={30}
            width={"100%"}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {discount && (
              <Typography
                mr={0.5}
                fontSize={{xs:11,md:15}}
                fontWeight={700}
                color={"#39c31d"}
              >
                {(
                  product.price *
                  ((100 - parseInt(discount.replace("%", ""))) / 100)
                )
                  .toFixed(2)
                  .toLocaleString()
                  .replace(/\./, ",")}{" "}
                TRY
              </Typography>
            )}
            <Typography
              sx={{
                textDecorationLine: discount ? "line-through" : "none",
                color: discount ? "#d6d6d6" : "inherit",
              }}
              fontSize={discount ? 12 : {xs:12,md:15}}
            >
              {product.price.replace(/\./, ",")} {!discount && "TRY"}
            </Typography>
          </Box>
        </Box>
  
        <Typography
          variant="subtitle2"
          mr={"auto"}
          ml={"auto"}
          mt={{xs:0.5,md:1}}
          fontWeight={700}
        >
          {product.code}
        </Typography>
        <Typography
          textTransform={"none"}
          mb={"auto"}
          mt={"auto"}
          mx={{xs:1,md:2}}
          variant="subtitle2"
          fontSize={{xs:9,md:12}}
          lineHeight={1.2}
          color={"gray"}
          sx={{
            wordWrap: "break-word",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.name.length > 65
            ? product.name.substring(
                0,
                product.name.lastIndexOf(" ", 65)
              ) + "..."
            : product.name}
        </Typography>
  
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black", // Semi-transparent gray overlay
            opacity: 0,
            ":hover": {
              opacity: 0.15,
            },
          }}
        ></Box>
      </Paper>
    );
  };
  

export default ProductCard
