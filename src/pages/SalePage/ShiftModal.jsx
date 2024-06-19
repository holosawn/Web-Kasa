import React, { useState } from "react";
import { Box, Fade, Modal, TextField, Button, Typography, Alert, Grow, AlertTitle, Stack } from "@mui/material";

import { getNumLayout } from "../../Constants/Numpadlayouts";
import Numpad from "../../ReusableComponents/Numpad";
import useAlert from "../../CustomHooks/useAlert";
import { t } from "i18next";
import { useShiftStatus } from "../../contexts/ShiftContext";
import LoadingButton from "../../ReusableComponents/LoadingButton";

const ShiftModal = ({ open, onClose }) => { 
  //Loading states of different buttons and processes
  const [drawerUpdateLoading, setDrawerUpdateLoading] = useState(false)
  const [clockUpdateLoading, setClockUpdateLoading] = useState(false)
  const [shiftUpdateLoading, setShiftUpdateLoading] = useState(false)

  const [showAlert, AlertComponent] = useAlert(); 
  const {shiftStatus, setShiftStatus, updateAmount, startShift, endShift} = useShiftStatus()
  const [drawerAmount, setDrawerAmount] = useState(shiftStatus.amount || '');


  //Start shift if there is money in drawer and feedback with MUI alerts
  const handleStartShift = () => {
    setShiftUpdateLoading(true);
    setTimeout(() => {
      if (drawerAmount > 0) {
        startShift(drawerAmount)
        setShiftUpdateLoading(false);
        showAlert("success", t("sale.shiftStarted"), t("sale.shiftStartedContent")); // Success alert
      } else {
        setShiftUpdateLoading(false);
        showAlert("warning", t("sale.alertTitle"), t("sale.alertContent"));
      }
    }, 500);
  };

  // Clock out and give feedback via alerts
  const handleClockOut = () => {
    setClockUpdateLoading(true);
    setTimeout(() => {
      setShiftStatus(prev => ({
        ...prev,
        isOpen: true,
        clockedOut: true,
      }));
      setClockUpdateLoading(false);
      showAlert("success", t("sale.clockedOut"), t("sale.clockedOutContent")); // Success alert
    }, 500);
  };

  // Clock in and give feedback 
  const handleClockIn = () => {
    setClockUpdateLoading(true);
    setTimeout(() => {
      setShiftStatus(prev => ({
        ...prev,
        isOpen: true,
        clockedOut: false,
      }));
      setClockUpdateLoading(false);
      showAlert("success", t("sale.clockedIn"), t("sale.clockedInContent")); // Success alert
    }, 500);
  };

  // Close shift if there no money or money in drawer
  const handleCloseShift = () => {
    setShiftUpdateLoading(true);
    setTimeout(() => {
      if (parseFloat(drawerAmount) >= 0) {
        endShift()
        setShiftUpdateLoading(false);
        showAlert("success", t("sale.shiftClosed"), t("sale.shiftClosedContent")); // Success alert
      } else {
        setShiftUpdateLoading(false);
        showAlert("warning", t("sale.invalidDrawerAmount"), t("sale.invalidDrawerAmountDesc"));
      }
    }, 500);
  };

  // Update drawer amount if it's a valid amount
  const handleUpdateDrawer = () => {
    setDrawerUpdateLoading(true);
    setTimeout(() => {
      if (parseFloat(drawerAmount) >= 0) {
        updateAmount(drawerAmount)
        setDrawerUpdateLoading(false);
        showAlert("success", t("sale.drawerUpdated"), t("sale.drawerUpdatedContent")); // Success alert
      } else {
        setDrawerUpdateLoading(false);
        showAlert("warning", t('sale.invalidDrawerAmount'), t('sale.invalidDrawerAmountDesc'));
      }
    }, 500);
  };

  // Event handler for TextField
  const handleInputChange = (inputValue) => {
    if (inputValue === "") {
      setDrawerAmount("");
    } else if (/^0[\d\s]*$/.test(inputValue) || /^[\d\s]+$/.test(inputValue)) {
      setDrawerAmount(inputValue);
    }
  };

  // Event handler for Numpad
  function handleAmountChange(setVal) {
    setDrawerAmount((prev) => {
      return setVal(prev);
    });
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        zIndex:9999
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            width: "fit-content",
            height:'fit-content',
            p: {xs:2,md:4},
            pb:{xs:1, md:2},
            borderRadius: 3,
          }}
        >
          <Stack direction='row' alignItems={'center'} sx={{mb:{xs:1, md:3}}} width={'95%'} >
            <TextField
              label={t('sale.drawerAmount')}
              variant="outlined"
              fullWidth
              focused
              value={drawerAmount}
              onChange={(e) => handleInputChange(e.target.value)}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              autoFocus
            />

            <LoadingButton variant='contained'color="success"  onClick={handleUpdateDrawer}
            isLoading={drawerUpdateLoading}
              sx={{
                width:{xs:'35%', md:'25%'},
                height:56,
                textTransform:'none',
                ml:1
              }}
            >
              {t('sale.updateDrawer')}
            </LoadingButton>
          </Stack>
          <Numpad setValue={handleAmountChange} layout={getNumLayout(t)} />

          <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-around', width:'100%'}} >
            <LoadingButton sx={{mt:1, width:'30%', height:{xs:40, md:50}}}
              size="large"
              isLoading={shiftUpdateLoading}
              variant="contained"
              color={shiftStatus.isOpen ? "error" : "success"}
              onClick={ shiftStatus.isOpen ? handleCloseShift : handleStartShift}
            >
              <Typography variant="body2" textTransform={'none'} fontSize={{xs:12, md:16}}>
                {shiftStatus.isOpen ? t('sale.closeShift') : t('sale.startShift')}
              </Typography>
            </LoadingButton>

            <LoadingButton sx={{mt:1, width:'30%', height:{xs:40, md:50}}}
              size="large"  
              variant="contained"
              color={shiftStatus.clockedOut ? 'success' :  'error'} 
              isLoading={clockUpdateLoading}
              disabled={!shiftStatus.isOpen} 
              onClick={shiftStatus.clockedOut ? handleClockIn :  handleClockOut}
            >
              <Typography variant="body2" textTransform={'none'} fontSize={{xs:12, md:16}} >
                {/* {t('sale.updateDrawer')} */}
                {shiftStatus.clockedOut ? t('sale.clockIn') : t('sale.clockOut')}
              </Typography>
            </LoadingButton>

            <Button sx={{mt:1, width:'30%', height:{xs:40, md:50}}}
              size="large"
              variant="contained"
              color="error" 
              onClick={onClose}
            >
              <Typography variant="body2" textTransform={'none'} fontSize={{xs:12, md:16}}>
                {t('sale.cancel')}
              </Typography>
            </Button>

            <AlertComponent/>
        </Box>
        </Box>
      </Fade>

    </Modal>
  );
};

export default ShiftModal;
