import React, { useState } from "react";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ForwardSharpIcon from "@mui/icons-material/ForwardSharp";
import { FiberManualRecord } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ShiftModal from "./ShiftModal";
import { useShiftStatus } from "../../contexts/ShiftContext";
import { t } from "i18next";
import AddCustomerModal from "./AddCustomerModal";


export const ActionButtons = () => {
  // State to show AddCustomerModal
  const [isCusModalOpen, setIsCusModalOpen] = useState(false)
  const navigate = useNavigate();

  function openCustomerModal(){
    setIsCusModalOpen(true)
  }
  function closeCustomerModal(){
    setIsCusModalOpen(false)
  }

  const onProductsClick=()=>{
    navigate('/Products')
  }

  return (
    <Grid
      container
      direction={"row"}
      width={"90%"}
      mt={{ md:1, lg:2 }}
      minHeight={{xs:80,md:100, xl:120}}
      maxHeight={{xs:80,md:100, xl:120}}
      columnSpacing={1}
      rowSpacing={0.5}
      mb={1}
    >
      <Grid item xs={6} sx={{display:'flex', justifyContent:'center', alignItems:'center'}} >
        <ActionButton color={"info"} onClick={onProductsClick} >
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

      <AddCustomerModal open={isCusModalOpen} onClose={closeCustomerModal} />
    </Grid>
  );
};

export const SysControlButtons = () => {
  const navigate = useNavigate();
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false)
  //Shift context reached to display related data
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
      // height={'10%'}
      minHeight={{xs:45, md:55, lg:65, xl:80}}
      maxHeight={{xs:45, md:55, lg:65, xl:80}}

      mb={{xs:0.2, lg:1}}
      mt='auto'
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
        <Stack sx={{width: "100%",}}>
          <Typography 
            overflow={'visible'} noWrap
            sx={{ display: "flex", justifyContent: "center", fontSize:{xs:'9px', md:'12px', lg:'16px'}}}
          >
            {t('sale.shiftMenu')}
          </Typography>

          <Stack direction={'row'} sx={{width:'100%', justifyContent:'center', alignItems:'center'}} >
            <FiberManualRecord sx={{color: (shiftStatus.isOpen && !shiftStatus.clockedOut ) ? 'green' : 'red', width:0.15, mr:0.5 }}  />
            <Typography 
              overflow={'visible'} noWrap 
              sx={{ display: "flex", justifyContent: "center", fontSize:{xs:'9px', md:'12px', lg:'16px'}}}
            >
              {t(`sale.shift${(shiftStatus.isOpen && !shiftStatus.clockedOut ) ? 'On' : 'Off'}`)}
            </Typography>
          </Stack>

        </Stack>
      </Button>
      <ShiftModal open={isShiftModalOpen} onClose={closeModal} />
    </Stack>
  );
};


export default ActionButtons;

const ActionButton = ({ children, ...props }) => (
  <Button
    variant="contained"
    sx={{
      width: "100%",
      height:'90%',
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
