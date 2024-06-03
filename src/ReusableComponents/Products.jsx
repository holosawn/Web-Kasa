import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
  CircularProgress
} from "@mui/material";
import React, { forwardRef, memo, useCallback, useEffect,  useRef,  useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Fade from "@mui/material/Fade";
import NoImg from "../assets/NoImage.jpg";
import { VirtuosoGrid } from "react-virtuoso";
import { t } from "i18next";
import ProductCard from "./ProductCard";

// grid components for products container grid
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
        minWidth:'100%',
      }}
    >
      {children}
    </Grid>
  )),
  Header:({})=>(
    <div style={{height:'15px'}} />
  )
} 

// setNumpadFocus is for setting focus to currentItemCard's textfield when a product set as itemInRegister
// containerRef is for scroll buttons to get ref of VirtuosoGrid 
const Products = ({ products, sendToRegister, setNumpadFocus=null, containerRef}) => {

  const [itemsToRender, setItemsToRender] = useState([])
  const [isLoadingMore, setIsLoadingMore] = useState(false);// state to compute how many items will be in a row
  const [productModalStatus, setProductModalStatus] = useState({
    isOpen:false,
    product:{}
  });
  const [containerWidth, setContainerWidth] = useState(3);// state to compute how many items will be in a row
  const refContainer = useRef();

  // fetch initial items to render
  useEffect(()=>{
    getNextItems(1000)
  },[])

  // Fetch new products every time products changes
  useEffect(() => {
    setItemsToRender(products.slice(0, 20));
  }, [products]);

  
  useEffect(() => {
    const updateContainerWidth = () => {
      if (refContainer.current && containerWidth !== refContainer.current.offsetWidth) {
        setContainerWidth(refContainer.current.offsetWidth);
      }
    };

    // Observer to get size of container on every size change
    if (refContainer.current) {
      updateContainerWidth(); // Initial setup
      const observer = new ResizeObserver(() => updateContainerWidth());
      observer.observe(refContainer.current);

      // Clean up the observer when the component is unmounted or ref changes
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  // Will be passed to ProductCard as badge click handler.It stops propagation to prevent calling 
  const openProductModal = useCallback((product) => {
    setProductModalStatus({
      isOpen:true,
      product:product
    })
  }, [setProductModalStatus]);


  const closeProductModal = useCallback((event) => {
    setProductModalStatus(prev => ({
      isOpen: false,
      product: prev.product
    }))
  },[setProductModalStatus]);


  // If there is a discount on product applies and sendsToRegister
  const setCurrentItem = useCallback((product) =>{
    
    const discountAppliedProduct = {
      ...product,
      price:product.discount ? parseFloat(product.price) * (100 - parseInt(product.discount.replace('%','')))/100: product.price
    }

    sendToRegister({ product: discountAppliedProduct, qty: "" });
    if (setNumpadFocus) {
      setNumpadFocus("cart");
    }
  },[])

  const handleScrollerRef = (ref) => {
    containerRef.current = ref;
  };

  // fetches specified number of data
  async function getNextItems(length) {
    const startIndex = itemsToRender.length;
    const endIndex = startIndex + length;
    const newItems = products.slice(startIndex, endIndex);

    setIsLoadingMore(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsLoadingMore(false);

    setItemsToRender([...itemsToRender, ...newItems]);
  }

  console.log(containerWidth);
  return (
    <Box mt={1} ref={refContainer} flex={1} width={'100%'} maxWidth={{xs:600, md:2000}} minHeight={150} mb={{xs:1,md:1.5}} ml={1} p={0} sx={{scrollbarGutter:'stable'}}  >
      <VirtuosoGrid
        data={itemsToRender}
        style={{
          scrollbarGutter:'stable'
        }}
        components={{
          ...gridComponents,
          Footer: useCallback(() => (
            <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} mt={1} >
              {isLoadingMore ? (
                <CircularProgress/>
              ) : (
                <div></div>
              )}
            </Stack>
          ),[isLoadingMore]),
          Item: useCallback(({ children, ...props }) => (
            <Grid
              {...props}
              item
              xs={containerWidth < 700 ? 4 : containerWidth < 900 ? 3 : containerWidth < 1100 ? 12/5 : containerWidth < 1800 ? 2 : 1}
              style={{
                paddingBlock: "0.5rem",
                paddingInline:'0.5rem',
                display: "flex",
                flex: "none",
                width:'100%',
                alignContent: 'stretch',
                boxSizing: "border-box",
                marginBlock:'10px'
              }}
            >
              {children}
            </Grid>
          ), [containerWidth]),
        }}
        endReached={()=>getNextItems( (containerWidth/ 200) * 4  || 20)}
        scrollerRef={ref => handleScrollerRef(ref)}
        itemContent={(index, item) => (
            <ProductCard onBadgeclick={openProductModal} product={item} key={item.id} onClick={setCurrentItem} />
            )
          }
      />
        { productModalStatus.isOpen && <ProductModal
          isOpen={productModalStatus.isOpen}
          product={productModalStatus.product}
          onClose={closeProductModal}
        />}
    </Box>
  );
};

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
            value={product.code}
          />
          <ProductModalPropertyCard
            label={t('common.isFavorite')}
            value={product.isFavorite ? 'Yes' : 'No'}
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
            <ProductModalPropertyCard label={t('common.discount')} value={discount} />
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

export default React.memo(Products);
