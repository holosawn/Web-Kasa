import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
  CircularProgress
} from "@mui/material";
import React, { forwardRef, memo, useCallback, useEffect,  useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Fade from "@mui/material/Fade";
import NoImg from "../assets/NoImage.jpg";
import { VirtuosoGrid } from "react-virtuoso";
import { t } from "i18next";

const gridComponents = {
  List: forwardRef(({ style, children, ...props }, ref) => (
    <Grid
    container
      ref={ref}
      {...props}
      style={{
        display: "flex",
        flexWrap: "wrap",
        ...style,
      }}
    >
      {children}
    </Grid>
  )),
  Item: ({ children, ...props }) => (
    <Grid
      {...props}
      item
      xs={4}
      xl={3}
      style={{
        paddingBlock: "0.5rem",
        paddingInline:'0.5rem',
        display: "flex",
        flex: "none",
        width:'100%',
        alignContent: 'stretch',
        boxSizing: "border-box",
      }}
    >
      {children}
    </Grid>
  ),
  Header:({})=>(
    <div style={{height:'15px'}} />
  )
} 

const Products = ({
  products,
  sendToRegister,
  setNumpadFocus,
  containerRef
}) => {
  const[itemsToRender, setItemsToRender] = useState([])
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  //todo loading icon

  const setCurrentItem = useCallback((product) =>{
    sendToRegister({ product: product, qty: "" });
    setNumpadFocus("cart");
  },[])

  const handleScrollerRef = useCallback((ref) => {
    containerRef.current = ref;
  }, []);

  async function fetchNextItems() {
    const startIndex = itemsToRender.length;
    const endIndex = startIndex + 20;
    const newItems = products.slice(startIndex, endIndex);

    setIsLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsLoadingMore(false);

    setItemsToRender([...itemsToRender, ...newItems]);
  }

  useEffect(() => {
    setItemsToRender(products.slice(0, 20));
  }, [products]);


  return (
    <Box mt={1} flex={1} width={'100%'} maxWidth={{xs:450, md:2000}} minHeight={150} mb={{xs:1,md:1.5}} ml={1} p={0}  >
      <VirtuosoGrid
        data={itemsToRender}
        components={{
          ...gridComponents,
          Footer: () => (
            <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} mt={1} >
              {isLoadingMore ? (
                <CircularProgress/>
              ) : (
                <div></div>
              )}
            </Stack>
          )
        }}
        endReached={fetchNextItems}
        scrollerRef={ref => handleScrollerRef(ref)}
        
        itemContent={(index, item) => (
            <ProductCard product={item} key={item.id} onClick={setCurrentItem} index={item.id} url={item.images.split(" | ")[0]} />
            )
          }
      />
    </Box>
  );
};

const ProductCard = memo(({ product, style,  url,index, onClick,  ...props }) => {

  const onCardClick = () => {
    onClick(product)
  };

  const theme = useTheme();
  const [isNonCardClick, setisNonCardClick] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const discount = product.discount
    ? product.discount
    : false;

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
    const discount = product.discount || "0";

    const updatedProduct = {
      ...product,
      price: Math.min(
        product.price,
        product.price *
          (1 - parseFloat(discount.replace("%", "")) / 100)
      ),
    };
    onCardClick(updatedProduct);
  };


  return (
      <Paper
        onClick={() => handleCardClick(product)}
        elevation={0}
        sx={{
          ...style,
          backgroundColor: "background.paper",
          width: "99%",
          // maxWidth:{xs:140, md:300},
          maxHeight: 220,
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
            transform: isNonCardClick
              ? "none"
              : "scale(0.95)" /* Reduce the scale slightly on click */,
          },
        }}
      >
        <Box
          // width={"85%"}
          width={"100%"}
          // minWidth={100}
          height={{xs:'45%', md:"55%"}}
          overflow={"visible"}
          position={"relative"}
          // pt={2}
        >
          <div>
            <img src={`https://picsum.photos/id/${parseInt(product.barcode)}/200/300.webp`} style={{  position:'absolute', width:'100%', height:'100%'}} 
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = NoImg ; // Replace with the path to your fixed image
              }} 
            />
         </div>
          <Button
            onMouseDown={onMouseDownBadge}  
            onMouseUp={onMouseUpBadge}
            onClick={openModal}
            sx={{
              boxSizing: "border-box",
              position: "absolute",
              top: {xs:-5,md:-14}, // Adjust top position to center the badge
              right: {xs:-1,md:-3}, // Adjust right position to center the badge
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
          {product.barcode}
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
  );
});

const ProductModal = ({ isOpen, onClose, product }) => {
  const bgImg = product.images.split("|")[0] || NoImg;

  const discount = product.discount
    ? product.discount
    : "0%";
  const computedPrice = (
    product.price *
    ((100 - parseInt(discount.replace("%", ""))) / 100)
  )
    .toFixed(2)
    .toLocaleString()
    .replace(/\./, ",");

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Fade in={isOpen}>
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
            transition: "opacity 1s, transform 0.3s",
            minWidth: 400,
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            opacity: isOpen ? 1 : 0,
          }}
        >
          <Stack
            direction={"row"}
            height={160}
            alignItems={"start"}
            width={"100%"}
          >
            <Box
              width={150}
              height={150}
              sx={{
                backgroundImage: `url(${bgImg})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <Stack
              display={"flex"}
              direction={"column"}
              alignItems={"center"}
              width={"calc(100% - 200px)"}
              justifyContent={"center"}
              height={160}
              mx={1}
            >
              <Typography variant="body1" component="h2" my={1}>
                {product.name}
              </Typography>
              <Typography
                variant="body1"
                color={"text.secondary"}
                component="h2"
                mt={"auto"}
                mb={2}
                ml={1}
              >
                {product.categories}
              </Typography>
            </Stack>
            <IconButton sx={{ ml: "auto" }} size="large" onClick={onClose}>
              <CloseIcon size="large" />
            </IconButton>
          </Stack>
          <Divider sx={{ width: "100%", my: 2 }} />

          <ProductModalPropertyCard
            label={t('sale.code')}
            value={product.barcode}
          />
          <ProductModalPropertyCard
            label={t('sale.price')}
            value={`${computedPrice} TRY`}
          />
          <ProductModalPropertyCard
            label={t('sale.stock')}
            value={product.stock}
          />
          <ProductModalPropertyCard
            label={t('sale.tax')}
            value={product.tax}
          />
          {discount !== "0%" && (
            <ProductModalPropertyCard label={t('sale.discount')} value={discount} />
          )}
          <ProductModalPropertyCard
            label={t('sale.cost')}
            value={`${product.cost} TRY`}
          />
          <ProductModalPropertyCard
            label={t('sale.unit')}
            value={product.unit}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

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
    <span>
      {typeof value === "number"
        ? value.toLocaleString().replace(/\./, ",")
        : value}
    </span>
  </Box>
);

export default Products;
