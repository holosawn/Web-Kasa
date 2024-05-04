import React, { useState } from "react";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import ForwardSharpIcon from "@mui/icons-material/ForwardSharp";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Fade,
  Grid,
  Icon,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import AddCustomer from "./AddCustomer";
import ShiftModal from "./ShiftModal";
import { useShiftStatus } from "../../contexts/ShiftContext";
import { t } from "i18next";
import AddCustomerModal from "./AddCustomerModal";

const ActionButton = ({ children, ...props }) => (
  <Button
    variant="contained"
    sx={{
      width: "100%",
      height:'90%',
      // minWidth: 10,
      textTransform: "none",
      p: 0,
      px: 1,
      minHeight:{xs: 32, md:40}

    }}
    {...props}
  >
    <Stack
      direction={"row"}
      justifyContent={"start"}
      alignItems={"center"}
      width={"100%"}
    >
      {children}
    </Stack>
  </Button>
);

export const ActionButtons = ({onProductsButtonClick}) => {
  const [isCusModalOpen, setIsCusModalOpen] = useState(false)
  const navigate = useNavigate();

  function openCustomerModal(){
    setIsCusModalOpen(true)
  }
  function closeCustomerModal(){
    setIsCusModalOpen(false)
  }

  const onProductClick=()=>{
    onProductsButtonClick();
    navigate('/Products')
  }

  return (
    <Grid
      container
      direction={"row"}
      width={"90%"}
      mt={{ md:1, lg:2 }}
      height={{xs:"80px",md:'130px', lg:'135px'}}
      columnSpacing={1}
      rowSpacing={0.5}
      mb={1}
    >
      <Grid item xs={6} sx={{display:'flex', justifyContent:'center', alignItems:'center'}} >
        <ActionButton color={"info"} onClick={onProductClick} >
          <LocalOfferOutlinedIcon
            // fontSize="medium"
            key={'Products'}
            sx={{ strokeWidth: "1px", fontSize:{xs:'small', lg:'20px'} }}
          />
          <Typography
            variant="caption"
            fontSize={{xs:'9px', md:'12px', lg:'14px', xl:'16px'}}
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            ml={0.5}
          >
            {t("sale.products")}
          </Typography>
        </ActionButton>
      </Grid>
      <Grid item xs={6} sx={{display:'flex', justifyContent:'center', alignItems:'center'}} >
        <ActionButton color={"info"}>
          <FeedOutlinedIcon sx={{fontSize:{xs:'small', lg:'20px'}}} key={"Sales"} />
          <Typography
            variant="caption"
            fontSize={{xs:'9px', md:'12px', lg:'14px', xl:'16px'}}
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            ml={0.5}
          >
            {t('sale.sales')}
          </Typography>
        </ActionButton>
      </Grid>
      <Grid item xs={6} sx={{display:'flex', justifyContent:'center', alignItems:'center'}} >
        <ActionButton color={"warning"} 
          onClick={openCustomerModal}
         >
          <PersonAddAltOutlinedIcon sx={{fontSize:{xs:'small', lg:'20px'}}} key={"Add Customer"} />
          <Typography
            variant="caption"
            fontSize={{xs:'9px', md:'12px', lg:'14px', xl:'16px'}}
            sx={{ width: "100%", display: "flex", justifyContent: "center", lineHeight:{xs:1, md:1.3} }}
            ml={0.5}
            
          >
            {t('sale.addCustomer')}
          </Typography>
        </ActionButton>
      </Grid>
      <Grid item xs={6} sx={{display:'flex', justifyContent:'center', alignItems:'center'}} >
        <ActionButton onClick={()=>navigate('/Settings')} color={"warning"}>
          <SettingsOutlinedIcon sx={{fontSize:{xs:'small', lg:'20px'}}} key={"Settings"} />
          <Typography
            variant="caption"
            fontSize={{xs:'9px', md:'12px', lg:'14px', xl:'16px'}}
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            ml={0.5}
          >
            {t('sale.settings')}
          </Typography>
        </ActionButton>
      </Grid>

      <AddCustomerModal open={isCusModalOpen} closeModal={closeCustomerModal} />
    </Grid>
  );
};

export const SysControlButtons = () => {
  const navigate = useNavigate();
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false)
  const {shiftStatus, setShiftStatus} = useShiftStatus()

  function openModal(){
    setIsShiftModalOpen(true);
  }

  function closeModal(){
    setIsShiftModalOpen(false);
  }

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      width={"95%"}
      height={'10%'}
      minHeight={'45px'}
      maxHeight={'100px'}
      my={{xs:0.2, lg:1}}
      mt={2}
    >
      <Button
        variant="contained"
        color="error"
        onClick={() => navigate("/Menu")}
        sx={{
          width: "48%",
          mt: "auto",
          height: '85%',
          textTransform: "none",
          borderRadius: {xs:2, lg:3},
        }}
      >
        <ForwardSharpIcon sx={{ transform: "rotate(180deg)", fontSize:{xs:'15px', md:'22px', lg:'20px'} ,mr:0.5 }} />
        <Typography
          sx={{ width: "70%", display: "flex", justifyContent: "center" ,fontSize:{xs:'9px', md:'12px', lg:'16px'}}}
        >
          {t('sale.back')}
        </Typography>
      </Button>
      <Button
        variant="contained"
        color={shiftStatus.isOpen ? 'error' : "success"}
        sx={{
          width: "48%",
          mt: "auto",
          height: '85%',
          textTransform: "none",
          borderRadius: {xs:2, md:3},
          overflowX:'visible'
        }}
        onClick={openModal}
      >
        <LoginSharpIcon sx={{fontSize:{xs:'15px', md:'22px' ,lg:'20px'}, mr:0.5}} />
        <Typography 
          overflow={'visible'}
          sx={{ width: "70%", display: "flex", justifyContent: "center", fontSize:{xs:'9px', md:'12px', lg:'16px'}}}
        >
          {shiftStatus.isOpen ? t('sale.closeShift') : t('sale.startShift')}
        </Typography>
      </Button>
      <ShiftModal open={isShiftModalOpen} onClose={closeModal} />
    </Stack>
  );
};


// const AddCustomerModal=({isOpen, onClose})=>{
//   let customer = {};

//   return(
//     <Modal
//     open={isOpen}
//     onClose={onClose}
//     aria-labelledby="modal-modal-title"
//     aria-describedby="modal-modal-description"

//   >
//     <Fade in={isOpen} >
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "start",
//         textAlign: "center",
//         position: "absolute",
//         top: "50%",
//         left: "50%",
//         transform: `translate(-50%, -50%)`,
//         transition:'opacity 1s, transform 0.3s',
//         minWidth: 400,
//         width: 600,
//         bgcolor: "background.paper",
//         boxShadow: 24,
//         p: 4,
//         opacity: isOpen ? 1:0,

//       }}
//     >
//       <Typography>kekeke</Typography>
//     </Box>
//     </Fade >
//   </Modal>
//   )
// };

export default ActionButtons;
