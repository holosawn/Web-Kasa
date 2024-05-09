import { Box, Button, Divider, Fade, Grid, Modal, Stack, TextField, Typography, colors } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { ArrowBack } from '@mui/icons-material'
import { enLayout, trLayout, ruLayout } from "../../LangLayouts/LayoutsWithoutArrows";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useCustomTheme } from '../../contexts/CutomThemeContext';
import buttons from "../../Constants/KeyboardButtons";
import { t } from 'i18next';
import { useLanguage } from '../../contexts/LangContext';
import useSize from '../../CustomHooks/useSize';
import "../LoginPage/loginKeyboard.css";
import useAlert from '../../CustomHooks/useAlert';
import LoadingButton from '../../ReusableComponents/LoadingButton';

const layouts = {
    en: enLayout,
    ru: ruLayout,
    tr: trLayout,
  };




const validateCouponCode = (code) => {
  // Regular expression for at least one uppercase letter, one digit, and minimum length of 5 characters
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/;
  return regex.test(code);
}

const CouponModal=({open, onClose, coupons, activeCoupons, setActiveCoupons, setAmountToPay, total, setTotal})=>{
    const [input, setInput] = useState('') 
    const [loading, setLoading] = useState(false)
    const keyboardRef = useRef()
    const [layout, setLayout] = useState("default");
    const inputRef = useRef()
    const {mode} = useCustomTheme()
    const {lang, setLang} = useLanguage();
    const [size] = useSize()
    const [showAlert, AlertComponent] = useAlert();

    // Save email if it's valid and not active already
    // Make necessary updates on subTotal, total and active coupons also update states and give feedback via alerts
    const onSaveButtonClick = () => {
      setLoading(true)
      if (!validateCouponCode(input) ||  !coupons[input]) {
          setTimeout(() => {
              setLoading(false)
              onChange('')
              inputRef.current.focus()
              showAlert('warning', t('common.invalidInput'), t(`common.invalidCoupo${!validateCouponCode(input) ? 'nFormat' : 'n'}`));
          }, 300);
      } 
      else if (activeCoupons.find(c=> c.key === input)){
        onChange('')
        setLoading(false)
        showAlert('info', t('common.couponActive'), t('common.activatedCoupon'))
      }
      else {
          setTimeout(() => {
                const priceDiff = coupons[input].func(total)

                if (priceDiff < 0) {
                  setActiveCoupons(prev => [...prev, {...coupons[input], saved: priceDiff}])
                  setTotal(prev =>  prev + priceDiff)
                  setAmountToPay(prev => prev + priceDiff)

                  showAlert('success', t('common.success'), t('common.couponSaved'));

                }
                else{
                  if (priceDiff === 'noTaggedCustomer') {
                    showAlert('warning', t('payment.noTaggedCustomer'), t('payment.noTaggedCustomerDesc'))
                  }
                  else{
                    showAlert('warning', t('common.insufficient'), t('common.insufficientCard'));                    
                  }
                }
                setInput('')
                setLoading(false)

          }, 1000);
      }
  }

  
    // Sets changes on field onto state and keyboard
    const onInputChange=(inputVal)=>{
      setInput(inputVal)
      keyboardRef.current.setInput(inputVal)
    }

    function handleShift() {
        const newLayoutName = layout === "default" ? "shift" : "default";
        setLayout(newLayoutName);
    }

    // Sets changes on keyboard onto state
    const onChange = (input) => {
        setInput(input)
    };

    function onKeyPress(button) {
        if (button === "{shift}" || button === "{lock}") handleShift();
        if (button === "{clear}") onInputChange("");
        if (button === "{bksp}") customOnBksp();
    }
    
    const customOnBksp = () => {
        setInput(prev => prev.slice(0, -1))
      };

    return(
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
              width: '70vw',
              height:'fit-content',
              minWidth:600,
              maxWidth:900,
              minHeight:310,
              pt: {xs:1,md:2},
              p:2,
              py:size.y < 500 ? 1 : 2,
              pb:size.y < 500 ? 0 : 2 ,
              borderRadius: 3,
            }}
          >
            <Stack direction='row' justifyContent={'center'} sx={{position:'relative', width:'100%', height:size.y < 500? 35: 50}}>
              <Button variant='contained' onClick={onClose} color='error' sx={{position:'absolute', top:0, left:0}} >
                <ArrowBack fontSize={size.y < 800 ? 'small' : 'medium'} />
              </Button>
              <Typography variant='h6' fontSize={size.y < 500 ? 18 : 20} fontWeight={700} color={'primary'} >
                {t('payment.couponCode')}
              </Typography>
            </Stack>

            <Divider sx={{width:'100%'}} />

            <Stack direction='row' justifyContent={'center'} alignItems={'center'} sx={{my:size.y < 500 ?  1: 3, minWidth:450, width:'100%', position:'relative'}} >
                <Typography variant='h6' fontSize={size.y< 500 ? 16: 18} noWrap sx={{width:90, position:'absolute', left:'2%'}} > 
                    {t('payment.code')}:
                </Typography>
                <TextField type='email' autoComplete='off' value={input} autoFocus onChange={e => onInputChange(e.target.value)} inputRef={inputRef} sx={{
                    width:'70%',
                    ml:size.x < 1100 ? -3: size.x < 1200 ? -1:0,
                    minWidth:350,
                    maxWidth:'80%',
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                          e.preventDefault(); // Prevent the default behavior of Enter key
                          onSaveButtonClick(); // Call the function to mimic the click behavior
                      }
                    }}
                  />
                  <LoadingButton isLoading={loading} disabled={loading || !input.length > 0} variant='contained' onClick={onSaveButtonClick} sx={{width: size.x < 1000 ? 70 :size.x < 1200 ? 85 : 100, position:'absolute', right:'2%', height:'90%'}} >
                    {t('payment.save')}
                  </LoadingButton>
            </Stack>
            
            <Keyboard
            keyboardRef={(r) => (keyboardRef.current = r)}
            layoutName={layout}
            layout={layouts[lang]}
            onChange={onChange}
            onKeyPress={onKeyPress}
            preventMouseDownDefault
            buttonTheme={[
              {
                class: "hg-red",
                buttons: "{clear}",
              },
              {
                class: "hg-blue",
                buttons: "{arrowleft} {arrowright}",
              },
              {
                class: mode == 'dark' ? "hg-dark" : "hg-white",
                buttons:buttons
              },
            ]}
            theme={`hg-theme-default ${mode === 'dark' ? 'darkTheme': 'lightTheme'}` }
            display={{
              "{bksp}": t("login.Delete"),
              "{shift}": "Shift",
              "{tab}": "Tab",
              "{lock}": "Caps Lock",
              "{enter}": "Enter",
              "{space}": "Space",
              "{clear}": t("login.clear"),
              "{arrowleft}": "<<",
              "{arrowright}": ">>",
            }}
          />
            <AlertComponent/>
          </Box>
        </Fade>
      </Modal>
    )
  }

export default CouponModal
