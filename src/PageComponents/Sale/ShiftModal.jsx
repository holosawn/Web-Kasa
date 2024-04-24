import React, { useState } from "react";
import { Box, Fade, Modal, TextField, Button, Typography, Alert, Grow, AlertTitle } from "@mui/material";
import { onlyNumLayout } from "../../utils/Numpadlayouts";
import Numpad from "../../ReusableComponents/Numpad";
import useAlert from "../../CustomHooks/useAlert";
import { t } from "i18next";
import { useShiftStatus } from "../../contexts/ShiftContext";

const ShiftModal = ({ open, onClose }) => { 
  const [drawerAmount, setDrawerAmount] = useState("");
  const [showAlert, AlertComponent] = useAlert(); // Use the custom hook
  const {shiftStatus, setShiftStatus} = useShiftStatus()

  const handleStartShift = () => {
    if (drawerAmount > 0) {
      setShiftStatus({
        isOpen: true,
        amount: parseInt(drawerAmount),
      });
      onClose();
    } else {
      // Show error message or handle empty drawer amount
      showAlert("warning", t('sale.alertTitle'), t('sale.alertContent'));
    }
  };

  const handleCloseShift = () => {
    if (parseInt(drawerAmount) >= 0) {
      setShiftStatus({
        isOpen: false,
        amount: parseInt(drawerAmount),
      });
      onClose();
    } else {
      // Show error message or handle empty drawer amount
      showAlert("warning", "Non-valid Amount", "Drawer amount cannot be empty");
    }
  };

  const handleInputChange = (inputValue) => {
    console.log(drawerAmount);

    if (inputValue === "") {
      setDrawerAmount("");
    } else if (/^0[\d\s]*$/.test(inputValue) || /^[\d\s]+$/.test(inputValue)) {
      setDrawerAmount(inputValue); // Convert the input value to an integer
    }
  };

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
          <TextField
            label={t('sale.drawerAmount')}
            variant="outlined"
            fullWidth
            focused
            value={drawerAmount}
            onChange={(e) => handleInputChange(e.target.value)}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            autoFocus
            sx={{mb:{xs:1, md:3}}}
          />
          <Numpad setValue={handleAmountChange} layout={onlyNumLayout} />
          <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-around', width:'100%'}} >
            <Button sx={{mt:1, width:'30%', height:{xs:40, md:50}}}
                size="large"
                
              variant="contained"
              color={shiftStatus.isOpen ? "error" : "success"}
              onClick={ shiftStatus.isOpen ? handleCloseShift : handleStartShift}
            >
              <Typography variant="body2" textTransform={'none'} fontSize={{xs:12, md:16}}>
                {shiftStatus.isOpen ? "Close Shift" : "Start Shift"}
              </Typography>
            </Button>
            <Button sx={{mt:1, width:'30%', height:{xs:40, md:50}}}
                size="large"
                
              variant="contained"
              color="success"
              disabled={!shiftStatus.isOpen} 
              onClick={handleStartShift}
            >
              <Typography variant="body2" textTransform={'none'} fontSize={{xs:12, md:16}} >
                {t('sale.updateDrawer')}
              </Typography>
            </Button>
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
