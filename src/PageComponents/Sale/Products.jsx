import { useTheme } from "@emotion/react";
import {
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  Grow,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Fade from '@mui/material/Fade';


const Products = ({ filterValue, filterCategories, products, sendToRegister, setNumpadFocus }) => {
  //todo productCard color will be bigger *, paper effects will be fixed* , modal will appear with animation* , filter functionality will be fixed*, 
  //todo +5 +10 +50 +100 buttons will be added into buy modal , These button can add as kg

  const filteredProducts = products.filter(
    (product) =>
    (filterCategories.main.toLowerCase() === '' || filterCategories.main.toLowerCase() === 'all' ||
    filterCategories.main.toLowerCase() === product.mainCategory.toLowerCase()) &&
    ( filterCategories.sub === '' ||
    filterCategories.sub.toLowerCase() === product.subCategory.toLowerCase())
    &&
    (product.code.toLowerCase().includes(filterValue.toLowerCase()) ||
      product.name.toLowerCase().includes(filterValue.toLowerCase()) 
    )
  ); 
  
  function setCurrentItem(product) {
    sendToRegister({product:product , qty:1})
    setNumpadFocus('cart')
  }

  return (
    <Box mt={1} height={450} width={630} minHeight={440} mb={3} p={1} mr={2} sx={{overflowY:'auto', overflowX:'hidden'}} >
      <Grid container rowSpacing={2} sx={{ gridRow: { minWidth: 620 } }}>
        {filteredProducts.map((product) => (
          <Grid
            item
            xs={3}
            key={product.code}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <ProductCard product={product} onCardClick={setCurrentItem} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const ProductCard = ({ product, onCardClick }) => {
  const theme = useTheme();
  const [isNonCardClick, setisNonCardClick] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(false);
    setisNonCardClick(false);
  };

  const openModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(true);
    setisNonCardClick(true);
  };

  const onMouseDownBadge = () => {
    setisNonCardClick(true);
  };

  const onMouseUpBadge = () => {
    setisNonCardClick(false);
  };

  const handleCardClick = (product) => {
    onCardClick(product)
  };

  return (
    <Grow in={true} translate="yes" appear={true} >
      <div>
        <Paper
          onClick={() => handleCardClick(product)}
          elevation={0}
          sx={{
            backgroundColor: "background.paper",
            width: 135,
            height: 200,
            display: "flex",
            flexDirection: "column",
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
              transform: isNonCardClick
                ? "none"
                : "scale(0.95)" /* Reduce the scale slightly on click */,
            },
          }}
        >
          <Box
            borderRadius={1}
            width={"85%"}
            minWidth={100}
            height={"55%"}
            bgcolor={product.color}
            overflow={"visible"}
            position={"relative"}
            mt={2}
          >
            <Button
              onMouseDown={onMouseDownBadge}
              onMouseUp={onMouseUpBadge}
              onClick={openModal}
              sx={{
                boxSizing: "border-box",
                position: "absolute",
                top: -13, // Adjust top position to center the badge
                right: -13, // Adjust right position to center the badge
                width: 27,
                height: 27,
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
              <Typography>{product.price} TRY</Typography>
            </Box>
          </Box>
          <Typography textTransform={"none"} mt={3}>
            {product.name}
          </Typography>
          <ProductModal
            isOpen={isModalOpen}
            product={product}
            onClose={closeModal}
          />

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
      </div>
    </Grow>
  );
};

const ProductModal = ({ isOpen, onClose, product }) => (
  <Modal
    open={isOpen}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"

  >
    <Fade in={isOpen} >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        textAlign: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%)`,
        transition:'opacity 1s, transform 0.3s',
        minWidth: 400,
        width: 600,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        opacity: isOpen ? 1:0,

      }}
    >
      <Box display={"flex"} flexDirection={"row"} width={"100%"}>
        <Box
          width={45}
          height={45}
          bgcolor={product.color}
          borderRadius={"50%"}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            ml: 2,
          }}
        >
          <Typography variant="body1" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body1" color={"text.secondary"} component="h2">
            In stock {product.stock}
          </Typography>
        </Box>
        <IconButton sx={{ ml: "auto" }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ width: "100%", my: 2 }} />

      <ProductModalPropertyCard label={"Product Code"} value={product.code} />
      <ProductModalPropertyCard label={"Product Price"} value={product.price} />
      <ProductModalPropertyCard label={"Product Cost"} value={product.cost} />
      <ProductModalPropertyCard label={"Main Category"} value={product.mainCategory} />
      <ProductModalPropertyCard label={"Sub Category"} value={product.subCategory} />
      <ProductModalPropertyCard label={"Barcode"} value={product.barcode} />
      <ProductModalPropertyCard label={"Tax"} value={product.tax} />
    </Box>
    </Fade >
  </Modal>
);

const ProductModalPropertyCard = ({ label, value }) => (
  <Box
    sx={{
      width: "95%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      m: 1,
    }}
  >
    <span>{label}:</span>
    <span>{value}</span>
  </Box>
);

const ProductBuyMocal=({isOpen})=>{
  return(
    <Modal
    open={isOpen}
  >
    <Fade in={isOpen} >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        textAlign: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%)`,
        transition:'opacity 1s, transform 0.3s',
        minWidth: 400,
        width: 600,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        opacity: isOpen ? 1:0,

      }}
    >
            
    </Box>
    </Fade >
  </Modal>
  )
}



export default Products;
